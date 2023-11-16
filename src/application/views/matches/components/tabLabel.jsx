import Label from "src/application/shared/components/Label";
import { mainColor } from "src/config/colors/colors";

function TabLabel({ label }) {
    return (
      <div
        style={{
          backgroundColor: mainColor,
          paddingInline: 10,
          borderRadius: 5,
          width: "fit-content",
          marginBottom: 10,
        }}
      >
        <Label noWrap xBold text={label} color={"white"} />
      </div>
    );
  }

  export default TabLabel