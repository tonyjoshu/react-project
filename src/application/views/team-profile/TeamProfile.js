import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import useTeamProfile from "./useTeamProfileHook";

import { MdArrowBackIos } from "react-icons/md";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ResultsTable from "./components/results-table/ResultsTable";

function TeamProfile() {
  const { goBack, teamInfo, loading } = useTeamProfile();

  if (loading) {
    return (
      <Column>
        <p>loading ...</p>
      </Column>
    );
  } else {
    return (
      <Column gap={30}>
        <Row
          a_center
          j_start
          gap={5}
          onClick={goBack}
          style={{
            cursor: "pointer",
            width: 100,
            alignSelf: "flex-start",
          }}
        >
          <MdArrowBackIos />
          <Label noWrap text={"Teams"} />
        </Row>

        <Row a_center j_center gap={10}>
          <img
            src={teamInfo?.logo}
            alt={`${teamInfo?.name}'s logo`}
            style={{ width: 200 }}
          />

          <Column a_start style={{ width: "fit-content", gap: 0 }}>
            <Label xLarge noWrap capitalize text={teamInfo?.name} />
            <Label small noWrap text={"a.k.a " + teamInfo?.nick_name} />
            <Row a_center gap={10}>
              <Label large noWrap xBold text={teamInfo?.no_trophy} />
              <Label small noWrap text={"time(s) winners"} />
            </Row>
          </Column>
        </Row>

        <ResultsTable teamInfo={teamInfo} />
      </Column>
    );
  }
}

export default TeamProfile;
