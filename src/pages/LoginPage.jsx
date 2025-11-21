import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/const.js";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
    const matches = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return matches ? decodeURIComponent(matches[1]) : null;
}

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
            if (role === "student") {
                await axios.post(
                    `${API_URL}/login/studentLogin`,
                    { studentId: id, password: pwd },
                    { withCredentials: true }
                );
                alert("학생 로그인 성공!");
            } else if (role === "teacher") {
                await axios.post(
                    `${API_URL}/login/teacherLogin`,
                    { teacherId: id, password: pwd },
                    { withCredentials: true }
                );
                alert("강사 로그인 성공!");
            }

            // 서버가 쿠키만 설정하는 경우가 있으므로, 쿠키가 세팅된 후에 읽어서 Context에 반영
            const name = getCookie("name");
            const roleCookie = getCookie("role") || role;
            login(name, roleCookie);
            navigate("/");
        } catch (error) {
            alert((role === "student") ? "학생 로그인 실패!" : "강사 로그인 실패!");
            console.error(error);
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
          border
          border-gray-300
          rounded-2xl
          shadow-md
          w-[80vw]
          max-w-[700px]
          p-8
          bg-white
          flex
          flex-col
          gap-5
          mt-6
        "
            >
                {/* 구분 선택 */}
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="
            border
            rounded-md
            px-3
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
                >
                    <option value="">강사/학생 선택</option>
                    <option value="student">학생</option>
                    <option value="teacher">강사</option>
                </select>

                {/* 아이디 입력 */}
                <input
                    type="text"
                    name="id"
                    placeholder="아이디를 입력하세요"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="
            border
            rounded-md
            px-3
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
                />

                {/* 비밀번호 입력 */}
                <input
                    type="password"
                    name="pwd"
                    placeholder="비밀번호를 입력하세요"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="
            border
            rounded-md
            px-3
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
                />

                {/* 로그인 버튼 */}
                <button
                    type="submit"
                    className="
            bg-[#4DBAE7]
            text-white
            font-bold
            px-6
            py-2
            rounded-lg
            hover:bg-[#32A4D3]
            transition
          "
                >
                    로그인
                </button>

                {/* 회원가입 안내 */}
                <p className="text-center mt-3 text-gray-600">
                    계정이 없으신가요?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        회원가입
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
