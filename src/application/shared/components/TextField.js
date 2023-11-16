import TextField from "@mui/material/TextField";

function TextFieldCustom({ value, onchange, label, type }) {
  return (
    <TextField
      id="standard-basic"
      label={label ?? ""}
      //   variant="standard"
      variant="filled"
      value={value}
      onChange={onchange}
      type={type ?? "text"}
      style={{ width: "100%" }}
    />
  );
}

export default TextFieldCustom;
