import { useAtomValue } from "jotai";
import { useState } from "react";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import ModalPopUp from "src/application/shared/components/ModalPopUp";
import { adminTokenConfig } from "../../../../../config/jotai/atoms";
import URLS from "../../../../../config/urls/urls";
import apiCall from "../../../../../helper_functions/api_call";
import useStateSetter from "../../../../../helper_functions/useStateSetter";
import PlayerProfileBullet from "../player-profile-bullet";
import InputFieldCustom from "./components/input-field-cutom";
import playerEditPopUpFieldValues from "./data/edit-field-values";
import playerPersonalInfo from "./data/personal-info";

import { AiOutlineUserDelete } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import generateYearsList from "../../../../../helper_functions/generate-yers-list";
import MaterialSelect from "../../../../shared/components/material-select";
import { ImCancelCircle } from "react-icons/im";
import toast from "react-hot-toast";

function PlayerPersonalInformation({ playerProfileHook }) {
  const playerPersonalInfoHook = usePlayerPersonalInfo(playerProfileHook);

  return (
    <Column a_start j_center gap={10} style={{ width: "fit-content" }}>
      {playerPersonalInfo(playerProfileHook).map((info, index) => (
        <PlayerProfileBullet
          key={index}
          label={info.label}
          value={info.value}
        />
      ))}
      <ButtonStyled
        className="bg-white text-black flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#2F57A3]"
        onClick={playerPersonalInfoHook.handleModalOpen}
      >
        <FaRegAddressCard />
        <p>Add player history</p>
      </ButtonStyled>

      <ButtonStyled
        onClick={playerPersonalInfoHook.handleDeleteClick}
        style={{ backgroundColor: "#EF4444" }}
        className="bg-[#EF4444] text-white flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#2F57A3]"
      >
        <AiOutlineUserDelete />
        <p>Remove player</p>
      </ButtonStyled>

      <ModalPopUp
        open={playerPersonalInfoHook.modalOpen}
        handleClose={playerPersonalInfoHook.handleModalClose}
        children={
          playerPersonalInfoHook.loading ? (
            <Label text={"loading ..."} />
          ) : (
            <>
              <Label
                a_s_left
                xBold
                xLarge
                color={"grey"}
                text={`Adding player history`}
              />
              <Label
                a_s_left
                xBold
                large
                color={"grey"}
                text={`Personal Information (read only)`}
              />
              {playerEditPopUpFieldValues(playerProfileHook).map(
                (info, index) => (
                  <InputFieldCustom
                    key={index}
                    label={info.label}
                    value={info.value}
                    placeholder={info.placeholder}
                    disabled={info.disabled}
                  />
                )
              )}

              <br />

              <Label
                a_s_left
                xBold
                large
                color={"grey"}
                text={`Season history`}
              />

              {playerPersonalInfoHook.inputsData.map((datum, index) => {
                if (datum.label === "Season") {
                  return (
                    <MaterialSelect
                      key={index}
                      label={datum.label}
                      value={datum.value}
                      setter={datum.setter}
                      options={(function (seasons) {
                        return seasons.map((season) => {
                          return {
                            value: season,
                            label: season,
                          };
                        });
                      })(datum.options)}
                    />
                  );
                }

                if (datum.label === "Team") {
                  return (
                    <MaterialSelect
                      key={index}
                      label={datum.label}
                      value={datum.value}
                      setter={datum.setter}
                      options={(function (teams) {
                        let sortedTeams = teams?.sort((a, b) =>
                          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                        );
                        return sortedTeams.map((team) => {
                          return {
                            value: team._id,
                            label: team.name,
                          };
                        });
                      })(datum.options)}
                    />
                  );
                }

                if (datum.label === "Position") {
                  return (
                    <MaterialSelect
                      key={index}
                      label={datum.label}
                      value={datum.value}
                      setter={datum.setter}
                      options={(function (positions) {
                        return positions?.map((position) => {
                          return {
                            value: position.short,
                            label: position.full,
                          };
                        });
                      })(datum.options)}
                    />
                  );
                }
                return (
                  <InputFieldCustom
                    key={index}
                    type={datum.type}
                    label={datum.label}
                    placeholder={datum.placeHolder}
                    value={datum.value}
                    setter={datum.setter}
                    min={datum.type === "number" ? 0 : ""}
                  />
                );
              })}

              <ButtonStyled
                onClick={playerPersonalInfoHook.handleAddPlayerHistory}
              >
                Confirm
              </ButtonStyled>
            </>
          )
        }
      />

      <ModalPopUp
        open={playerPersonalInfoHook.deleteModal}
        handleClose={playerPersonalInfoHook.handleCancelDelete}
        height="fit-content"
        children={
          playerPersonalInfoHook.loadingDelete ? (
            <p>Deleting player, please wait ...</p>
          ) : (
            <>
              <p>
                Are you sure you want to delete{" "}
                <span className="font-bold">
                  {playerProfileHook.playerDetails?.name}
                </span>{" "}
                's details ?
              </p>
              <div className="flex flex-col items-center justify-center w-full md:flex-row gap-2 ">
                <ButtonStyled
                  onClick={playerPersonalInfoHook.handleCancelDelete}
                  style={{ backgroundColor: "#EF4444" }}
                  className="bg-[#EF4444] font-normal text-white flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#2F57A3]"
                >
                  <ImCancelCircle />
                  <p>
                    <span className="font-bold">No</span>, cancel deleting
                    player
                  </p>
                </ButtonStyled>

                <ButtonStyled
                  onClick={playerPersonalInfoHook.handleConfirmDelete}
                  className="text-white font-normal flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#2F57A3]"
                >
                  <BsCheckCircle />
                  <p>
                    <span className="font-bold">Yes</span>, proceed to delete
                  </p>
                </ButtonStyled>
              </div>
            </>
          )
        }
      />
    </Column>
  );
}

export default PlayerPersonalInformation;

export const positions = [
  { full: "Goal Keeper", short: "GK" },
  { full: "Central Back", short: "CB" },
  { full: "Right Back", short: "RB" },
  { full: "Left Back", short: "LB" },
  { full: "Central Midfielder", short: "CM" },
  { full: "Central Attacking Midfielder", short: "CAM" },
  { full: "Attacking Midfielder", short: "AM" },
  { full: "Center Forward", short: "CF" },
  { full: "Left Forward", short: "LF" },
  { full: "Right Forward", short: "RF" },
];

const usePlayerPersonalInfo = (playerProfileHook) => {
  let navigate = useNavigate();
  const { config } = useAtomValue(adminTokenConfig);

  const [shirtNumber, setShirtNumber] = useState(0);
  const [marketValue, setMarketValue] = useState(0);
  const [position, setPosition] = useState("");
  const [positionIndex, setPositionIndex] = useState(0);
  const [assists, setAssists] = useState(0);
  const [goals, setGoals] = useState(0);
  const [cleanSheet, setCleanSheet] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  const [teams, setTeams] = useState([]);
  const [seasonList, setSeasonList] = useState([]);

  const season = "2018-2019";

  const [loading, setLoading] = useState(false);

  // modal
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen() {
    setModalOpen(true);
    setLoading(true);
    apiCall({ url: URLS.teams })
      .then((res) => {
        setTeams((prev) => useStateSetter(prev, res.data));
        setSeasonList((prev) => useStateSetter(prev, generateYearsList()));
      })
      .finally(() => setLoading(false));
  }

  function handleModalClose() {
    setModalOpen(false);
    setShirtNumber(0);
    setPositionIndex(0);
    setAssists(0);
    setGoals(0);
    setCleanSheet(0);
    setPosition("");
    setSelectedTeam("");
    setSelectedSeason("");
  }

  const onTeamChange = (event) => setSelectedTeam(event.target.value);
  const onPositionChange = (event) => setPositionIndex(event.target.value);

  const inputsData = [
    {
      label: "Season",
      placeHolder: "Season",
      value: selectedSeason,
      setter: setSelectedSeason,
      type: "text",
      options: seasonList,
    },
    {
      label: "Team",
      placeHolder: "Team",
      value: selectedTeam,
      setter: setSelectedTeam,
      type: "text",
      options: teams,
    },
    {
      label: "Position",
      placeHolder: "Position",
      value: position,
      setter: setPosition,
      type: "text",
      options: positions,
    },
    {
      label: "Shirt Number",
      placeHolder: "Shirt Number",
      value: shirtNumber,
      setter: setShirtNumber,
      type: "number",
    },
  ];

  const handleAddPlayerHistory = () => {
    setLoading(true);

    let _body = {
      player: playerProfileHook.player_id,
      stats: {
        team: selectedTeam,
        shirt_number: shirtNumber,
        position: positions.find((psn) => psn.short === position).full,
        position_short: position,
        season: selectedSeason,
      },
    };

    apiCall({
      url: URLS.addPlayerHistory,
      method: "post",
      tokenRequired: true,
      config,
      body: _body,
    })
      .then((res) => {})
      .finally(() => {
        setLoading(false);
        playerProfileHook.setA((prev) => prev + 1);
      });
  };

  // for delete player
  // playerId = playerProfileHook.player_id
  const [deleteModal, setDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDeleteClick = () => setDeleteModal(true);
  const handleCancelDelete = () => setDeleteModal(false);
  const handleConfirmDelete = async () => {
    setLoadingDelete(true);
    try {
      const response = await apiCall({
        url: `${URLS.players}/delete/${playerProfileHook.player_id}`,
        config: config,
        method: "delete",
        tokenRequired: true,
      });
      setDeleteModal(false);
      setLoadingDelete(false);
      console.log(response.data);
      navigate(-1);
    } catch (error) {
      setDeleteModal(false);
      setLoadingDelete(false);
      console.log("error", error);
      toast.error("Could not delete the player");
      playerProfileHook.setA((prev) => prev + 1);
    }
  };

  return {
    inputsData,
    selectedTeam,
    onTeamChange,
    loading,
    handleAddPlayerHistory,
    teams,
    positions,
    position,
    setPosition,
    positionIndex,
    onPositionChange,
    season,
    seasonList,
    modalOpen,
    handleModalOpen,
    handleModalClose,
    deleteModal,
    loadingDelete,
    handleDeleteClick,
    handleCancelDelete,
    handleConfirmDelete,
  };
};
