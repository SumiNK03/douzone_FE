import { useState, useEffect } from "react";
import { API_URL } from "../../config/const.js";

export default function TeacherForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  // json에서 과목 불러오기
  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("과목 불러오기 실패:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !id || !password || !confirmPwd || !course) {
      alert("모든 항목을 입력해주세요!");
      return;
    }
    if (password !== confirmPwd) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    // 여기서 API POST 요청 가능
    console.log({ name, id, password, course });
    alert("강사 회원가입 완료!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPwd}
        onChange={(e) => setConfirmPwd(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">과목 선택</option>
        {courses.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-[#4DBAE7] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#32A4D3] transition mt-2"
      >
        회원가입
      </button>
    </form>
  );
}
