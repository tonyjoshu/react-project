import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import TextFieldCustom from "src/application/shared/components/TextField";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import selectOptions from "./data/select-options";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useRef, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { RiImageAddLine } from "react-icons/ri";
import MaterialDatePicker from "src/application/shared/components/material-date-picker";
import { BsTrash } from "react-icons/bs";

import { Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";
import { useNavigate } from "react-router-dom";
import { routeStrings } from "src/application/routing/routes";
import { FilePicker } from "src/application/shared/components/file-picker";
import apiCall from "src/helper_functions/api_call";
import { useAtomValue } from "jotai";
import { adminTokenConfig } from "src/config/jotai/atoms";
import toast from "react-hot-toast";

function AddPlayerForm({ playersHookData }) {
  let navigate = useNavigate();
  const selectFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const handleUploadSelect = () => {
    selectFileRef.current.click();
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const adminTokenAtomValue = useAtomValue(adminTokenConfig);
  const handleSubmit = async () => {
    const baseUrl = "http://api-v2.ligi.co.tz:4000";
    const url = `${baseUrl}/bulk/upload`;
    const formData = new FormData();
    formData.append("UploadFile", selectedFile, "Players");
    const body = formData;
    console.log(body);
    try {
      setUploadFileLoading(true);
      await apiCall({
        tokenRequired: true,
        config: adminTokenAtomValue.config,
        url,
        body,
        method: "post",
        formData: true,
      });
      setUploadFileLoading(false);
      playersHookData.handleRefresh();
    } catch (error) {
      setUploadFileLoading(false);
      toast.error("Something went wrong");
      throw error;
    }
  };

  return (
    <Column gap={30} style={{ marginTop: 20 }}>
      <Label
        a_s_left
        capitalize
        xBold
        xLarge
        color={"grey"}
        text={"Adding a new player"}
      />

      <InputFieldCustom
        label={"Name"}
        placeholder={"Player's name"}
        value={playersHookData.name}
        handleOnChange={(e) => playersHookData.set_name(e.target.value)}
        disabled={false}
        capitalize
      />

      <Row gap={10} style={{ fontWeight: "normal" }}>
        {selectOptions(playersHookData).map((info, index) => (
          <Column a_start key={index}>
            <FormControl
              sx={{
                minWidth: "100%",
                outline: "none",
                height: 60,
                marginBottom: 1,
              }}
            >
              <Label small marginLeft={10} capitalize text={info.label} />
              <Select
                value={info.value}
                onChange={info.onChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                style={{ marginTop: 10 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {info.options
                  ? info.options?.map((el, indexx) => (
                      <MenuItem key={indexx} value={el.name}>
                        {el.name}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
          </Column>
        ))}
      </Row>

      <MaterialDatePicker
        value={playersHookData.dob}
        setter={playersHookData.set_dob}
        label={"Date of birth"}
      />

      <Column style={{ gap: 5 }}>
        <Label
          // a_s_left
          small
          marginLeft={10}
          capitalize
          text={"Player avatar"}
        />
        <Label
          // a_s_left
          marginLeft={10}
          capitalize
          xBold
          color={"grey"}
          text={"Recommended size 500 x 500, Transparent PNG"}
        />
      </Column>

      <input
        type="file"
        ref={playersHookData.imageInputRef}
        onChange={playersHookData.handleImageSelect}
        style={{ display: "none" }}
      />

      {playersHookData.uploadedImageFile && (
        <img
          src={playersHookData.image}
          style={{
            height: 200,
            aspectRatio: 1,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}

      <ButtonStyled
        style={{
          backgroundColor: "white",
          color: "grey",
          border: "1px solid #85F4FF",
          marginBottom: 10,
          width: "fit-content",
          // alignSelf: "flex-start",
        }}
        onClick={() => playersHookData.imageInputRef.current.click()}
      >
        <Row gap={10}>
          <RiImageAddLine />
          <Label
            noWrap
            text={
              playersHookData.uploadedImageFile
                ? "Change player image"
                : "Pick player image"
            }
          />
        </Row>
      </ButtonStyled>

      {/* bulk update data */}
      {playersHookData.playersBulkList?.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Country</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {playersHookData.playersBulkList?.map((playerInfo, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    <Row gap={10}>
                      <img
                        src={playerInfo.preview_pic ?? ""}
                        style={{
                          height: 40,
                          aspectRatio: 1,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                      {playerInfo.name}
                    </Row>
                  </TableCell>
                  <TableCell align="left">
                    {playerInfo.countryObj.name}
                  </TableCell>
                  <TableCell align="center">
                    <ButtonStyled
                      style={{
                        color: "tomato",
                        border: "1px solid #85F4FF",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => playersHookData.handleDeleteItem(index)}
                    >
                      <Row gap={10} a_center j_center>
                        <BsTrash />
                        <Label color={"tomato"} text={"Remove"} />
                      </Row>
                    </ButtonStyled>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Row gap={10}>
        <ButtonStyled
          onClick={playersHookData.handleAddToBulkUpdate}
          style={{
            color: "#212121",
            border: "1px solid #85F4FF",
            backgroundColor: "transparent",
          }}
          disabled={playersHookData.addToBulkLoading}
        >
          {playersHookData.addToBulkLoading
            ? "loading ..."
            : "+ Add another player"}
        </ButtonStyled>

        {playersHookData.playersBulkList?.length > 0 ? (
          <ButtonStyled
            onClick={playersHookData.handleConfirmHandlePlayersInBulk}
          >
            {" "}
            Confirm add player in bulk
          </ButtonStyled>
        ) : (
          <ButtonStyled onClick={playersHookData.addPlayer}>
            {" "}
            Confirm add player
          </ButtonStyled>
        )}
      </Row>
      <FilePicker
        _ref={selectFileRef}
        handleFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        name="Players"
      />
      <Column style={{ gap: 5 }}>
        <Label text={"or"} />
        <div className="space-x-3 flex items-center justify-center whitespace-nowrap w-full">
          <Label
            bold
            pointer
            underline
            underlineOffset
            color={"grey"}
            text={"upload CSV file instead"}
            // onClick={() => navigate(routeStrings.uploadPlayerCSV)}
            onClick={handleUploadSelect}
          />
          {selectedFile && (
            <button
              onClick={handleSubmit}
              className="text-sm px-4 py-1 rounded-full bg-gray-300 font-bold"
            >
              {uploadFileLoading ? "Loading ..." : "Submit"}
            </button>
          )}
        </div>
      </Column>
    </Column>
  );
}

export default AddPlayerForm;
