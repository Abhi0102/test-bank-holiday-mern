import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";
import PrivateRoute from "../helpers/PrivateRoute";

function Home(props) {
  const { authProgress, isLoggedIn } = props.auth;
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/dashboard1";
  // location.state?.from?.pathname ||

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);
  return authProgress || isLoggedIn ? (
    <div className="spinner-border text-primary spin-pos" role="status">
      {" "}
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/dashboard1"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard2"
          element={
            <PrivateRoute>
              <Dashboard2 />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Home);
