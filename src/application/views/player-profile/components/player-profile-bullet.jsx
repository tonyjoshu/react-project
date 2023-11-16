import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";

const PlayerProfileBullet = ({ label, value }) => (
  <Row a_center gap={5} style={{ width: "fit-content", marginInline: 10 }}>
    <Label capitalize noWrap text={label} />
    <Label xBold noWrap text={value} />
  </Row>
);

export default PlayerProfileBullet;
