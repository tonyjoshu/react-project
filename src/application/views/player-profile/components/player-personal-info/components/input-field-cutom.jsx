import Label from "src/application/shared/components/Label";
import styled from "styled-components";

function InputFieldCustom({
  label,
  value,
  placeholder,
  setter,
  disabled,
  capitalize = false,
  type = "text",
}) {
  const onChange = (event) => setter(event.target.value);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 5,
      }}
    >
      <Label marginLeft={15} small text={label} />
      <StyledInput
        type={type}
        value={
          capitalize ? value.replace(/\b\w/g, (l) => l.toUpperCase()) : value
        }
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{ textTransform: capitalize ? "capitalize" : "" }}
      />
    </div>
  );
}

export default InputFieldCustom;

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid #85f4ff;
  outline: none;
  border-radius: 10px;
  padding-block: 10px;
  padding-inline: 15px;
  font-weight: bold;
`;
