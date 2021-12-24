import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute(props) {
  let location = useLocation();
  if (props.auth.isLoggedIn) {
    return props.children;
  }

  return <Navigate to="/" state={{ from: location }} />;
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(PrivateRoute);
