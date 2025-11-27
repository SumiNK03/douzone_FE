import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/const.js";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [role, setRole] = useState("");
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role || !id || !pwd) {
            alert("모든 항목을 입력해주세요!");
            return;
        }

        try {
            let response;
            if (role === "student") {
                response = await axios.post(`${API_URL}/login/studentLogin`, {
                    studentId: id,
                    password: pwd
                });
            } else if (role === "teacher") {
                response = await axios.post(`${API_URL}/login/teacherLogin`, {
                    teacherId: id,
                    password: pwd
                });
            }

            console.log("백엔드 응답 전체:", response.data); // 전체 응답 확인
            
            // 백엔드에서 토큰 추출 (응답 구조에 맞게)
            const token = response.data.token || response.data; // token이 없으면 응답 자체가 토큰일 수도
            
            if (!token) {
                console.error("토큰 없음. 응답:", response.data);
                alert("로그인 응답에 토큰이 없습니다!");
                return;
            }

            console.log("추출된 토큰:", token);

            // Context에 반영 + 토큰 디코딩 & localStorage 저장
            login(token);

            navigate("/"); // 홈으로 이동
            alert(`${role === "student" ? "학생" : "강사"} 로그인 성공!`);
        } catch (error) {
            console.error(error);
            alert(`${role === "student" ? "학생" : "강사"} 로그인 실패!`);
        }
    };

    return (
        <div className="flex flex-col items-center w-screen font-sans">
            <div className="w-full bg-gray-200 pt-10 pb-10 px-4 mb-10">
                <h1 className="font-bold text-4xl">로그인</h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="
                    border border-gray-300 rounded-2xl shadow-md
                    w-[80vw] max-w-[700px] p-8 bg-white
                    flex flex-col gap-5 mt-6
                "
            >
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">강사/학생 선택</option>
                    <option value="student">학생</option>
                    <option value="teacher">강사</option>
                </select>

                <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    className="bg-[#4DBAE7] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#32A4D3] transition"
                >
                    로그인
                </button>

                <p className="text-center mt-3 text-gray-600">
                    계정이 없으신가요?{" "}
                    <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
                        회원가입
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
