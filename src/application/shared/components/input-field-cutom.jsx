import styled from "styled-components";
import Label from "./Label";

function InputFieldCustom({
  label,
  type = "text",
  value,
  placeholder,
  setter,
  disabled,
  handleOnChange,
  pattern,
  min,
  large,
  letterSpacing,
  required,
  ref,
  capitalize = false,
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
        ref={ref ?? null}
        type={type}
        value={
          capitalize ? value.replace(/\b\w/g, (l) => l.toUpperCase()) : value
        }
        onChange={handleOnChange ?? onChange}
        placeholder={placeholder}
        disabled={disabled}
        pattern={pattern ?? ""}
        min={min ?? ""}
        required={required}
        style={{
          paddingBlock: large ? 30 : "",
          fontSize: large ? "xx-large" : "",
          letterSpacing: letterSpacing ?? "",
        }}
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
