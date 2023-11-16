import Column from "./Column";
import Label from "./Label";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

export default function MaterialDatePicker({value, setter, label}) {
  return (
    <Column style={{gap: 10}}>
      <Label a_s_left noWrap small marginLeft={10} text={label ?? 'Date'} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={value}
          onChange={(newValue) => {
            setter(newValue);
          }}
          renderInput={(params) => <TextField style={{width: '100%'}} {...params} />}
        />
      </LocalizationProvider>
    </Column>
  );
}
