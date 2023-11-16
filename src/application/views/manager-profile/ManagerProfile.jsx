import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import goBack from "src/helper_functions/goBack";

import { AiOutlineRight, AiOutlineUserDelete } from "react-icons/ai";
import { BsCheckCircle, BsChevronRight } from "react-icons/bs";
import { FaRegAddressCard, FaRegEdit } from "react-icons/fa";
import ButtonStyled from "../../shared/components/ButtonStyled";
import CustomImageSelector from "../../shared/components/image-select-custom";
import InputFieldCustom from "../../shared/components/input-field-cutom";
import MaterialDatePicker from "../../shared/components/material-date-picker";
import MaterialSelect from "../../shared/components/material-select";
import ModalPopUp from "../../shared/components/ModalPopUp";
import ManagerCurrentTeamInfo from "./components/manager-current-team";
import ManagerPersonalInformation from "./components/manager-personal-info";
import ManagerProfileImage from "./components/manager-profile-image";
import ManagerStatsTable from "./components/manager-stats-table";
import useManagerProfile from "./useManagerProfile";
import { ImCancelCircle } from "react-icons/im";

const ManagerProfile = () => {
  let navigate = useNavigate();
  const managerProfileHook = useManagerProfile();

  if (managerProfileHook.loading) {
    return <Label text={"loading ..."} />;
  }

  if (!managerProfileHook.loading) {
    return (
      <Column gap={30}>
        <Row
          a_center
          j_start
          gap={5}
          onClick={() => goBack(navigate)}
          style={{
            cursor: "pointer",
            width: 100,
            alignSelf: "flex-start",
          }}
        >
          <MdArrowBackIos />
          <Label noWrap text={"Managers"} />
        </Row>

        <Row a_center j_center gap={20}>
          <Row a_center j_center gap={10} style={{ width: "fit-content" }}>
            <ManagerCurrentTeamInfo managerProfileHook={managerProfileHook} />
            <ManagerProfileImage managerProfileHook={managerProfileHook} />
          </Row>
          <Column a_start style={{ width: "fit-content" }}>
            <ManagerPersonalInformation
              managerProfileHook={managerProfileHook}
            />
            <ButtonStyled
              onClick={managerProfileHook.handleAddHistoryPopUpOpen}
              disabled={managerProfileHook.loading}
              style={{ backgroundColor: "whitesmoke" }}
              className="bg-[whitesmoke] text-black flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#85F4FF]"
            >
              <FaRegAddressCard />
              <p>Add player history</p>
            </ButtonStyled>

            <ButtonStyled
              onClick={managerProfileHook.handlePopUpOpen}
              disabled={managerProfileHook.loading}
              style={{ backgroundColor: "whitesmoke" }}
              className="bg-[whitesmoke] text-black flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#85F4FF]"
            >
              <FaRegEdit />
              <p>Edit manager info</p>
            </ButtonStyled>

            <ButtonStyled
              onClick={managerProfileHook.handleOpenRemovePopUp}
              disabled={managerProfileHook.removeManagerLoading}
              style={{ backgroundColor: "#EF4444" }}
              className="bg-[#EF4444] text-white flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#2F57A3]"
            >
              <AiOutlineUserDelete />
              <p>Remove manager</p>
            </ButtonStyled>
          </Column>
        </Row>

        <ManagerStatsTable managerProfileHook={managerProfileHook} />

        <ModalPopUp
          open={managerProfileHook.addHostoryPopUp}
          handleClose={managerProfileHook.handleAddHistoryPopUpClose}
          children={
            <>
              <Label text={"add manager history"} />

              <MaterialSelect
                value={managerProfileHook.addHistoryTeamName}
                setter={managerProfileHook.setAddHistoryTeamName}
                options={(function (clubList) {
                  const dt = clubList?.map((clubObj) => {
                    return {
                      label: clubObj.name,
                      value: clubObj._id,
                    };
                  });
                  return dt;
                })(managerProfileHook.teams)}
                label={"Club"}
              />

              <MaterialDatePicker
                label={"Starting date"}
                value={managerProfileHook.managerHistoryStartDate}
                setter={managerProfileHook.setManagerHistoruStartDate}
              />

              <MaterialDatePicker
                label={"Finshed date"}
                value={managerProfileHook.managerHistoryEndDate}
                setter={managerProfileHook.setManagerHistoruEndDate}
              />

              <ButtonStyled
                onClick={managerProfileHook.handleConfirmAddManagerHistory}
                disabled={managerProfileHook.loading}
              >
                <Row a_center j_center gap={10}>
                  <Label noWrap text={"Confirm"} />
                  <AiOutlineRight />
                </Row>
              </ButtonStyled>
            </>
          }
        />

        <ModalPopUp
          open={managerProfileHook.popUpOpen}
          handleClose={managerProfileHook.handlePopUpClose}
          children={
            <>
              <Label
                xLarge
                color={"grey"}
                a_s_left
                xBold
                text={"Editing manager info"}
              />

              <InputFieldCustom
                type={"text"}
                label={"Name"}
                placeholder={"Managers name"}
                value={managerProfileHook.name}
                setter={managerProfileHook.setName}
              />

              <MaterialSelect
                value={managerProfileHook.managerClub}
                setter={managerProfileHook.setManagerClub}
                options={(function (clubList) {
                  const dt = clubList?.map((clubObj) => {
                    return {
                      label: clubObj.name,
                      value: clubObj._id,
                    };
                  });
                  return dt;
                })(managerProfileHook.teams)}
                label={"Club"}
              />

              <MaterialSelect
                value={managerProfileHook.country}
                setter={managerProfileHook.setCountry}
                options={(function (countryList) {
                  const dt = countryList.map((countryObj) => {
                    return {
                      label: countryObj.name.split(",")[0],
                      value: countryObj.code,
                      dialCode: countryObj.dial_code,
                    };
                  });
                  return dt;
                })(managerProfileHook.countries)}
                label={"Country"}
              />

              <InputFieldCustom
                type={"number"}
                label={"Height in (cm)"}
                placeholder={"Managers height in cm"}
                value={managerProfileHook.height}
                setter={managerProfileHook.setHeight}
              />

              <MaterialDatePicker
                value={managerProfileHook.dob}
                setter={managerProfileHook.setDob}
                label={"Date of birth"}
              />

              <CustomImageSelector
                picInputRef={managerProfileHook.picInputRef}
                image={managerProfileHook.image}
                setter={managerProfileHook.setImage}
                buttonLabel={"Pick image"}
                imageFileSetter={managerProfileHook.setImageFile}
              />

              <ButtonStyled onClick={managerProfileHook.handleConfirm}>
                <Row j_center a_center gap={10}>
                  <Label text={"Confirm adding manager"} />
                  <BsChevronRight style={{ fontSize: "large" }} />
                </Row>
              </ButtonStyled>
            </>
          }
        />

        <ModalPopUp
          open={managerProfileHook.removeManagerPopUp}
          handleClose={managerProfileHook.handleCancelRemovePopUp}
          height="fit-height"
          children={
            managerProfileHook.removeManagerLoading ? (
              <p>Removing manager, please wait ...</p>
            ) : (
              <>
                <p>
                  Are you sure you want to delete{" "}
                  <span className="font-bold">
                    {managerProfileHook.manager?.name}
                  </span>{" "}
                  's details ?
                </p>
                <div className="flex flex-col items-center justify-center w-full md:flex-row gap-2 ">
                  <ButtonStyled
                    onClick={managerProfileHook.handleCancelRemovePopUp}
                    style={{ backgroundColor: "#EF4444" }}
                    className="bg-[#EF4444] font-normal text-white flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#2F57A3]"
                  >
                    <ImCancelCircle />
                    <p>
                      <span className="font-bold">No</span>, cancel deleting
                      manager
                    </p>
                  </ButtonStyled>

                  <ButtonStyled
                    onClick={managerProfileHook.handleConfirmRemovePopUp}
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
};

export default ManagerProfile;
