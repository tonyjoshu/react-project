import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import usePlayersHook from "./players-hook";

import ModalPopUp from "src/application/shared/components/ModalPopUp";
import AddPlayerForm from "./components/add-player-form/AddPlayerForm";


import { useState } from "react";
import PlayerDataTable from "./components/PlayerDataTable";
import PlayersSearchField from "./components/PlayersSearchField";

const columns = ["No", "Name", "Team", "Age", "Nationality"];

function Players() {
  const playersHookData = usePlayersHook();
  //console.log('playersHookData',  playersHookData.filteredPlayers)

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const count =
    Math.round(parseInt(playersHookData.players?.length) / itemsPerPage) ?? 0;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (playersHookData.loading) {
    return <Label text={ "loading ..." } />;
  } else {
    return (
      <div className="w-full relative">
        <Row a_center j_between style={ { marginBottom: 40 } }>
          <Label xLarge xBold text={ "Players" } color={ "grey" } />
          <ButtonStyled
            style={ { width: "fit-content", whiteSpace: "nowrap" } }
            onClick={ playersHookData.handleModalOpen }
          >
            Add new player
          </ButtonStyled>
        </Row>

        <br />
        <PlayersSearchField
          searchQuerry={ playersHookData.searchQuerry }
          handleClearSearchField={ playersHookData.handleClearSearchField }
          handleSearchFieldChange={ playersHookData.handleSearchFieldChange }
        />
        <br />
        { playersHookData.filteredPlayers === undefined ||  playersHookData.filteredPlayers.length <= 0 ? <p>Loading</p> : 
        <PlayerDataTable
          playersData={ playersHookData.filteredPlayers }
          goToPlayerProfile={ playersHookData.goToPlayerProfile }
       />}

        <ModalPopUp
          open={ playersHookData.modalOpen }
          handleClose={ playersHookData.handleModalClose }
          children={
            playersHookData.modalLoading ? (
              <Label text={ "loading ..." } />
            ) : (
              <AddPlayerForm playersHookData={ playersHookData } />
            )
          }
        />
      </div>
    );
  }
}

export default Players;
