import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import teamSeasonStatsHeaders from "./data/headers";
import tableContainer from "./styles/table-container";

function ResultsTable({ teamInfo }) {
  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        style={tableContainer(teamInfo)}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {teamSeasonStatsHeaders.map((header, index) => {
                return (
                  <TableCell
                    key={index}
                    align={index === 0 ? "left" : "center"}
                    style={{ fontWeight: 800 }}
                  >
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {teamInfo?.seasons.map((season, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{season.year}</TableCell>
                  <TableCell align="center">{season.wins}</TableCell>
                  <TableCell align="center">{season.draw}</TableCell>
                  <TableCell align="center">{season.lost}</TableCell>
                  <TableCell align="center">{season.plays}</TableCell>
                  <TableCell align="center">{season.scored_goals} </TableCell>
                  <TableCell align="center">{season.concided_goals} </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ResultsTable;
