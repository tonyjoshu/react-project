import Column from "src/application/shared/components/Column";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import passes from "../data/possession-tab-values";

function Possession({rightSideHook, matchHookData, tabIndex}) {
  let total_possession = parseInt(matchHookData.home_passes) + parseInt(matchHookData.away_passes);
  let home_possession = Math.round((parseInt(matchHookData.home_passes) / total_possession) * 100);
  let away_possession = 100 - home_possession;
  
  return (<Column>
    <Row a_center j_center gap={10}>
      <Label
        color={"grey"}
        xLarge
        xBold
        text={`${tabIndex === 0 ? home_possession : away_possession}%`}
      />
      <Label small text={"possession"}/>
    </Row>

    <Row j_start style={{width: "fit-content", marginTop: 10}}>
      <InputFieldCustom
        type="number"
        label={"Passes"}
        value={passes(matchHookData, tabIndex).value}
        handleOnChange={passes(matchHookData, tabIndex).onChange}
        placeholder={"passes"}
        min={0}
        large
      />
    </Row>
  </Column>);
}

export default Possession;
