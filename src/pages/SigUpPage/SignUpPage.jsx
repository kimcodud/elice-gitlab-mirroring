import axios from "axios";
import { useState } from "react";
import InputField from "../../components/SignUpPage/InputField";

// input 컴포넌트

function SignUpPage() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    nickName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.passwordConfirm) {
      alert("비밀번호가 올바르지 않습니다.");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;
    if (!passwordRegex.test(user.password)) {
      alert("비밀번호에 문자,숫자,특수문자를 포함해 주세요");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email: user.email,
        name: user.name,
        nickName: user.nickName,
        password: user.password,
      });
      console.log(response.data);
      alert("회원가입을 축하합니다");
      setUser({
        nickName: "",
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 ">
      <div className="mb-10">
        <h1 className="text-5xl text-center text-slate-600">SIGN UP</h1>
        <h6 className="text-xs text-center text-slate-400">
          계정이 없으시다면 회원가입하세요
        </h6>
      </div>

      <InputField
        label="이메일"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />

      <InputField
        label="이름"
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
      />

      <InputField
        label="닉네임"
        type="text"
        value={user.nickName}
        onChange={(e) => setUser({ ...user, nickName: e.target.value })}
        required
      />

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

        {/*  */}
      </label>

      <InputField
        label="비밀번호 확인"
        type="password"
        value={user.passwordConfirm}
        onChange={(e) => setUser({ ...user, passwordConfirm: e.target.value })}
        minLength={10}
        maxLength={20}
        required
      />

      <div className="flex items-center justify-center mt-5">
        <button
          type="submit"
          className="px-32 py-2 mt-16 text-white rounded bg-violet-400"
        >
          여행 시작하기
        </button>
      </div>
    </form>
  );
}

export default SignUpPage;
