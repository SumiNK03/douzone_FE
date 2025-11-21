import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../config/const.js";
import TeacherForm from "./components/TeacherForm";
import StudentForm from "./components/StudentForm";

export default function SignupPage() {
    const [role, setRole] = useState(null);

    return (
        <div className="flex flex-col items-center w-screen mt-10 pt-3 font-sans">
            {!role ? (
                <div className="flex flex-col items-center mt-[100px]">
                    <h1 className="font-bold text-4xl text-gray-700 mb-10">
                        회원가입 사용자 유형
                    </h1>
                    <div className="flex gap-64 mt-[50px]">
                        <button
                            onClick={() => setRole("teacher")}
                            className="rounded-full bg-[#4DBAE7] text-white text-4xl px-14 py-14 shadow-lg hover:bg-[#32A4D3] transition w-[20vw] h-[20vw] font-bold"
                        >
                            강사
                        </button>
                        <button
                            onClick={() => setRole("student")}
                            className="rounded-full bg-[#4DBAE7] text-white text-4xl px-14 py-14 shadow-lg hover:bg-[#32A4D3] transition w-[20vw] h-[20vw] font-bold"
                        >
                            학생
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-[80vw] max-w-[700px] bg-white p-8 rounded-2xl shadow-md mt-6">
                    <div className="flex justify-between mb-6">
                        <h2 className="text-3xl font-semibold text-gray-700">
                            {role === "teacher" ? "강사 회원가입" : "학생 회원가입"}
                        </h2>
                        <button
                            onClick={() => setRole(null)}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            ← 돌아가기
                        </button>
                    </div>
                    {role === "teacher" ? (
                        <TeacherForm apiUrl={API_URL} />
                    ) : (
                        <StudentForm apiUrl={API_URL} />
                    )}
                </div>
            )}
        </div>
    );
}
