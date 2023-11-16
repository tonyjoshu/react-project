import { useAtom, useAtomValue } from "jotai";
import { BsChevronLeft } from "react-icons/bs";
import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import { tokenAtom } from "src/config/jotai/atoms";
import useAdminProfile from "./use-admin-profile";

export function AdminProfile() {
  const tokenAtomValue = useAtomValue(tokenAtom);
  const adminProfileHook = useAdminProfile();

  return (
    <Column>
      <Row
        gap={5}
        onClick={adminProfileHook.handleBack}
        style={{
          cursor: "pointer",
          width: "fit-content",
          alignSelf: "flex-start",
        }}
      >
        <BsChevronLeft />
        <Label text={"Back"} />
      </Row>

      <Column>
        <Label
          capitalize
          color={"grey"}
          xLarge
          xBold
          noWrap
          text={tokenAtomValue.name}
        />
        <Label color={"grey"} noWrap text={tokenAtomValue.email} />
        <Label color={"grey"} small noWrap text={`+${tokenAtomValue.phone}`} />
      </Column>
    </Column>
  );
}
