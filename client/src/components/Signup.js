import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { signup, refreshError } from "../actions/auth";

function Signup(props) {
  // State for userName and Passowrd
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    return () => {
      props.dispatch(refreshError());
    };
  }, []);

  //   Handling Submit of Login Form
  function handleSubmit(e) {
    e.preventDefault();

    props.dispatch(signup(name, email, password, confirmPassword));
  }

  return (
    <div className="container margin-5-pct">
      <div className="row">
        <div className="col-md-4 offset-4">
          <div className="card border-info">
            <div className="card-header bg-info text-white">
              <h5>Signup</h5>
            </div>
            <div className="card-body">
              <form className="container">
                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail"
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

                <div className="mb-3">
                  <label htmlFor="inputConfirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputConfirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {props.auth.error && (
                  <div className="text-danger">{props.auth.error}</div>
                )}

                {props.auth.successMessage && (
                  <div className="text-success">
                    {props.auth.successMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-info text-white"
                  onClick={(e) => handleSubmit(e)}
                >
                  Signup
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

export default connect(mapStateToProps)(Signup);
