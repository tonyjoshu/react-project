import { mainColor } from "src/config/colors/colors";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import TeamGoal from "./TeamGoal";

const HalfTime = ({ time }) => (
  <Row j_center gap={10}>
    <Label small noWrap bold text={"Half time"} />
    <Label small noWrap bold text={`${time}"`} />
  </Row>
);

export default HalfTime;
