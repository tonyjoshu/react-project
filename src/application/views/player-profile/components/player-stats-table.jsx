import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Label from "../../../shared/components/Label";
import Row from "../../../shared/components/Row";
import { FiEdit } from "react-icons/fi";
import apiCall from "../../../../helper_functions/api_call";
import URLS from "../../../../config/urls/urls";
import { useState } from "react";
import ModalPopUp from "../../../shared/components/ModalPopUp";
import InputFieldCustom from "../../../shared/components/input-field-cutom";
import { positions } from "./player-personal-info/personal-info";
import MaterialSelect from "../../../shared/components/material-select";
import ButtonStyled from "../../../shared/components/ButtonStyled";
import { AiOutlineRight } from "react-icons/ai";
import { useAtomValue } from "jotai";
import { adminTokenConfig } from "../../../../config/jotai/atoms";
import { mainColor } from "../../../../config/colors/colors";

function PlayerStatsTable({ playerProfileHook }) {
  const playerStatsTableHook = usePlayerStatsTable(playerProfileHook);

  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {playerStatsTableHook.tableHeaders.map((header, index) => (
                <NoWrapTableCell key={index} stat={header} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortBySeason(playerProfileHook.playerHistory?.stats ?? [])?.map(
              (stat, index) => (
                <TableRow key={index}>
                  <NoWrapTableCell stat={stat?.season ?? ""} />
                  <NoWrapTableCell stat={stat["team"]?.name ?? ""} />
                  <NoWrapTableCell stat={stat["shirt_number"] ?? ""} />
                  <NoWrapTableCell stat={stat["position_short"] ?? ""} />
                  <NoWrapTableCell stat={stat["goals"] ?? ""} />
                  <NoWrapTableCell stat={stat["assists"] ?? ""} />
                  <NoWrapTableCell stat={stat["clean_sheet"] ?? ""} />
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PlayerStatsTable;

function sortBySeason(list) {
  let sorted = list.sort((a, b) => (a.season > b.season ? 1 : -1));
  return sorted;
}

function NoWrapTableCell({ stat }) {
  return <TableCell style={{ whiteSpace: "nowrap" }}>{stat}</TableCell>;
}

function usePlayerStatsTable(playerProfileHook) {
  const tableHeaders = [
    "Season",
    "Club",
    "Shirt number",
    "Position",
    "goals",
    "Assists",
    "Clean Sheet",
  ];

  const { config: _config } = useAtomValue(adminTokenConfig);

  const [season, setSeason] = useState("");
  const [teamId, setTeamId] = useState("");
  const [shirtNumber, setShirtNumber] = useState(0);
  const [position, setPosition] = useState("");
  const [goals, setGoals] = useState(0);
  const [assists, setAssists] = useState(0);
  const [cleanSheets, setCleanSheets] = useState(0);

  const [playerPositions, setPlayerPositions] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  function handleModalOpen(season, teamName) {
    setModalLoading(true);
    setModalOpen(true);
    apiCall({ url: `${URLS.playerHistory}/${playerProfileHook.player_id}` })
      .then((resp) => {
        const requiredData = resp.data.stats.find(
          (data) => data.season === season && data.team.name === teamName
        );
        console.log("requiredData", requiredData);

        setSeason(season);
        setTeamId(requiredData.team._id);
        setShirtNumber(requiredData.shirt_number);
        setPosition(requiredData.position_short);
        setGoals(requiredData.goals);
        setAssists(requiredData.assists);
        setCleanSheets(requiredData.clean_sheet);

        setPlayerPositions(positions);
      })
      .finally(() => setModalLoading(false));
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  function handleConfirmSeasonStatsEdit() {
    setModalLoading(true);
    const _body = {
      season,
      team: teamId,
      playerId: playerProfileHook.player_id,
      shirt_number: shirtNumber,
      position: playerPositions.find((psn) => psn.short === position).full,
      position_short: playerPositions.find((psn) => psn.short === position)
        .short,
      goals,
      assists,
      clean_sheet: cleanSheets,
    };

    console.log(_body);

    apiCall({
      url: URLS.editPlayerHistoryStats,
      tokenRequired: true,
      config: _config,
      method: "put",
      body: _body,
    })
      .then((resp) => console.log("edit hist", resp.data))
      .finally(() => {
        setModalLoading(false);
        window.location.reload();
      });
  }

  return {
    tableHeaders,
    modalOpen,
    modalLoading,
    handleModalOpen,
    handleModalClose,
    shirtNumber,
    setShirtNumber,
    season,
    playerPositions,
    position,
    setPosition,
    goals,
    setGoals,
    assists,
    setAssists,
    cleanSheets,
    setCleanSheets,
    handleConfirmSeasonStatsEdit,
  };
}
