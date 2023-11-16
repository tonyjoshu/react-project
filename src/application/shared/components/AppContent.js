import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import routes from "src/application/routing/routes";
import { useAtomValue } from "jotai";
import { adminTokenConfig } from "../../../config/jotai/atoms";

const AppContent = () =>
{
  const { token } = useAtomValue(adminTokenConfig)
  return (
    <CContainer lg style={ { backgroundColor: "#F8F8F8" } }  >
      <Suspense fallback={ <CSpinner color="primary" /> }>
        <Routes>
          { routes.map((route, idx) =>
          {
            return (
              route.element && (
                <Route
                  key={ idx }
                  path={ route.path }
                  exact={ route.exact }
                  name={ route.name }
                  // element={ !token ? <Navigate to={ "/" } replace /> : <route.element /> }?
                  element={<route.element /> }
                />
              )
            );
          }) }
          {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */ }
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
