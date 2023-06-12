import React from "react";

const Kakao = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    window.location.href = url;
  };

  return (
    <div>
      <button onClick={() => handleLogin()}>카카오 로그인</button>
    </div>
  );
};

export default Kakao;
