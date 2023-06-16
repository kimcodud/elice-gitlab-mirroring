import React from "react";
import KakaoLogin from "react-kakao-login";
import axios from "axios";

const Kakao = () => {
  const handleLoginSuccess = (response) => {
    // 로그인 성공 처리 로직
    const clientId = import.meta.env.VITE_APP_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
    const responseType = "code";
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;
    //const url = `https://kauth.kakao.com/oauth/authorize?client_id=484ae55902a9f3cefa21cdabf927596e&redirect_uri=http://localhost:3000/auth/kakao/callback&response_type=code`;

    window.location.href = url;

    console.log("로그인 성공:", response);
    const apiUrl =
      import.meta.env.VITE_APP_SERVER_MODE === "DEV"
        ? import.meta.env.VITE_APP_API_DEV_URL
        : import.meta.env.VITE_APP_API_PROD_URL;
    // 카카오 인증 코드를 백엔드로 전송하는 API 요청
    axios
      .post(`${apiUrl}/auth/kakao/callback`, { code: response.code })
      .then((response) => {
        // 백엔드에서 처리된 결과를 확인하고 필요한 로직을 추가합니다.
        console.log("백엔드 응답:", response.data);
      })
      .catch((error) => {
        // 에러 처리 로직
        console.error("API 요청 에러:", error.response);
      });
  };

  const handleLoginFail = (error) => {
    // 로그인 실패 처리 로직
    console.log("로그인 실패:", error);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
    console.log("로그아웃");
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "inline-block" }}>
        <KakaoLogin
          style={{ marginBottom: "1px", marginRight: "0.1rem" }}
          token={"769ab816c7034fe8dcb3567bdbf49cae"}
          onSuccess={handleLoginSuccess}
          onFail={handleLoginFail}
          onLogout={handleLogout}
        >
          <img
            src="/assets/kakao.png"
            style={{
              width: "30rem",
              height: "90%",
              // border: "1px solid rgb(165, 165, 165)",
              borderRadius: "0px",
            }}
          />
        </KakaoLogin>
      </div>
    </div>
  );
};

export default Kakao;
