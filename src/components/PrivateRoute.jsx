import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  children,
  loggedOffComponent = <Navigate to="/login" />,
}) => {
  const token = localStorage.getItem("token");
  return token ? children : loggedOffComponent;
};

export default PrivateRoute;
