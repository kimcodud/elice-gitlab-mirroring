import React from "react";

const Google = () => {
  const handleLogin = () => {
    const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
    const scope =
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const redirectUri = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;
    const responseType = "code";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = url;
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleLogin}
        className="mt-1 text-black rounded w-full"
        style={{
          border: "1px solid rgb(165, 165, 165)",
          padding: "0.5rem",
          width: "",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "1.5em",
            marginRight: "0.5rem",
            marginBottom: "0.1rem", // 아이콘의 아래 여백을 조정합니다.
          }}
        >
          <img src="/assets/google.png" />
        </span>
        <span style={{ fontSize: "1.2rem" }}>Sign in With Google</span>
      </button>
    </div>
  );
};

export default Google;
