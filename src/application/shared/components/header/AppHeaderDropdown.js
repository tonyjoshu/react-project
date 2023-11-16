import React from "react";
import
{
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import
{
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar8 from "./../../../../assets/images/avatars/8.jpg";
import { useAtom, useSetAtom } from "jotai";
import { tokenAtom, tokenDef } from "src/config/jotai/atoms";
import { mainColor } from "src/config/colors/colors";
import Label from "../Label";
import { BsPersonFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { AiFillSetting, AiOutlineLogin } from "react-icons/ai";
import Row from "../Row";
import Column from "../Column";
import useStateSetter from "src/helper_functions/useStateSetter";
import { useNavigate } from "react-router-dom"
import { routeStrings } from "src/application/routing/routes"

const AppHeaderDropdown = () =>
{
  const useHeaderHook = useAppHeaderDropDown()
  console.log(useHeaderHook)
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={ false }>
        <Row gap={ 10 }>
          <Column a_end style={ { gap: 0 } }>
            <Label
              small
              noWrap
              xBold
              color={ "#19263E" }
              text={ useHeaderHook.tokenAtomValue.email }
            />
            <Label
              small
              noWrap
              // xBold
              color={ "blue" }
              // text={ useHeaderHook.tokenAtomValue.email }
              text={ "admin" }
            />
          </Column>

          <div
            style={ {
              backgroundColor: '#19263E',
              height: 50,
              aspectRatio: 1,
              borderRadius: '50%'
            } }></div>
        </Row>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 pr-10" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>

        { useHeaderHook.headerItems.map((item, index) =>
        {
          if (item.divider) return <CDropdownDivider key={ index } />;

          return (
            <CDropdownItem
              onClick={ item.type && item.onClick }
              href={ item.href }
              key={ index }
              style={ {
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingBlock: 10,
                fontWeight: 800,
              } }
            >
              { item.icon }
              { item.label }
            </CDropdownItem>
          );
        }) }
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;

const useAppHeaderDropDown = () =>
{
  let navigate = useNavigate();
  const [tokenAtomValue, tokenAtomSetter] = useAtom(tokenAtom);

  const handleLogout = () =>
  {
    tokenAtomSetter((prev) => useStateSetter(prev, tokenDef));
  };

  const headerItems = [
    {
      label: "Profile",
      icon: <ImProfile />,
      type: "button",
      onClick: () => navigate(routeStrings.adminProfile),
    },
    {
      label: "Settings",
      icon: <AiFillSetting />,
      type: "button",
      onClick: () => navigate(routeStrings.settings),
    },
    { divider: true },
    {
      label: "Log out",
      icon: <AiOutlineLogin />,
      type: "button",
      onClick: handleLogout,
    },
  ];

  return { headerItems, handleLogout, tokenAtomValue };
};
