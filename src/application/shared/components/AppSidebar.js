import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav
} from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";


import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import nbcLogo from "../../../assets/brand/logo-grouped.png";

// sidebar nav config
import navigation from "../../routing/_nav";
import Label from "./Label";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={ unfoldable }
      visible={ sidebarShow }
      onVisibleChange={ (visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      } }
      style={ { backgroundColor: '#1F2D46' } }
    >
      <CSidebarBrand
        className="d-none d-md-flex"
        to="/"
        style={ {
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingBlock: 20,
        } }
      >
        <img
          src={ nbcLogo }
          alt="nbc premier league logo"
          style={ {
            width: 50,
          } }
        />
        <div
          style={ {
            display: "flex",
            flexDirection: "column",
            gap: 0,
            whiteSpace: "nowrap",
            opacity: 0
          } }
        >
          <Label capitalize xBold text={ "nbc premier league" } />
          <Label capitalize small text={ "dashboard" } />
        </div>
      </CSidebarBrand>
      <CSidebarNav className="scrollbar-hide" style={ { backgroundColor: '#141E36', paddingBlock: 20 } }>
        <SimpleBar>
          <AppSidebarNav items={ navigation } />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
