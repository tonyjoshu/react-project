import { useAtomValue } from "jotai";
import React, { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { AiOutlineRight } from "react-icons/ai";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Column from "src/application/shared/components/Column";
import { FilePicker } from "src/application/shared/components/file-picker";
import CustomImageSelector from "src/application/shared/components/image-select-custom";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import MultipleSelectChip from "src/application/shared/components/Select/CustomSelect";
import { adminTokenConfig } from "src/config/jotai/atoms";
import apiCall from "src/helper_functions/api_call";
import teamFormTextInputValues from "../../data/team-form-input-values";

export default function TeamPopUpForm({ teamsHookValues, title, add }) {
  const selectFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
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
    formData.append("UploadFile", selectedFile, "Teams");
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
      teamsHookValues.handleRefresh();
    } catch (error) {
      setUploadFileLoading(false);
      toast.error("Something went wrong");
      throw error;
    }
  };

  return (
    <>
      <Row style={{ marginBottom: 20 }}>
        <Label bold xLarge color={"grey"} text={title} />
      </Row>
      {teamFormTextInputValues(teamsHookValues).map((val, index) => (
        <InputFieldCustom
          key={index}
          type={val.type ?? "text"}
          min={(() => {
            if (val.type !== "number") return "";
            if (val.label.toLowerCase().includes("year")) return 1900;
            return 0;
          })()}
          label={val.label}
          value={val.value}
          placeholder={val.placeHolder}
          handleOnChange={val.handleOnChange}
        />
      ))}

      <Column a_start>
        <Label small marginLeft={10} text={"Seasons participated"} />
        <MultipleSelectChip
          options={teamsHookValues.seasonYears}
          value={teamsHookValues.seasons}
          setter={teamsHookValues.setseasons}
        />
      </Column>

      <CustomImageSelector
        picInputRef={teamsHookValues.hiddenFileInput}
        imageFileSetter={teamsHookValues.setuploadedImageFile}
        image={teamsHookValues.selectedImage}
        setter={teamsHookValues.setselectedImage}
        buttonLabel={"Change image"}
      />

      <Label a_s_left small text={"Team Color"} />

      <Row a_center j_between gap={10}>
        <Column style={{ width: "fit-content" }}>
          <HexColorPicker
            color={teamsHookValues.color}
            onChange={teamsHookValues.handleColorChange}
          />
          <InputFieldCustom
            label={"manual color code"}
            placeholder={"e.g ff22f5"}
            value={teamsHookValues.manualColor}
            handleOnChange={teamsHookValues.handleManualColorChange}
          />
        </Column>
        <div
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 10,
            backgroundColor: teamsHookValues.color ?? "#212121",
          }}
        />
      </Row>
      <ButtonStyled
        onClick={
          add
            ? teamsHookValues.handleAddNewTeam
            : teamsHookValues.handleEditTeam
        }
        style={{ marginTop: 20 }}
        disabled={teamsHookValues.popUpLoading}
      >
        <Row j_center gap={10}>
          <Label
            text={
              teamsHookValues.popUpLoading
                ? "loading ..."
                : add
                ? "Confirm addding a team"
                : "Confirm editing team"
            }
          />
          <AiOutlineRight style={{ color: "#fff" }} />
        </Row>
      </ButtonStyled>

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
    </>
  );
}
