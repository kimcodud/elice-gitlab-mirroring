import axios from "axios";
import { useState } from "react";

function LoginPageComponent() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        user_id: user.userId,
        password: user.password,
      });
      console.log(response);
      alert("로그인되었습니다.");
    } catch (error) {
      console.error(error);
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <form className="max-w-md mx-auto mt-4 ">
      <div className="mb-10">
        <h1 className="text-5xl text-center text-slate-600">LOG IN</h1>
        <h6 className="text-xs text-center text-slate-400">
          계정이 있으시다면 로그인하세요
        </h6>
      </div>

      <label className="block mb-2">
        <span className="block mb-1">아이디</span>
        <input
          type="text"
          label="아이디"
          value={user.userId || ""}
          onChange={(e) => setUser({ ...user, userId: e.target.value })}
          required
          className="w-full p-1 border-b-2 outline-none border-b-violet-400"
        />
      </label>

      <label className="block mb-2">
        <span className="block mb-1">비밀번호</span>
        <input
          type="password"
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          className="w-full p-1 border-b-2 outline-none border-b-violet-400 "
        />
      </label>

      <div className="text-sm text-violet-400">비밀번호를 잊으셨나요?</div>

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={handleSubmit}
          type="submit"
          className="px-32 py-2 mt-6 text-white rounded bg-violet-400 "
        >
          로그인
        </button>
      </div>

      <div className="flex items-center justify-center mt-5">
        <p className="pr-3 text-sm">회원이 아니세요?</p>
        <div className="text-sm text-violet-400">회원가입하기</div>
      </div>
      <p className="my-3 text-xs text-center text-slate-500">또는</p>
      <div className="my-3 text-sm text-center ">SNS 간편 로그인</div>
    </form>
  );
}

export default LoginPageComponent;
