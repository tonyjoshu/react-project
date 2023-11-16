import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";

function ManagerCurrentTeamInfo({ managerProfileHook }) {
    return (
      <Column a_end j_center style={{ width: "fit-content", gap: 0 }}>
        <Label
          xLarge
          noWrap
          capitalize
          text={managerProfileHook.manager?.name}
        />
        <Row
          a_center
          gap={5}
          style={{
            padding: 5,
            borderRadius: 10,
            backgroundColor:
              managerProfileHook.manager?.current_club?.team_color,
          }}
        >
          <img
            src={managerProfileHook.manager?.current_club?.logo}
            alt={``}
            style={{
              width: 40,
              aspectRatio: 1,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              backgroundColor: `#21212155`,
              paddingInline: 5,
              borderRadius: 10,
            }}
          >
            <Label
              large
              noWrap
              xBold
              color={"white"}
              text={managerProfileHook.manager?.current_club?.name}
            />
          </div>
        </Row>
      </Column>
    );
  }

  export default ManagerCurrentTeamInfo
