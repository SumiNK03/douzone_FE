import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../images/douzone_logo_white.png";
import loginImg from "../../images/login.svg";
import logoutImg from "../../images/logout.svg";

function NavBar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isLoggedIn = !!user?.token; // 로그인 여부 (token 존재 확인)
    const role = user?.role ?? "student"; // 기본값 student

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const menuItems = !isLoggedIn
        ? [
              { name: "정보", path: "/siteinfo" },
              { name: "로그인", path: "/login" },
              { name: "회원가입", path: "/signup" },
          ]
        : role === "student"
        ? [
              { name: "수강신청", path: "/enroll" },
              { name: "강의실", path: "/classroom" },
              { name: "마이페이지", path: "/mypage" },
          ]
        : [
              { name: "내 담당 강좌", path: "/myclasses" },
              { name: "시간표", path: "/class" },
              { name: "마이페이지", path: "/mypage" },
          ];

    return (
        <div className="w-full h-[60px] bg-[#4DBAE7] flex items-center justify-between px-2 sm:px-6 font-sans">
            {/* 로고 */}
            <img
                src={logo}
                className="h-10 sm:h-[60px] w-auto cursor-pointer"
                onClick={() => navigate("/")}
            />

            {/* 메뉴 */}
            <div className="flex gap-4 sm:gap-[20vw]">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className="font-bold text-sm sm:text-[clamp(20px,1.5vw,100px)] text-white relative transition-all duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer group whitespace-nowrap"
                    >
                        {item.name}
                        <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                    </NavLink>
                ))}
            </div>

            {/* 로그인/로그아웃 버튼 */}
            <button
                className="w-[30px] sm:h-[40px] transition-transform duration-200 hover:scale-105 cursor-pointer"
                onClick={() => (isLoggedIn ? handleLogout() : navigate("/login"))}
            >
                <img className="w-full" src={isLoggedIn ? logoutImg : loginImg} />
            </button>
        </div>
    );
}

export default NavBar;
