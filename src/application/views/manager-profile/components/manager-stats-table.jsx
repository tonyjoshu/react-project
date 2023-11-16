import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Label from "src/application/shared/components/Label";
import Column from "src/application/shared/components/Column";

function ManagerStatsTable({ managerProfileHook }) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {["Team", "From", "To"].map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {((stats) => {
            let missingStat = "n/a";
            return stats.map((stat, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{stat?.team?.name ?? missingStat}</TableCell>
                  <TableCell>{stat?.from?.year ?? missingStat}</TableCell>
                  <TableCell>{stat?.to?.year ?? missingStat}</TableCell>
                </TableRow>
              );
            });
          })(managerProfileHook.managerHistory?.stats ?? [])}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ManagerStatsTable;
