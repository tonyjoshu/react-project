import ButtonStyled from "src/application/shared/components/ButtonStyled"
import Column from "src/application/shared/components/Column"
import Label from "src/application/shared/components/Label"
import ModalPopUp from "src/application/shared/components/ModalPopUp"
import Row from "src/application/shared/components/Row"
import TeamListing from "./components/all-teams-listing/TeamListing"
import TeamPopUpForm from "./components/team-pop-up-form/TeamPopUpForm"
import TeamSearchField from "./components/TeamSearchField"
import useTeamsHook from "./use-teams-hook"


function Teams() {
  const teamsHookValues = useTeamsHook();
  const { filteredTeamData } = teamsHookValues

   const handleClick = (event) => {
     teamsHookValues.hiddenFileInput.current.click();
   };

   const sortedTeams = teamsHookValues.filteredTeamData?.sort((a, b) =>
     a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
   );

   if (teamsHookValues.loading) return <p>loading ...</p>;

   if (!teamsHookValues.loading) {
     return (
       <Column className="relative">
         <Row j_between style={ { marginBottom: 30 } }>
           <Label xBold capitalize noWrap xLarge color={ "grey" } text={ "teams" } />
           <ButtonStyled
             onClick={ teamsHookValues.handlePopUpOpen }
             style={ {
               width: "fit-content",
               paddingInline: 20,
               whiteSpace: "nowrap",
             } }
           >
             <Label text={ "Add new team" } />
           </ButtonStyled>
         </Row>

         <TeamSearchField
           searchQuerry={ teamsHookValues.searchQuerry }
           handleSearchFieldChange={ teamsHookValues.handleSearchFieldChange }
           handleClearSearchField={ teamsHookValues.handleClearSearchField }
         />

       { filteredTeamData.length > 0 ?  <TeamListing
           sortedTeams={ sortedTeams }
           handleEditPopUpOpen={ teamsHookValues.handleEditPopUpOpen }
           setRerun={ teamsHookValues.setRerun }
           setLoading={ teamsHookValues.setLoading }
         />: <p>{filteredTeamData.length}</p> }

         {/* for adding a new team */ }
         <ModalPopUp
           open={ teamsHookValues.popUpOpen }
         handleClose={ teamsHookValues.handlePopUpClose }
        children={
            <TeamPopUpForm
           teamsHookValues={ teamsHookValues }
               title={ "Adding a new team" }
               add={ true }
             />
           }
         />

         {/* for editing a team */ }
         <ModalPopUp
           open={ teamsHookValues.editPopUpOpen }
           handleClose={ teamsHookValues.handleEditPopUpClose }
           children={
             <TeamPopUpForm
               teamsHookValues={ teamsHookValues }
               title={ "Editing a team" }
             />
           }
         />
       </Column>
     );
   }
}

export default Teams;
