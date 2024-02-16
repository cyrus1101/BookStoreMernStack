import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    const response = await axios.post("http://localhost:5555/login", {
      email,
      password,
    });
    const { user, token } = response.data;
    setToken(token);
    setUser(user);
  };
  const registerAccount = async (email, password, name) => {
    const response = await axios.post("http://localhost:5555/register", {
      email,
      password,
      name,
    });
    const { user, token } = response.data;
    setToken(token);
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ token, login, registerAccount, user }}>
      {children}
    </UserContext.Provider>
  );
};
