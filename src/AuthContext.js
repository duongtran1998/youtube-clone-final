import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const register = (newUser) => {
    const existing = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...existing, newUser]));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (found && found.verified) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return { success: true };
    }
    if (found && !found.verified) {
      return { success: false, reason: "not_verified" };
    }
    return { success: false, reason: "invalid" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const verifyEmail = (email) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updated = users.map((u) =>
      u.email === email ? { ...u, verified: true } : u
    );
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
