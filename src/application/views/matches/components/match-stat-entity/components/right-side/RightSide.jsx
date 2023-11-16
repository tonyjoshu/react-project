import Row from "src/application/shared/components/Row";
import Column from "src/application/shared/components/Column";

import leftMenuItems from "../left-side/data/menu-items";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import useRightSide from "./useRightSide";
import TabComponent from "src/application/views/tabs/Tabs";
import useMatchHook from "src/application/views/matches/match-hook";
import ShotsTab from "./components/ShotsTab";
import GoalTab from "./components/GoalTab";
import ShotsOnTargetTab from "./components/ShotsOnTarget";
import Possession from "./components/Possession";
import RedCardTab from "./components/RedCard";
import YellowCardTab from "./components/YellowCardTab";
import Substitutions from "./components/Substitution";
import Label from "src/application/shared/components/Label";
import HalfTimeTab from "./components/HalfTime";

function RightSide({ matchStatEntityHook, matchHookData }) {
  const rightSideHook = useRightSide(
    matchHookData.matchId,
    matchHookData.popUpHomeData,
    matchHookData.popUpAawayData
  );

  const index = matchStatEntityHook.selectedMenuItemIndex;

  return (
    <Column
      style={{
        minHeight: "100%",
        backgroundColor: "white",
        padding: 20,
        gap: 30,
      }}
    >
      {index !== 7 ? (
        <TabComponent
          value={matchHookData.popUp2SelectedTabIndex}
          handleChange={matchHookData.handlePopUp2TabChange}
          tabs={[
            matchHookData?.popUpHomeData?.team?.name,
            matchHookData?.popUpAawayData?.team?.name,
          ]}
          centered
        />
      ) : (
        ""
      )}
      {(function (menuItems, index) {
        switch (menuItems[index]) {
          case menuItems[0]:
            return (
              <GoalTab
                rightSideHook={rightSideHook}
                matchHookData={matchHookData}
                tabIndex={matchHookData.popUp2SelectedTabIndex}
                homeTeamLineup={rightSideHook.homeTeamLineup}
                awayTeamLineup={rightSideHook.awayTeamLineup}
              />
            );

          case menuItems[1]:
            return (
              <ShotsTab
                rightSideHook={rightSideHook}
                matchHookData={matchHookData}
                tabIndex={matchHookData.popUp2SelectedTabIndex}
              />
            );

          case menuItems[2]:
            return (
              <ShotsOnTargetTab
                rightSideHook={rightSideHook}
                matchHookData={matchHookData}
                tabIndex={matchHookData.popUp2SelectedTabIndex}
              />
            );

          case menuItems[3]:
            return (
              <Possession
                rightSideHook={rightSideHook}
                matchHookData={matchHookData}
                tabIndex={matchHookData.popUp2SelectedTabIndex}
              />
            );

          case menuItems[4]:
            return (
              <RedCardTab
                rightSideHook={rightSideHook}
                tabIndex={matchHookData.popUp2SelectedTabIndex}
              />
            );

          case menuItems[5]:
            return (
              <YellowCardTab
                rightSideHook={rightSideHook}
                tabIndex={matchHookData.popUp2SelectedTabIndex}
              />
            );

          case menuItems[6]:
            return (
              <Substitutions
                rightSideHook={rightSideHook}
                tabIndex={matchHookData.popUp2SelectedTabIndex}
              />
            );

          default:
            break;
        }
      })(leftMenuItems, index)}
    </Column>
  );
}

export default RightSide;
