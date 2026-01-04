import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PrivateRoute = () => {
  const { user } = useAuth();
  return user?.loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;