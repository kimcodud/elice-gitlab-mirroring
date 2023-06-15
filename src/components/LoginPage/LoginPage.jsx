import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Google from "./Google";
import Kakao from "./Kakao";

const LoginPageComponent = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        {
          username: user.userId,
          password: user.password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) {
        navigate("/");
        localStorage.setItem("isLogin", "1");
        location.reload();
      }
    } catch (error) {
      console.log(error);
      // alert(error.response.data.error.message);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-4">
      <div className="mb-10">
        <h1 className="text-5xl text-center text-slate-600 mt-60">LOG IN</h1>
        <h6 className="text-sm text-center text-slate-400">
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
          className="w-full p-1 border-b-2 outline-none border-b-violet-400 mb-6 "
        />
      </label>

      {/* <div className="text-sm text-violet-400">비밀번호를 잊으셨나요?</div> */}

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={handleSubmit}
          type="submit"
          className="px-52 mt-1 text-white rounded bg-violet-400"
          style={{
            fontSize: "1.1rem",
            marginTop: "-1rem",
            padding: "0.5rem",
            width: "100%",
            border: "1px solid gray", // 버튼의 상단 여백을 조정할 수 있습니다.
            // 추가적인 스타일링 옵션을 여기에 작성할 수 있습니다.
          }}
        >
          로그인
        </button>
      </div>
      <div style={{}}>
        <div className="my-3 text-sm text-center">
          <Google />
        </div>
        <div className="my-3 text-sm text-center">
          <div className="my-3 text-sm text-center">
            <Kakao />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-5">
        <p className="pr-3 text-sm">회원이 아니세요?</p>
        <div className="text-sm text-violet-400">
          <a href="/signup">회원가입하기</a>
        </div>
      </div>
      {/* <p className="my-3 text-xs text-center text-slate-500">또는</p> */}
    </form>
  );
};

export default LoginPageComponent;
