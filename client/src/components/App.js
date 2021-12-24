import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { Component } from "react";
import { authenticateUser } from "../actions/auth";
import Dashboard from "./Dashboard";
import PrivateRoute from "../helpers/PrivateRoute";
import Home from "./Home";
import Dashboard2 from "./Dashboard2";
import Navbar from "./Navbar";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    // this.props.dispatch(fetchPosts());
    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(authenticateUser(user));
      // this.props.dispatch(authenticateUser(user));
      // this.props.dispatch(fetchUserFriends());
    }
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route path="*" element={<Home />}></Route>

            <Route
              path="/dashboard1"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard2"
              element={
                <PrivateRoute>
                  <Dashboard2 />
                </PrivateRoute>
              }
            />
          </Routes>
          {/* <div className="App">
          <Home />
        </div> */}
        </Router>
      </>
    );
  }
}

export default connect()(App);
