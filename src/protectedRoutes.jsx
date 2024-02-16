import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { Outlet } from "react-router-dom";
import Login from "./pages/Login";
const useAuth = (user, token) => {
  let loggedIn = token ? true : false;
  const newUser = { ...user, loggedIn };
  return newUser && newUser.loggedIn;
};
const ProtectedRoutes = () => {
  const { user, token } = useContext(UserContext);
  const isAuth = useAuth(user, token);
  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
