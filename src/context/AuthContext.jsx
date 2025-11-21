// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// 쿠키 읽기 유틸
function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ username: null, role: null });
  const navigate = useNavigate();

  // 초기화: 쿠키 읽기
  useEffect(() => {
    const role = getCookie("role");
    const name = getCookie("name");
    const teacherId = getCookie("teacherId");
    const studentId = getCookie("studentId");

    if (teacherId || studentId) {
      setUser({
        username: name
        , role: role || "student"
        , studentId: studentId ? Number(studentId) : null
        , teacherId: teacherId ? Number(teacherId) : null
      });
    }
  }, []);

  const login = (username, role) => setUser({ username, role });
  const logout = () => {
    setUser({ username: null, role: null });
    // 쿠키 삭제
    document.cookie = "teacherId=; max-age=0";
    document.cookie = "studentId=; max-age=0";
    document.cookie = "role=; max-age=0";
    document.cookie = "name=; max-age=0";
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
