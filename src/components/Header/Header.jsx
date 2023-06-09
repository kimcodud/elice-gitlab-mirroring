import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="h-14">
      <nav className="p-1 flex justify-start h-14">
        <a href="/">
          <img
            src="/src/assets/starRoad_2.png"
            className="ml-6 mr-96 h-20 w-18 -mt-3"
          ></img>
        </a>
        <a href="/plannerMap" className="text-zinc-400 ml-auto p-3">
          일정만들기(임시)
        </a>
        <a href="/plannerEdit" className="text-zinc-400 ml-auto p-3">
          일정 수정(임시)
        </a>
        <a
          href="/travelBoard"
          className="text-zinc-400 ml-auto p-3 bg-white hover:bg-gray-100"
        >
          여행기
        </a>
        <a
          href="/login"
          className="text-zinc-400 p-3 bg-white hover:bg-gray-100"
        >
          로그인
        </a>
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
