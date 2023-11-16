import { useAtom } from "jotai";
import Column from "src/application/shared/components/Column";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Row from "src/application/shared/components/Row";
import matchStataValuesAtom from "../../../state/match-stats-values-atom";
import shotsTabValues from "../data/shots-tab-values";

function ShotsTab({ rightSideHook, matchHookData, tabIndex }) {
  const [matchStatsValues, setmatchStatsValues] = useAtom(matchStataValuesAtom);

  return (
    <Column>
      <Row j_start style={{ width: "fit-content", marginTop: 10 }}>
        <InputFieldCustom
          type="number"
          label={"Shots"}
          value={shotsTabValues(matchHookData, tabIndex, rightSideHook).value}
          handleOnChange={shotsTabValues(matchHookData, tabIndex).onChange}
          placeholder={"shots"}
          min={0}
          large
        />
      </Row>
    </Column>
  );
}

export default ShotsTab;
