import Column from "src/application/shared/components/Column";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import goalScorerTabValues from "../data/goal-scorer-tab-values";
import redCardTabValues from "../data/red-card-tab-values";

function RedCardTab({ rightSideHook, tabIndex }) {
  const {label, value, options, onChange, minuteValues} = redCardTabValues(rightSideHook, tabIndex)
  return (
    <Column style={{ gap: 0 }}>
      <Label
        small
        a_s_left
        marginLeft={10}
        text={label}
      />
      <FormControl
        sx={{ minWidth: 120 }}
        style={{ marginBlock: 10, width: "100%" }}
      >
        <Select
            value={value}
            onChange={onChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            options?.map((player, index) => (
              <MenuItem key={index} value={player._id}>{player.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <InputFieldCustom
        label={minuteValues.label}
        value={minuteValues.value}
        handleOnChange={minuteValues.onChange}
        type={"number"}
        min={0}
      />
    </Column>
  );
}

export default RedCardTab;
