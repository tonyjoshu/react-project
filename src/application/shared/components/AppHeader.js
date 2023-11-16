import {
  CHeader, CHeaderNav, CHeaderToggler
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

import { CgMenuMotion } from 'react-icons/cg';
import { AppHeaderDropdown } from "./header/index";
import Row from "./Row";

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CHeader position="sticky" className="mb-4">
      <Row a_center j_between style={ { paddingInline: 30 } }>
        <CHeaderToggler
          className="ps-1"
          onClick={ () => dispatch({ type: 'set', sidebarShow: !sidebarShow }) }
        >
          <CgMenuMotion />
        </CHeaderToggler>

        <CHeaderNav>
          <AppHeaderDropdown />
        </CHeaderNav>
      </Row>
    </CHeader>
  );
};

export default AppHeader;
