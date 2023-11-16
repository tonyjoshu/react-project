import React from "react";

import { MdAdd } from "react-icons/md";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import ModalPopUp from "src/application/shared/components/ModalPopUp";

import useAddMatch from "./useAddMatch";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MaterialSelect from "src/application/shared/components/material-select";

const AddMatch = ({ matchHookData }) =>
{
  const addMatchHook = useAddMatch(matchHookData.setUpdateIndex);

  return (
    <Column a_end>
      <Row a_start j_between style={ { marginBottom: 20 } }>
        <Label xBold capitalize noWrap xLarge color={ "grey" } text={ "Matches" } />
        <ButtonStyled
          onClick={ addMatchHook.handlePopUpOpen }
          style={ { width: "fit-content", paddingInline: 20 } }
        >
          <Label noWrap text={ "Add Match" } />
        </ButtonStyled>
      </Row>
      <ModalPopUp
        open={ addMatchHook.popUpValue }
        handleClose={ addMatchHook.handlePopUpClose }
        children={
          <>
            { addMatchHook.popUpLoading ? (
              <Label text={ "loading ..." } />
            ) : (
              <>
                <Row gap={ 10 }>
                  <MaterialSelect
                    label={ "Home team" }
                    value={ addMatchHook.homeTeam }
                    setter={ addMatchHook.setHomeTeam }
                    options={ ((teams) =>
                    {
                      return teams.map(team => ({
                        value: team._id,
                        label: team.name
                      }))
                    })(addMatchHook.homeTeams ?? []) }
                  />

                  <MaterialSelect
                    label={ "Away team" }
                    value={ addMatchHook.awayTeam }
                    setter={ addMatchHook.setAwayTeam }
                    options={ ((teams) =>
                    {
                      return teams.map(team => ({
                        value: team._id,
                        label: team.name
                      }))
                    })(addMatchHook.awayTeams ?? []) }
                  />
                </Row>

                <MaterialSelect
                  label={ "Round" }
                  value={ addMatchHook.round }
                  setter={ addMatchHook.setRound }
                  options={ ((rounds) =>
                  {
                    return rounds?.map(round => ({
                      value: round._id,
                      label: round.num
                    }))
                  })(addMatchHook.rounds ?? []) }
                />

                <MaterialSelect
                  label={ "Ground" }
                  value={ addMatchHook.stadium }
                  setter={ addMatchHook.setStadium }
                  options={ ((stadiums) =>
                  {
                    return stadiums?.map(stadium => ({
                      value: stadium._id,
                      label: stadium.name,
                    }))
                  })(addMatchHook.stadiums ?? []) }
                />

                <MaterialSelect
                  label={ "Broadcaster" }
                  value={ addMatchHook.broadcaster }
                  setter={ addMatchHook.setRBroadcaster }
                  options={ ((broadcasters) =>
                  {
                    return broadcasters?.map(broadcaster => ({
                      value: broadcaster._id,
                      label: broadcaster.name,
                      image: broadcaster.logo ?? ''
                    }))
                  })(addMatchHook.broadcasters ?? []) }
                />

                <Row j_center gap={ 10 } style={ { marginBlock: 10 } }>
                  <LocalizationProvider dateAdapter={ AdapterDateFns }>
                    <DatePicker
                      label="Playing date"
                      value={ addMatchHook.playing_date }
                      onChange={ addMatchHook.onChangePlayingDate }
                      renderInput={ (params) => (
                        <TextField style={ { width: "100%" } } { ...params } />
                      ) }
                    />
                  </LocalizationProvider>

                  <LocalizationProvider dateAdapter={ AdapterDateFns }>
                    <TimePicker
                      ampm={ false }
                      label="Playing time"
                      value={ addMatchHook.playingTime }
                      onChange={ addMatchHook.onChangePlayingTime }
                      renderInput={ (params) => (
                        <TextField style={ { width: "100%" } } { ...params } />
                      ) }
                    />
                  </LocalizationProvider>
                </Row>

                <ButtonStyled
                  onClick={ addMatchHook.handleConfirmAddMatch }
                  disabled={ addMatchHook.addMatchLoading }
                  style={ { cursor: addMatchHook.addMatchLoading ? "not-allowed" : 'pointer' } }
                >
                  { addMatchHook.addMatchLoading ? "loading ..." : "Confirm add match" }
                </ButtonStyled>
              </>
            ) }
          </>
        }
      />
    </Column>
  );
};

export default AddMatch;
