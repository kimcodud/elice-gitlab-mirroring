import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [role, setRole] = useState("");
  const roleCheck = () => {
    if (localStorage.getItem("role")) {
      setRole(localStorage.getItem("role"));
    }
  };

  const logoutHandler = async () => {
    const res = await axios.post(
      "http://localhost:3000/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      location.reload();
    }
    console.log(res);
    localStorage.removeItem("role");
  };

  useEffect(() => {
    roleCheck();
    // logoutHandler()
  }, []);
  return (
    <header className="h-14">
      <nav className="p-1 flex justify-start h-14">
        <a href="/">
          <img
            src="/src/assets/starRoad_2.png"
            className="ml-6 mr-48 h-20 w-18 -mt-3"
          ></img>
        </a>
        <a href="/plannerMap" className="text-zinc-400 ml-auto p-3">
          일정만들기(임시)
        </a>
        <a href="/plannerEdit" className="text-zinc-400 ml-auto p-3">
          일정 수정(임시)
        </a>
        {role === "ADMIN" && (
          <a href="/admin" className="text-violet-600 font-bold ml-auto p-3">
            ADMIN
          </a>
        )}
        <a
          href="/travelBoard"
          className="text-zinc-400 ml-auto p-3 bg-white hover:bg-gray-100"
        >
          여행기
        </a>
        {!role && (
          <a
            href="/login"
            className="text-zinc-400 p-3 bg-white hover:bg-gray-100"
          >
            로그인
          </a>
        )}
        {role && (
          // <button onClick={logoutHandler}>
          //   <a
          //     href="/"
          //     className="text-zinc-400 p-3 bg-white hover:bg-gray-100"
          //   >
          //     로그아웃
          //   </a>
          // </button>
          <button
            className="text-zinc-400 p-3 bg-white hover:bg-gray-100"
            onClick={logoutHandler}
          >
            로그아웃
          </button>
        )}
        <a
          href="/signup"
          className="text-zinc-400 mr-5 p-3 bg-white hover:bg-gray-100"
        >
          회원가입
        </a>
        <a href="/mypage">
          <img src="/src/assets/user.png" className="px-4 py-2 mr-2 h-12" />
        </a>
      </nav>
    </header>
  );
};

export default Header;
