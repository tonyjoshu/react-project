import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";

import styled from "styled-components";
import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import substitutionTabValues from "../data/substitution-tab-values";
import InputFieldCustom from "../../../../../../../shared/components/input-field-cutom";

function Substitutions({ rightSideHook, tabIndex }) {
  const substitutionsHook = useSubstitutions();

  let formation = tabIndex === 0 ? "4312" : "433";

  return <Column style={{ marginTop: 10 }}>
    {substitutionTabValues(rightSideHook, tabIndex)?.map((data, index) => {
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

      return <Column key={index} style={{gap: 0}}>
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
              {data.options?.map((option, indexx) => (
                <MenuItem key={indexx} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Column>
    })}
  </Column>;
}

export default Substitutions;

const PlayerCircle = ({ kitNo, pushFoward, substitutionsHook }) => {
  return (
    <Circle
      pushFoward={pushFoward}
      onClick={() => substitutionsHook.handleOpenPopUp(kitNo)}
    >
      {kitNo}
    </Circle>
  );
};

function Formation433({ substitutionsHook }) {
  return (
    <>
      <Row style={{ justifyContent: "space-around" }}>
        <PlayerCircle kitNo={1} substitutionsHook={substitutionsHook} />
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[2, 3, 4, 5].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index !== 1 && index !== 2}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[8, 6, 16].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index !== 1}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[7, 9, 10].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index === 1}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>
    </>
  );
}

function Formation4321({ substitutionsHook }) {
  return (
    <>
      <Row style={{ justifyContent: "space-around" }}>
        <PlayerCircle kitNo={1} substitutionsHook={substitutionsHook} />
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[2, 3, 4, 5].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index !== 1 && index !== 2}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[8, 6, 16].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index !== 1}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[7, 10].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index === 1}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[9].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index === 1}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>
    </>
  );
}

function Formation4312({ substitutionsHook }) {
  return (
    <>
      <Row style={{ justifyContent: "space-around" }}>
        <PlayerCircle kitNo={1} substitutionsHook={substitutionsHook} />
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[2, 3, 4, 5].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index !== 1 && index !== 2}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[8, 6, 16].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index !== 1}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[10].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index === 1}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>

      <Row style={{ justifyContent: "space-around" }}>
        {[7, 9].map((kitNo, index) => (
          <PlayerCircle
            key={index}
            kitNo={kitNo}
            // pushFoward={index === 1}
            substitutionsHook={substitutionsHook}
          />
        ))}
      </Row>
    </>
  );
}

const Circle = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  height: 80px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #13ba6a;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;

  margin-top: ${(props) => (props.pushFoward ? "50px" : "")};

  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border: 2px solid white;
  }
`;

const useSubstitutions = () => {
  const [kitNo, setKitNo] = useState();
  const [openPopUp, setOpenPopUp] = useState(false);
  const handleOpenPopUp = (kitNo) => {
    setOpenPopUp(true);
    setKitNo(kitNo);
  };
  const handleClosePopUp = () => {
    setOpenPopUp(false);
    setKitNo();
  };

  return { kitNo, openPopUp, handleOpenPopUp, handleClosePopUp };
};
