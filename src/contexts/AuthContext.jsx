import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // otpStore removed – backend handles OTPs

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // contacts backend to send SMS and returns the generated code for debugging (in prod you wouldn't expose it)
  const sendOtp = async (phone) => {
    const resp = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    });
    const data = await resp.json();
    return data.code; // backend returns code for demo
  };

  const verifyOtp = async (phone, code) => {
    const resp = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, code })
    });
    const data = await resp.json();
    return data.valid;
  };

  const register = ({ name, city, phone }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find((u) => u.phone === phone);
    if (existing) return false;
    const newUser = { name, city, phone };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const login = (phone) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.phone === phone);
    if (found) {
      setUser(found);
      localStorage.setItem("currentUser", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, sendOtp, verifyOtp, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
