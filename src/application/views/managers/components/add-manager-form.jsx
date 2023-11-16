import * as React from "react";
import { useRef, useState } from "react";
import Column from "src/application/shared/components/Column";
import Row from "src/application/shared/components/Row";
import Label from "src/application/shared/components/Label";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import InputFieldCustom from "../../../shared/components/input-field-cutom";
import MaterialSelect from "../../../shared/components/material-select";
import MaterialDatePicker from "../../../shared/components/material-date-picker";
import { BsChevronRight } from "react-icons/bs";
import CustomImageSelector from "../../../shared/components/image-select-custom";
import { uploadImageToCloudinary } from "../../../../helper_functions/upload_to_cloudinary";
import dayMonthFormatter from "../../../../helper_functions/day-month-formatter";
import apiCall from "../../../../helper_functions/api_call";
import URLS from "../../../../config/urls/urls";
import { useAtomValue } from "jotai";
import { adminTokenConfig } from "../../../../config/jotai/atoms";
import { routeStrings } from "src/application/routing/routes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddManagerForm({ managersHookData }) {
  let navigate = useNavigate();
  const addManagerFormHook = useAddManagerForm(managersHookData.countries);

  if (addManagerFormHook.loading) {
    return <Label text={"loading ..."} />;
  }

  if (!addManagerFormHook.loading) {
    return (
      <Column gap={30} style={{ marginTop: 20 }}>
        <Label
          a_s_left
          capitalize
          xBold
          color={"grey"}
          xLarge
          text={"Adding a new manager"}
        />
        <InputFieldCustom
          type={"text"}
          label={"Name"}
          placeholder={"Managers name"}
          value={addManagerFormHook.name}
          setter={addManagerFormHook.setName}
          capitalize
        />

        <MaterialSelect
          value={addManagerFormHook.managerClub}
          setter={addManagerFormHook.setManagerClub}
          options={(function (clubList) {
            const dt = clubList.map((clubObj) => {
              return {
                label: clubObj.name,
                value: clubObj._id,
              };
            });
            return dt;
          })(managersHookData.clubs)}
          label={"Club"}
        />

        <MaterialSelect
          value={addManagerFormHook.country}
          setter={addManagerFormHook.setCountry}
          options={(function (countryList) {
            const dt = countryList.map((countryObj) => {
              return {
                label: countryObj.name,
                value: countryObj.code,
                dialCode: countryObj.dial_code,
              };
            });
            return dt;
          })(managersHookData.countries)}
          label={"Country"}
        />

        <MaterialDatePicker
          value={addManagerFormHook.dob}
          setter={addManagerFormHook.setDob}
          label={"Date of birth"}
        />

        <CustomImageSelector
          picInputRef={addManagerFormHook.picInputRef}
          image={addManagerFormHook.image}
          setter={addManagerFormHook.setImage}
          buttonLabel={"Pick image"}
          imageFileSetter={addManagerFormHook.setImageFile}
        />

        <ButtonStyled onClick={addManagerFormHook.handleConfirm}>
          <Row j_center a_center gap={10}>
            <Label text={"Confirm adding manager"} />
            <BsChevronRight style={{ fontSize: "large" }} />
          </Row>
        </ButtonStyled>

        <Column style={{ gap: 5 }}>
          <Label text={"or"} />
          <Label
            bold
            pointer
            underline
            underlineOffset
            color={"grey"}
            text={"upload CSV file instead"}
            onClick={() => navigate(routeStrings.uploadManagerCSV)}
          />
        </Column>
      </Column>
    );
  }
}

export default AddManagerForm;

const useAddManagerForm = (countries) => {
  const [managerClub, setManagerClub] = useState("");
  const [country, setCountry] = useState("");
  const [height, setHeight] = useState(150);
  const [dob, setDob] = useState(null);
  const [name, setName] = useState("");
  // image
  const picInputRef = useRef();
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();

  // loading
  const [loading, setLoading] = useState(false);

  // admin token config
  const { config: _config } = useAtomValue(adminTokenConfig);

  async function handleConfirm() {
    if (name === "") {
      toast.error("Name field should not be empty");
      return false;
    }

    if (managerClub === "") {
      toast.error("Club field should not be empty");
      return false;
    }

    if (country === "") {
      toast.error("Country field should not be empty");
      return false;
    }

    setLoading(true);
    const selectedCountry = await countries.find(
      (_country) => _country.code === country
    );
    let _body = {
      name: name,
      current_club: managerClub,
      country: selectedCountry.code,
      country_code: selectedCountry.dial_code.replace("+", ""),
      height_in_cm: height,
      dob: (function (date) {
        return `${date.getFullYear()}-${dayMonthFormatter(
          date.getMonth() + 1
        )}-${dayMonthFormatter(date.getDate())}`;
      })(new Date(dob)),
      pic: await uploadImageToCloudinary(imageFile),
    };

    apiCall({
      url: URLS.managerAdd,
      method: "post",
      tokenRequired: true,
      config: _config,
      body: _body,
    })
      .then((resp) => {})
      .finally(() => {
        setLoading(false);
        window.location.reload();
      });
  }

  return {
    managerClub,
    setManagerClub,
    country,
    setCountry,
    height,
    setHeight,
    dob,
    setDob,
    picInputRef,
    image,
    setImage,
    setImageFile,
    name,
    setName,
    handleConfirm,
    loading,
  };
};
