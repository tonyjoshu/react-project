import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import leftMenuItems from "./data/menu-items";
import useLeftSide from "./use-left-side";

function LeftSide({ matchStatEntityHook, matchHookData, handleClose }) {
  const leftSideHook = useLeftSide(
    matchHookData.matchId,
    matchHookData.popUpHomeData,
    matchHookData.popUpAawayData,
    matchHookData,
    handleClose
  );

  return (
    <Column
      a_start
      style={{
        width: "30%",
        height: "100%",
        borderRadius: 10,
      }}
    >
      {leftMenuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => matchStatEntityHook.setSelectedMenuItemIndex(index)}
          style={{
            backgroundColor: "white",
            width: "100%",
            padding: "15px 10px",
            border: `${
              matchStatEntityHook.selectedMenuItemIndex === index ? "4" : "0.5"
            }px solid #85F4FF`,
            borderRadius: 10,
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          <Label a_s_left text={item} />
        </div>
      ))}

      <Column gap={10} style={{ marginTop: 10 }}>
        {[
          {
            label: leftSideHook.loading ? "loading ..." : "Confirm stats edit",
            color: "",
            onClick: leftSideHook.handleConfirmStatsEdit,
          },
        ].map((buttonItem, index) => (
          <ButtonStyled
            key={index}
            onClick={buttonItem.onClick}
            disabled={leftSideHook.loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: buttonItem.color,
              width: "100%",
            }}
          >
            <Label noWrap text={buttonItem.label} />
          </ButtonStyled>
        ))}
      </Column>
    </Column>
  );
}

export default LeftSide;
