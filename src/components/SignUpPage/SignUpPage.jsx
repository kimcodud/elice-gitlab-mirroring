import axios from "axios";
import { useState } from "react";

// input 컴포넌트

function SignUpPageComponent() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    userId: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;

    try {
      if (
        user.email === "" ||
        user.name === "" ||
        user.userId === "" ||
        user.password === ""
      ) {
        alert("각 항목을 공백없이 입력하십시오");
      } else if (!passwordRegex.test(user.password)) {
        alert("비밀번호에 문자,숫자,특수문자를 포함해 주세요");
        return;
      } else if (user.password !== user.passwordConfirm) {
        alert("비밀번호가 올바르지 않습니다.");
        return;
      } else if (user.userId.length > 20 || user.userId.length < 6) {
        alert("아이디는 6자이상 20자 이하로 작성해주세요");
        return;
      } else {
        const response = await axios.post(
          "http://localhost:3000/users/signup",
          {
            email: user.email,
            name: user.name,
            username: user.userId,
            password: user.password,
          }
        );
        console.log(response.data);
        alert("회원가입을 축하합니다");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-4 ">
      <div className="mb-10">
        <h1 className="text-5xl text-center text-slate-600">SIGN UP</h1>
        <h6 className="text-xs text-center text-slate-400">
          계정이 없으시다면 회원가입하세요
        </h6>
      </div>
      <label className="block mb-2">
        <span className="block mb-1">이메일</span>
        <input
          type="email"
          label="이메일"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          className="w-full p-1 border-b-2 outline-none border-b-violet-400"
        />
      </label>
      <label className="block mb-2">
        <span className="block mb-1">이름</span>
        <input
          label="이름"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
          className="w-full p-1 border-b-2 outline-none border-b-violet-400"
        />
      </label>
      <label className="block mb-2">
        <span className="block mb-1">아이디</span>
        <input
          label="아이디"
          type="text"
          value={user.userId}
          onChange={(e) => setUser({ ...user, userId: e.target.value })}
          required
          className="w-full p-1 border-b-2 outline-none border-b-violet-400"
        />
      </label>

      <label className="block mb-2">
        <span className="block mb-1">비밀번호</span>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          minLength={10}
          maxLength={20}
          required
          className="w-full p-1 border-b-2 outline-none border-b-violet-400 "
        />

        {user.password !== user.passwordConfirm ? (
          <h6 className="text-xs text-rose-600">비밀번호가 서로 다릅니다.</h6>
        ) : (
          <h6 className="text-xs text-violet-400">
            비밀번호(문자,숫자,특수문자 포함 10~20자)
          </h6>
        )}
      </label>
      <label className="block mb-2">
        <span className="block mb-1">비밀번호 확인</span>
        <input
          label="비밀번호 확인"
          type="password"
          value={user.passwordConfirm}
          onChange={(e) =>
            setUser({ ...user, passwordConfirm: e.target.value })
          }
          minLength={10}
          maxLength={20}
          required
          className="w-full p-1 border-b-2 outline-none border-b-violet-400"
        />
      </label>
      <div className="flex items-center justify-center mt-5">
        <button
          type="submit"
          className="px-32 py-2 mt-16 text-white rounded bg-violet-400"
          onClick={handleSubmit}
        >
          여행 시작하기
        </button>
      </div>
    </form>
  );
}

export default SignUpPageComponent;
