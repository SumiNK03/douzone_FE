import { useState, useEffect } from "react";
import { API_URL } from "../../config/const.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  // const [course, setCourse] = useState("");
  // const [courses, setCourses] = useState([]);


  // useEffect(() => {
  //   axios.get(`${API_URL}/enroll/availableSubject`).then((response) => {
  //     setCourses(response.data);
  //   }).catch((error) => {
  //     console.error("과목 불러오기 실패:", error);
  //   });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !id || !password || !confirmPwd || !phoneNumber) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    if (password !== confirmPwd) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    axios.post(`${API_URL}/login/studentSignup`, {
      loginId: id,
      loginPassword: password,
      studentName: name,
      phone: phoneNumber,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("학생 회원가입 성공:", response.data);
          alert("학생 회원가입 완료!");
          navigate("/login");
        } else if (response.status === 409) {
          alert("이미 존재하는 아이디입니다.");
        } else if (response.status === 500) {
          alert("서버 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("학생 회원가입 실패:", error);
        alert("회원가입 실패! 서버 오류입니다.");
      });

    console.log({ name, id, password, phoneNumber });
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
      <input
        type="text"
        placeholder="전화번호"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/* <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">과목 선택</option>
        {Object.entries(courses).map(([name, id]) => (
                            <option key={id} value={name}>{name}</option>
                        ))}
      </select> */}
      <button
        type="submit"
        className="bg-[#4DBAE7] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#32A4D3] transition mt-2"
      >
        회원가입
      </button>
    </form>
  );
}
