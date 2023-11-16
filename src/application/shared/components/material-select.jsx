import Column from "./Column";
import Label from "./Label";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "./Row";

export default function MaterialSelect({
  value,
  setter,
  options,
  label,
  roundedImages,
}) {
  const handleChange = (event) => setter(event.target.value);

  return (
    <Column style={{ gap: 10 }}>
      <Label a_s_left noWrap small marginLeft={10} text={label ?? ""} />
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {typeof value === typeof "String" && (
            <MenuItem value={""}>None</MenuItem>
          )}
          {options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.value}>
                {option.image ? (
                  <Row j_start a_center gap={10}>
                    <img
                      src={option.image}
                      alt=""
                      style={{
                        width: roundedImages ? 50 : 100,
                        aspectRatio: roundedImages ? 1 : "",
                        borderRadius: roundedImages ? "50%" : "",
                        objectFit: "cover",
                      }}
                    />

                    <Label text={option.label} />
                  </Row>
                ) : (
                  option.label
                )}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Column>
  );
}
