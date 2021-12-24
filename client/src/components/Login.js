import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { login, refreshError } from "../actions/auth";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      props.dispatch(refreshError());
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.dispatch(login(email, password));
  }
  return (
    <div className="container margin-5-pct">
      <div className="row">
        <div className="col-md-4 offset-4">
          <div className="card ">
            <div className="card-header bg-info text-white">Login</div>
            <div className="card-body">
              <form className="container">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {props.auth.error && (
                  <div className="text-danger">{props.auth.error}</div>
                )}
                <button
                  type="submit"
                  className="btn btn-info text-white"
                  onClick={(e) => handleSubmit(e)}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
