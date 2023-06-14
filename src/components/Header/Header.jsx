import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const res = await axios.post(
      "http://localhost:3000/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      navigate("/");
      location.reload();
      localStorage.removeItem("isLogin");
    }
  };

  useEffect(() => {
    // console.log(localStorage.getItem("isLogin"));
    if (localStorage.getItem("isLogin") === "1") {
      getUserData();
    }
    // logoutHandler()
  }, []);

  const getUserData = async () => {
    const result = await axios.get("http://localhost:3000/mypage", {
      withCredentials: true,
    });
    if (result.status === 200) {
      setRole(result.data.userData.role);
    }
  };
  return (
    <header className="h-20">
      <nav
        className="p-4 flex justify-start h-14"
        style={{ fontSize: "1.2rem" }}
      >
        <Link to="/">
          <img
            src="/src/assets/starRoad_2.png"
            className="ml-6 mr-48 h-24 w-18 -mt-5"
          ></img>
        </Link>
        <Link to="/plannerMap/:id" className="text-zinc-400 ml-auto p-3">
          일정만들기(임시)
        </Link>
        <Link to="/plannerEdit" className="text-zinc-400 ml-auto p-3">
          일정 수정(임시)
        </Link>
        {role === "ADMIN" && (
          <Link to="/admin" className="text-violet-600 font-bold ml-auto p-3">
            ADMIN
          </Link>
        )}
        <Link
          to="/travelBoard"
          className="text-zinc-400 ml-auto p-3 bg-white hover:bg-gray-100"
        >
          여행기
        </Link>
        {!role && (
          <Link
            to="/login"
            className="text-zinc-400 p-3 bg-white hover:bg-gray-100"
          >
            로그인
          </Link>
        )}
        {role && (
          <button
            className="text-zinc-400 p-3 bg-white hover:bg-gray-100"
            onClick={logoutHandler}
          >
            로그아웃
          </button>
        )}
        {!role && (
          <Link
            to="/signup"
            className="text-zinc-400 mr-5 p-3 bg-white hover:bg-gray-100"
          >
            회원가입
          </Link>
        )}
        <Link to="/mypage">
          <img src="/src/assets/user.png" className="px-4 py-2 mr-2 h-12" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
