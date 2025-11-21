import { useState, useEffect } from 'react';
import './css/EnrollPage.css';
import { API_URL } from "../config/const.js";
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EnrollPage() {
    const [course, setCourse] = useState("");             // 선택한 과목명
    const [teacher, setTeacher] = useState("");           // 선택한 강사명
    const [days, setDays] = useState("");                 // 수업 요일
    const [courses, setCourses] = useState({});           // {과목명: id} 형태
    const [teachers, setTeachers] = useState({});         // {강사명: id} 형태
    const [schedules, setSchedules] = useState(["월수금", "화목"]); // 예시 일정
    const [selectedTime, setSelectedTime] = useState(""); // 선택한 수업 시간
    const [availableTimes, setAvailableTimes] = useState([]); // 강사 공강 시간
    const { user } = useAuth();
    const navigate = useNavigate();

    const studentId = getCookie("studentId");
    function getCookie(name) {
        const matches = document.cookie.match(
            new RegExp('(?:^|; )' + name + '=([^;]*)')
        );
        return matches ? decodeURIComponent(matches[1]) : null;
    }


    // 서버에서 과목 목록 가져오기
    useEffect(() => {
        axios.get(`${API_URL}/enroll/availableSubject`)
            .then((res) => setCourses(res.data))
            .catch(err => console.error("과정 목록 불러오기 실패:", err));

        console.log("studentId (raw from cookie):", studentId); // 여기서 확인

    }, []);

    // 과목 선택 시 해당 과목 강사 목록 가져오기
    useEffect(() => {
        if (!course) {
            setTeachers({}); // 초기화
            setTeacher("");  // 선택값 초기화
            return;
        }

        const subjectId = courses[course]; // 과목명 -> id
        if (!subjectId) return;

        axios.get(`${API_URL}/enroll/availableTeacher`, {
            params: { subjectId }
        })
            .then((res) => setTeachers(res.data))
            .catch(err => console.error("강사 목록 불러오기 실패:", err));
    }, [course, courses]);

    // 강사 및 요일 선택 시 공강 시간 가져오기
    useEffect(() => {
        if (!teacher || !days) return;

        const teacherId = teachers[teacher]; // 강사명 → id
        axios.get(`${API_URL}/enroll/availableTime`, {
            params: { teacherId, day: days }
        })
            .then(res => {
                // 서버에서 받은 LocalTime 문자열은 보통 "HH:mm:ss" 형태입니다.
                // 프론트의 시간 목록은 "HH:mm" 형식이므로 일치시켜 비교 가능하게 변환합니다.
                const normalized = (res.data || []).map(t => {
                    if (!t) return t;
                    // 예: "13:00:00" -> "13:00"
                    const parts = String(t).split(":");
                    return parts.length >= 2 ? `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}` : String(t);
                });
                setAvailableTimes(normalized);
            })
            .catch(err => console.error("공강 시간 불러오기 실패:", err));
    }, [teacher, days, teachers]);


    // 12:00 ~ 22:40 (25분 간격) 시간 목록
    const times = (() => {
        let result = [];
        let hour = 12, minute = 0;
        while (hour < 23 || (hour === 22 && minute <= 40)) {
            result.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
            minute += 25;
            if (minute >= 60) { minute -= 60; hour += 1; }
        }
        return result;
    })();

    const handleTimeClick = (time) => {
        setSelectedTime(prev => prev === time ? "" : time);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!course || !teacher || !days || !selectedTime) {
            alert("모든 항목을 입력해주세요!");
            return;
        } else {
            // 프론트에서 days를 숫자 배열로 전송합니다. (예: [1,3,5])
            const mapDays = {
                "월수금": [1, 3, 5],
                "화목": [2, 4]
            };
            const numericDays = mapDays[days] || [];

            axios.post(`${API_URL}/enroll/enroll`, {
                studentId: Number(studentId),
                subjectId: courses[course],
                teacherId: teachers[teacher],
                days: numericDays,
                time: selectedTime
            }).catch(err => console.error("수강신청 실패:", err.response || err));
        }
        alert(`신청 완료!\n과정: ${course}\n강사: ${teacher}\n요일: ${days}\n시간: ${selectedTime}`);
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center w-screen font-sans">
            <div className="w-full bg-gray-200 pt-10 pb-10 px-4 mb-3">
                <h1 className="font-bold text-4xl">수강 신청</h1>
            </div>

            <form onSubmit={handleSubmit}
                className="border border-gray-300 rounded-2xl shadow-md w-[80vw] max-w-[700px] p-8 bg-white flex flex-col gap-6 mt-2">

                {/* 과목 선택 */}
                <div className="flex items-center justify-between">
                    <label className="w-1/3 text-lg font-semibold">과정</label>
                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="border rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="">선택</option>
                        {Object.entries(courses).map(([name, id]) => (
                            <option key={id} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                {/* 강사 선택 */}
                <div className="flex items-center justify-between">
                    <label className="w-1/3 text-lg font-semibold">강사</label>
                    <select
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                        className="border rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="">선택</option>
                        {Object.entries(teachers).map(([name, id]) => (
                            <option key={id} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                {/* 요일 선택 */}
                <div className="flex items-center justify-between">
                    <label className="w-1/3 text-lg font-semibold">수업요일</label>
                    <select
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="border rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="">선택</option>
                        {schedules.map((d, i) => (
                            <option key={i} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                {/* 시간 선택 */}
                <div className="flex flex-col">
                    <label className="text-lg font-semibold mb-2">수업시간 선택</label>
                    <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto border rounded-lg p-3">
                        {times.map((time, i) => {
                            const isAvailable = availableTimes.includes(time);
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    disabled={!isAvailable} // 불가능 시간은 비활성화
                                    onClick={() => handleTimeClick(time)}
                                    className={`
                border rounded-md py-1 text-sm
                ${selectedTime === time ? "bg-blue-500 text-white"
                                            : isAvailable ? "bg-gray-50 hover:bg-[#B6DFF0]"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"}
            `}
                                >
                                    {time}
                                </button>
                            );
                        })}

                    </div>
                </div>

                {/* 신청 버튼 */}
                <div className="flex justify-end mt-4">
                    <button type="submit"
                        className="bg-[#4DBAE7] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#32A4D3] transition">
                        신청
                    </button>
                </div>
            </form>
        </div>
    );

}

export default EnrollPage;
