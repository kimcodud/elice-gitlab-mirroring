import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const apiUrl =
      import.meta.env.VITE_APP_SERVER_MODE === "DEV"
        ? import.meta.env.VITE_APP_API_DEV_URL
        : import.meta.env.VITE_APP_API_PROD_URL;
    const res = await axios.post(
      `${apiUrl}/users/logout`,
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
    const apiUrl =
      import.meta.env.VITE_APP_SERVER_MODE === "DEV"
        ? import.meta.env.VITE_APP_API_DEV_URL
        : import.meta.env.VITE_APP_API_PROD_URL;
    const result = await axios.get(`${apiUrl}/mypage`, {
      withCredentials: true,
    });
    if (result.status === 200) {
      setRole(result.data.userData.role);
    }
  };
  return (
    <header className="h-18">
      <div style={{}}>
        <nav
          className="flex justify-start h-14 items-center text-center"
          style={{ fontSize: "1.2rem", alignItems: "center" }}
        >
          <Link to="/">
            <img
              src="/assets/starRoad_2.png"
              className="ml-6 mr-48 h-24 w-18 mt-2"
            ></img>
          </Link>

          {role === "ADMIN" && (
            <Link
              to="/admin"
              className="text-violet-600 font-bold p-3"
              style={{ marginLeft: "65%" }}
            >
              ADMIN
            </Link>
          )}
          <Link
            to="/travelBoard"
            className="text-zinc-400 ml-auto p-3  hover:bg-gray-100"
          >
            여행기
          </Link>
          {!role && (
            <Link to="/login" className="text-zinc-400 p-3 hover:bg-gray-100">
              로그인
            </Link>
          )}
          {role && (
            <button
              className="text-zinc-400 p-3  hover:bg-gray-100"
              onClick={logoutHandler}
            >
              로그아웃
            </button>
          )}
          {!role && (
            <Link
              to="/signup"
              className="text-zinc-400 mr-5 p-3 hover:bg-gray-100"
            >
              회원가입
            </Link>
          )}
          <Link to="/mypage">
            <img src="/assets/user.png" className="px-4 py-2 mr-2 h-12" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
