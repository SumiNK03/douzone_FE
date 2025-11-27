import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/const.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();

    const isLoggedIn = !!user?.token;
    const role = user?.role || "student";

    useEffect(() => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다!");
            navigate("/login");
            return;
        }

        const fetchUserInfo = async () => {
            const api = axios.create({
                baseURL: API_URL,
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            try {
                setLoading(true);
                let response;

                if (role === "student") {
                    response = await api.get("/student/info", {
                        params: { studentId: user.id }
                    });
                    console.log("학생 정보 조회 - studentId:", user.id, "응답:", response.data);
                } else if (role === "teacher") {
                    response = await api.get("/teacher/info", {
                        params: { teacherId: user.id }  // 자동 증가 id (Long)
                    });
                    console.log("강사 정보 조회 - teacherId:", user.id, "응답:", response.data);
                }

                setUserInfo(response.data);
                setEditForm(response.data);
            } catch (error) {
                console.error("회원 정보 불러오기 실패:", error);
                console.error("에러 상태:", error.response?.status);
                console.error("에러 데이터:", error.response?.data);
                alert("회원 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [isLoggedIn, navigate, role, user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleSave = async () => {
        const api = axios.create({
            baseURL: API_URL,
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        try {
            if (role === "student") {
                await api.post("/student/edit", {
                    "studentId": user.id,
                    "studentName": editForm.studentName,
                    "phone": editForm.phone
                });
            } else if (role === "teacher") {
                await api.post("/teacher/edit", {
                    "teacherId": user.id,
                    "teacherName": editForm.teacherName,
                    "phone": editForm.phone
                });
            }
            setUserInfo(editForm);
            setIsEditing(false);
            alert("정보가 수정되었습니다!");
        } catch (error) {
            console.error("정보 수정 실패:", error);
            alert("정보 수정에 실패했습니다!");
        }
    };

    const handleCancel = () => {
        setEditForm(userInfo);
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        alert("로그아웃되었습니다!");
    };

    const handleWithdraw = async () => {
        if (!window.confirm("정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
            return;
        }

        const api = axios.create({
            baseURL: API_URL,
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        try {
            console.log("탈퇴 요청 - role:", role, "user.id:", user.id, "type:", typeof user.id);
            
            if (role === "student") {
                const response = await api.post("/login/studentLeave", { 
                    "studentId": String(user.id)
                });
                console.log("학생 탈퇴 응답:", response);
            } else if (role === "teacher") {
                const response = await api.post("/login/teacherLeave", { 
                    "teacherId": String(user.id)
                });
                console.log("강사 탈퇴 응답:", response);
            }
            logout();
            navigate("/");
            alert("탈퇴되었습니다!");
        } catch (error) {
            console.error("탈퇴 실패:", error);
            console.error("에러 상태:", error.response?.status);
            console.error("에러 데이터:", error.response?.data);
            alert(`탈퇴에 실패했습니다: ${error.response?.data || error.message}`);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center w-screen h-screen text-xl">로딩중...</div>;
    }

    return (
        <div className="flex flex-col items-center w-screen font-sans">
            {/* 헤더 */}
            <div className="w-full bg-gray-200 pt-10 pb-10 px-4 mb-10">
                <h1 className="font-bold text-4xl">{role === "student" ? "학생 마이페이지" : "강사 마이페이지"}</h1>
            </div>

            {/* 메인 컨테이너 */}
            <div className="w-[80vw] max-w-[700px] bg-white border border-gray-300 rounded-2xl shadow-md p-8 mb-10">
                {!isEditing ? (
                    // 조회 모드
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-700">회원 정보</h2>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#4DBAE7] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#32A4D3] transition"
                            >
                                수정하기
                            </button>
                        </div>

                        <div className="border-t pt-4">
                            {userInfo && Object.entries(userInfo).map(([key, value]) => (
                                <div key={key} className="flex justify-between py-2 border-b">
                                    <span className="font-semibold text-gray-600 capitalize">{key}:</span>
                                    <span className="text-gray-800">{value || "-"}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleLogout}
                                className="flex-1 bg-gray-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                            >
                                로그아웃
                            </button>
                            <button
                                onClick={handleWithdraw}
                                className="bg-orange-500 text-white font-semibold px-3 py-2 rounded-lg hover:bg-orange-600 transition text-sm"
                            >
                                탈퇴
                            </button>
                        </div>
                    </div>
                ) : (
                    // 수정 모드
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">정보 수정</h2>

                        <form className="flex flex-col gap-4">
                            {editForm && Object.entries(editForm).map(([key, value]) => (
                                <div key={key}>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2 capitalize">
                                        {key}
                                    </label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={value || ""}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            ))}
                        </form>

                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-[#4DBAE7] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#32A4D3] transition"
                            >
                                저장
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-gray-400 text-white font-bold px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyPage;
