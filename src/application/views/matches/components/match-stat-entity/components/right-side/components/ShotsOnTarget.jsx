import Column from "src/application/shared/components/Column";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import shotsOnTarget from "../data/shots-on-target-ta-values";

function ShotsOnTargetTab({ rightSideHook, matchHookData, tabIndex }) {
  return (
    <Column>
      <Row j_start style={{ width: "fit-content", marginTop: 10 }}>
        <InputFieldCustom
          type="number"
          label={"Shots on target"}
          value={shotsOnTarget(matchHookData, tabIndex).value}
          handleOnChange={shotsOnTarget(matchHookData, tabIndex).onChange}
          placeholder={"shots on target"}
          min={0}
          large
        />
      </Row>
    </Column>
  );
}

export default ShotsOnTargetTab;
