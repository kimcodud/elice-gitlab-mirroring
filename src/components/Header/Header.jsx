import "./Header.css";

function Header() {
  return (
    <>
      <header className="h-14">
        <nav className="p-1 flex justify-start h-14">
          <a href="/">
            <img
              src="/src/assets/starRoad_2.png"
              className="ml-6 mr-96 mb-20 h-14 w-18 "
            ></img>
          </a>

          <a href="/travelDiary" className="text-zinc-400 ml-auto p-3">
            여행기
          </a>
          <a href="/login" className="text-zinc-400 p-3">
            로그인
          </a>
          <a href="/signup" className="text-zinc-400 mr-5 p-3">
            회원가입
          </a>
          <a href="/mypage">
            <img src="/src/assets/user.png" className="px-4 py-2 mr-2 h-12" />
          </a>
        </nav>
      </header>
    </>
  );
}

export default Header;
