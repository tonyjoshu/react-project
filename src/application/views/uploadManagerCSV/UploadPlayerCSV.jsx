import Column from "src/application/shared/components/Column";
import { Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";
import { Paper, TableContainer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Row from "src/application/shared/components/Row";
import { FaChevronLeft } from "react-icons/fa";
import Label from "src/application/shared/components/Label";
import apiCall from "src/helper_functions/api_call";
import URLS from "src/config/urls/urls";
import { useAtomValue } from "jotai";
import { adminTokenConfig } from "src/config/jotai/atoms";

export default function UploadManagerCSV() {
  let navigate = useNavigate();
  const { config } = useAtomValue(adminTokenConfig);

  return (
    <Column>
      <Row
        gap={10}
        onClick={() => navigate(-1)}
        style={{
          cursor: "pointer",
          width: "fit-content",
          alignSelf: "flex-start",
        }}
      >
        <FaChevronLeft />
        <Label text={"Back"} />
      </Row>
      <TableContainer component={Paper} elevatio={0}>
        <Importer
          assumeNoHeaders={false} // optional, keeps "data has headers" checkbox off by default
          restartable={false} // optional, lets user choose to upload another file when import is complete
          onStart={({ file, preview, fields, columnFields }) => {
            // optional, invoked when user has mapped columns and started import
            // prepMyAppForIncomingData();
            // console.log(fields);
          }}
          processChunk={async (rows, { startIndex }) => {
            // required, may be called several times
            // receives a list of parsed objects based on defined fields and user column mapping;
            // (if this callback returns a promise, the widget will wait for it before parsing more data)
            for (let row of rows) {
              console.log("processChunk: ", row);
              /**
               * send an api request to register this player
               */
              await apiCall({
                url: URLS.managerAdd,
                tokenRequired: true,
                config,
                method: "post",
                body: row,
              });
            }
          }}
          onComplete={({ file, preview, fields, columnFields }) => {
            // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
            // showMyAppToastNotification();
            console.log("onComplete: ", fields);
          }}
          onClose={({ file, preview, fields, columnFields }) => {
            // optional, if this is specified the user will see a "Finish" button after import is done,
            // which will call this when clicked
            // goToMyAppNextPage();
            console.log("onClose: ", fields);
            navigate(-1);
          }}
        >
          <ImporterField name="name" label="name" />
          <ImporterField name="country" label="country" />
          <ImporterField name="country_code" label="country_code" />
          <ImporterField name="dob" label="dob" />
          <ImporterField name="current_club" label="current_club" />
          <ImporterField name="current_club" label="current_club" />
          <ImporterField name="pic" label="pic" />
        </Importer>
      </TableContainer>
    </Column>
  );
}
