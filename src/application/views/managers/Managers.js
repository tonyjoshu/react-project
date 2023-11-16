import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Label from "src/application/shared/components/Label";
import ModalPopUp from "src/application/shared/components/ModalPopUp";
import Row from "src/application/shared/components/Row";
import AddManagerForm from "./components/add-manager-form";
import ManagerDataTable from "./components/ManagerDataTable";
import ManagersSearchInput from "./components/ManagersSearchInput";
import useManagersHook from "./manager-hook";

function Managers() {
  const managersHookData = useManagersHook();
  //console.log( managersHookData.filteredManagers)

  if (managersHookData.loading) {
    return <Label text={ "loading ..." } />;
  } else {
    return (
      <>
        <Row a_center j_between style={ { marginBottom: 40 } }>
          <Label xLarge xBold text={ "Team Managers" } color={ "grey" } />
          <ButtonStyled
            style={ { width: "fit-content", whiteSpace: "nowrap" } }
            onClick={ managersHookData.handleModalOpen }
          >
            Add new manager
          </ButtonStyled>
        </Row>

        <br />
        <ManagersSearchInput
          searchQuerry={ managersHookData.searchQuerry }
          handleSearchFieldChange={ managersHookData.handleSearchFieldChange }
          handleClearSearchField={ managersHookData.handleClearSearchField }
        />
        <br />
        { managersHookData.filteredManagers === undefined ||  managersHookData.filteredManagers.length <= 0 ? null :
         <ManagerDataTable
          data={ managersHookData.filteredManagers }
          goToManagersProfile={ managersHookData.goToManagerProfile }
        /> }
        <br />

        <ModalPopUp
          open={ managersHookData.modalOpen }
          handleClose={ managersHookData.handleModalClose }
          children={
            managersHookData.modalLoading ? (
              <Label text={ "loading ..." } />
            ) : (
              <AddManagerForm managersHookData={ managersHookData } />
            )
          }
        />
      </>
    );
  }
}

export default Managers;
