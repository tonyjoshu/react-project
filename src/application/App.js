import React, { Component, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../scss/style.scss";
import Login from "./pages/login/Login";
import DefaultLayout from "./shared/layout/DefaultLayout";
import Teams from "./views/teams/Teams";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

class App extends Component {
  render() {
    return (
      <>
        <Toaster position="top-center" reverseOrder={ false } />
        <Router>
          <Routes>
            <Route path="/" name="Login Page" element={ <Login /> } />
            <Route
              path="/home"
              name="home Page"
              element={ <DefaultLayout /> }
            />
            <Route path="*" name="Home" element={ <DefaultLayout /> } />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
