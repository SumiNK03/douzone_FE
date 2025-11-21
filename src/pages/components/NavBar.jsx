import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../images/douzone_logo_white.png";
import loginImg from "../../images/login.svg";
import logoutImg from "../../images/logout.svg";

function NavBar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isLoggedIn = !!user?.username;
    const role = user?.role || "student";

    // 비로그인 상태 메뉴 : 사이트 정보, 로그인, 회원가입
    // 학생 로그인 상태 메뉴 : 수강신청, 강의실, 마이페이지
    // 강사 로그인 상태 메뉴 : 내 담당 강좌 조회, 시간표, 마이페이지
    return (
        <div className="w-full h-[60px] bg-[#4DBAE7] flex items-center justify-between px-6 font-sans">
            {/* 로고 */}
            <img
                src={logo}
                className="h-[60px] w-auto cursor-pointer"
                onClick={() => navigate("/")}
            />

            {/* 메뉴 */}
            {
                !isLoggedIn ? (
                    // A – 로그인 안 했을 때
                    <div className="flex gap-[20vw]">
                        <NavLink
                            to="/siteinfo"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            정보
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            로그인
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            회원가입
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                    </div>
                ) : role === "student" ? (
                    // B – 로그인 + 학생
                    <div className="flex gap-[20vw]">
                        <NavLink
                            to="/enroll"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            수강신청
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                        <NavLink
                            to="/classroom"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            강의실
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                        <NavLink
                            to="/mypage"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            마이페이지
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                    </div>
                ) : (
                    // C – 로그인 + 강사
                    <div className="flex gap-[20vw]">
                        <NavLink
                            to="/myclasses"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            내 담당 강좌
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                        <NavLink
                            to="/class"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            시간표
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                        <NavLink
                            to="/mypage"
                            className="font-bold text-xl text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group"
                        >
                            마이페이지
                            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                        </NavLink>
                    </div>
                )
            }


            {/* 로그인/로그아웃 버튼 */}
            <button
                className="w-[40px] transition-transform duration-200 hover:scale-105 cursor-pointer"
                onClick={() => (isLoggedIn ? logout() : navigate("/login"))}
            >
                <img className="w-full" src={isLoggedIn ? logoutImg : loginImg} />
            </button>
        </div>
    );
}

export default NavBar;
