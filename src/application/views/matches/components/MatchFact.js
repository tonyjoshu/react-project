import Label from "src/application/shared/components/Label";
import Column from "src/application/shared/components/Column";
import Row from "src/application/shared/components/Row";
import { BiFootball } from "react-icons/bi";

const MatchFact = () => (
  <Row a_center gap={10}>
    <Label noWrap bold text={30} />
    <BiFootball style={{ fontSize: "x-large" }} />
    <Column gap={5} style={{ width: "fit-content", alignItems: "flex-start" }}>
      <Label noWrap bold text={`${"Claotus Chama"} ${2} - ${0}`} />
      <Label noWrap small text={`Assist by ${"Meddie Kagere"}`} />
    </Column>
  </Row>
);

export default MatchFact;
