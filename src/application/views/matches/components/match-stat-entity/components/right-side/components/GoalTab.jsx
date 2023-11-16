import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import goalScorerTabValues from "../data/goal-scorer-tab-values";
import InputFieldCustom from "../../../../../../../shared/components/input-field-cutom";

function GoalTab({
                   rightSideHook, matchHookData, tabIndex, homeTeamLineup, awayTeamLineup,
                 }) {
  return (<Column style={{marginTop: 10}}>
    {goalScorerTabValues(rightSideHook, tabIndex)?.map((data, index) => {
      if (index === 2) {
        return <InputFieldCustom
          key={index}
          label={data.label}
          value={data.value}
          handleOnChange={data.onChange}
          type={"number"}
          min={0}
        />
      }
      return (<Column key={index} style={{gap: 0}}>
        <Label small a_s_left marginLeft={10} text={data.label}/>
        <FormControl
          sx={{minWidth: 120}}
          style={{marginBlock: 10, width: "100%"}}
        >
          <Select
            value={data.value}
            onChange={data.onChange}
            displayEmpty
            inputProps={{"aria-label": "Without label"}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data.options?.map((option, indexx) => (<MenuItem key={indexx} value={option._id}>
              {option.name}
            </MenuItem>))}
          </Select>
        </FormControl>
      </Column>)
    })}
  </Column>);
}

export default GoalTab;
