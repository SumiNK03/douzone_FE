import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({ id: "", name: "", role: "", token: "" });

    const login = (token) => {
        try {
            // 토큰 디코딩해서 클레임 추출
            const decoded = jwtDecode(token);
            const { id, name, role } = decoded;
            
            // localStorage에 토큰만 저장 (클레임은 필요할 때 디코딩)
            localStorage.setItem("token", token);
            
            // state 업데이트
            setUser({ id, name, role, token });
        } catch (error) {
            console.error("토큰 디코딩 실패:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser({ id: "", name: "", role: "", token: "" });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.id || "",
                    name: decoded.name || "",
                    role: decoded.role || "",
                    token: token
                });
            } catch (error) {
                console.error("저장된 토큰 디코딩 실패:", error);
                localStorage.removeItem("token");
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook으로 쉽게 사용
export function useAuth() {
    return useContext(AuthContext);
}
