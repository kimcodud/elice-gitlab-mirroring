function Header() {
  return (
    <>
      <header className="">
        <nav className="bg-slate-50 p-3 flex justify-start h-18">
          <a href="/">
            <img src="/src/assets/starRoad.png" className="mr-3 h-20"></img>
          </a>
          {/* <img
            src="/src/assets/starRoad2.png"
            className="object-cover px-5"
            alt="Logo"
          /> */}
          <a href="/" className="text-black p-6">
            여행기
          </a>
          <a href="/" className="text-black p-6">
            로그인
          </a>
          <a href="/" className="text-black p-6">
            회원가입
          </a>
          <div className="ml-auto flex items-center">
            {/* <button className="text-black border border-black rounded-lg px-4 py-2 mr-2">
              Login
            </button>
            <button className="text-black border border-black rounded-lg px-4 py-2">
              Sign Up
            </button> */}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
