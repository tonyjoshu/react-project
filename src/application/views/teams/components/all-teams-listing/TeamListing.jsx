import { AiFillEye, AiFillTrophy, AiOutlineTeam } from "react-icons/ai";
import { BsCheckCircle, BsNewspaper, BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { routeStrings } from "src/application/routing/routes";
import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";

import Popover from "@mui/material/Popover";
import { useAtomValue } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import ModalPopUp from "src/application/shared/components/ModalPopUp";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import styled from "styled-components";

export default function TeamListing({
  handleEditPopUpOpen,
  setRerun,
  setLoading,
  sortedTeams,
}) {
  const { config } = useAtomValue(adminTokenConfig);
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const [clickedTeam, setClickedTeam] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // for removing team
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const handleOpenPopUpRemoveTeam = () => setShowDeletePopUp(true);
  const handleCancelRemoveTeam = () => setShowDeletePopUp(false);
  const handleCloseRemoveTeam = () => setShowDeletePopUp(false);

  return (
    <Column gap={30} style={{ marginBottom: 40 }}>
      {sortedTeams.map((datum, index) => {
        return (
          <Row
            key={index}
            gap={20}
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              overflow: "clip",
              boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Row
              gap={10}
              style={{
                cursor: "pointer",
                paddingBlock: 10,
                paddingInline: 20,
                width: "30%",
              }}
            >
              <img
                src={datum?.logo}
                style={{ width: 60, aspectRatio: 1, borderRadius: "20%" }}
              />
              <Column a_start j_center gap={5} style={{ paddingBlock: 0 }}>
                <Label noWrap capitalize xBold text={datum?.name} />
                <Label
                  small
                  text={
                    datum?.founded ? `Established on ${datum?.founded}` : ""
                  }
                />
              </Column>
            </Row>
            <Row
              j_end
              gap={20}
              style={{ width: "100%", fontSize: "large", marginRight: 20 }}
            >
              {(() => {
                const data = [
                  {
                    color: "#2BC155",
                    label: "Players",
                    icon: (
                      <AiOutlineTeam
                        style={{
                          fontSize: "x-large",
                          color: "#fff",
                        }}
                      />
                    ),
                    value: datum?.teamPlayersCount,
                  },
                  {
                    color: "#FD6162",
                    label: "NPL Winners",
                    icon: (
                      <AiFillTrophy
                        style={{ fontSize: "x-large", color: "#fff" }}
                      />
                    ),
                    value: datum?.no_trophy ?? 0,
                  },
                  // {
                  //   color: "#828282",
                  //   label: "News Associated",
                  //   icon: (
                  //     <BsNewspaper
                  //       style={{
                  //         fontSize: "x-large",
                  //         color: "#fff",
                  //       }}
                  //     />
                  //   ),
                  //   value: 56,
                  // },
                  // {
                  //   color: "#7B61FF",
                  //   label: "Engagements",
                  //   icon: (
                  //     <AiFillEye
                  //       style={{
                  //         fontSize: "x-large",
                  //         color: "#fff",
                  //       }}
                  //     />
                  //   ),
                  //   value: "214K",
                  // },
                ];

                return data.map((datum, index) => (
                  <IconAndLabel
                    key={index}
                    value={datum.value}
                    icon={datum.icon}
                    label={datum.label}
                    color={datum.color}
                  />
                ));
              })()}

              <div
                aria-describedby={id}
                style={{
                  height: 50,
                  aspectRatio: 1,
                  backgroundColor: "#fff",
                  border: "1px solid #85F4FF",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#212121",
                  cursor: "pointer",
                }}
                onClick={(event) => {
                  handleClick(event);
                  setClickedTeam(index);
                }}
              >
                <BsThreeDots />
              </div>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                elevation={0}
              >
                <Column
                  style={{
                    width: 300,
                    padding: 20,
                    borderRadius: 10,
                    border: "1px solid #85F4FF",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  {[
                    {
                      label: "View",
                      onClick: () =>
                        handleViewTeam(navigate, sortedTeams, clickedTeam),
                    },
                    {
                      label: "Edit",
                      onClick: () =>
                        handleUpdateTeam(
                          sortedTeams,
                          clickedTeam,
                          handleEditPopUpOpen
                        ),
                    },
                    {
                      label: "Remove",
                      onClick: handleOpenPopUpRemoveTeam,
                    },
                  ].map((data, index) => (
                    <DotsMenus
                      key={index}
                      onClick={() => {
                        handleClose();
                        data.onClick(datum);
                      }}
                    >
                      <Label noWrap bold text={`${data.label} team`} />
                    </DotsMenus>
                  ))}
                </Column>
              </Popover>
              <ModalPopUp
                open={showDeletePopUp}
                handleClose={handleCancelRemoveTeam}
                height="fit-content"
                children={
                  deleteLoading ? (
                    <p>Deleting team, please wait ...</p>
                  ) : (
                    <>
                      <p>
                        Are you sure you want to delete the team{" "}
                        <span className="font-bold">
                          {sortedTeams.at(clickedTeam).name}
                        </span>{" "}
                        ?
                      </p>
                      <div className="flex flex-col items-center justify-center w-full gap-2 md:flex-row ">
                        <ButtonStyled
                          onClick={handleCancelRemoveTeam}
                          style={{ backgroundColor: "#EF4444" }}
                          className="bg-[#EF4444] font-normal text-white flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#2F57A3]"
                        >
                          <ImCancelCircle />
                          <p>
                            <span className="font-bold">No</span>, cancel
                            deleting team
                          </p>
                        </ButtonStyled>

                        <ButtonStyled
                          onClick={() => {
                            handleDeleteTeam(
                              sortedTeams,
                              clickedTeam,
                              config,
                              setRerun,
                              setLoading,
                              setDeleteLoading,
                              handleCloseRemoveTeam
                            );
                          }}
                          className="text-white font-normal flex items-center space-x-2 justify-center w-full h-[40px] p-2 border border-[#2F57A3]"
                        >
                          <BsCheckCircle />
                          <p>
                            <span className="font-bold">Yes</span>, proceed to
                            delete
                          </p>
                        </ButtonStyled>
                      </div>
                    </>
                  )
                }
              />
            </Row>
          </Row>
        );
      })}
    </Column>
  );
}

const handleViewTeam = (navigate, sortedTeams, clickedTeam) => {
  navigate(`${routeStrings.teamProfile}/${sortedTeams[clickedTeam]._id}`);
};

const handleUpdateTeam = (sortedTeams, clickedTeam, handleEditPopUpOpen) => {
  const { name, nick_name, logo, team_color, no_trophy, seasons } =
    sortedTeams[clickedTeam];
  handleEditPopUpOpen({
    team_id: sortedTeams[clickedTeam]?._id,
    name,
    nick_name,
    logo,
    team_color,
    no_trophy,
    seasons: seasons.map((season) => season.year),
  });
};

const handleDeleteTeam = async (
  sortedTeams,
  clickedTeam,
  config,
  setRerun,
  setLoading,
  setDeleteLoading,
  handleCloseRemoveTeam
) => {
  try {
    // setLoading(true);
    setDeleteLoading(true);
    const { _id, name } = sortedTeams.at(clickedTeam);
    const response = await apiCall({
      url: `${URLS.teams}/delete/${_id}`,
      method: "delete",
      tokenRequired: true,
      config,
    });
    console.log(response.data);
    toast.success(`The team named ${name} is deleted successfully`);
    // setLoading(false);
    setDeleteLoading(false);
    handleCloseRemoveTeam();
    setRerun((prev) => prev + 1);
  } catch (error) {
    // setLoading(false);
    setDeleteLoading(false);
    toast.error("Something went wrong, could not delete the team");
    console.log("error", error);
    handleCloseRemoveTeam();
  }
};

const DotsMenus = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  transition: 0.3s;

  &:hover {
    background-color: #e2e6ee;
  }
`;

function IconAndLabel({ icon, value, label, color }) {
  return (
    <Row gap={10} style={{ width: "fit-content", fontSize: "large" }}>
      <div
        style={{
          height: "100%",
          backgroundColor: color,
          padding: 10,
          borderRadius: 10,
        }}
      >
        {icon}
      </div>
      <Column a_start style={{ width: 100 }}>
        <Label width={30} large bold text={value} />
        <Label small noWrap large text={label ?? ""} />
      </Column>
    </Row>
  );
}
