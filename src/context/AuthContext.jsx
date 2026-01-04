import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("meme_user", null);
  const navigate = useNavigate();
  const login = (username) => { setUser({ username, loggedIn: true }); navigate("/dashboard"); };
  const logout = () => { setUser(null); navigate("/login"); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);