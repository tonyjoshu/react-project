import { useSetAtom } from "jotai";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import matchStataValuesAtom from "../../../state/match-stats-values-atom";

export default function HalfTimeTab({ rightSideHook }) {
  const matchStatsValuesSetter = useSetAtom(matchStataValuesAtom);
  return (
    <InputFieldCustom
      label={"Half time minute"}
      type={"number"}
      min={45}
      placeholder={"from 45 onwards"}
      value={rightSideHook.halfTimeMinute}
      handleOnChange={halfTimeChangeHandler()}
    />
  );

  function halfTimeChangeHandler() {
    return (event) => {
      rightSideHook.setHalfTimeMinute(event.target.value);
      matchStatsValuesSetter((prev) => {
        return {
          ...prev,
          halfTimeMinute: event.target.value,
        };
      });
    };
  }
}
