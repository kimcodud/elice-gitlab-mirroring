import React from "react";

const Google = () => {
  const handleLogin = () => {
    const clientId =
      "967078246054-hjffdp6i565eor8l6b0390gm18uuvn60.apps.googleusercontent.com";
    const scope =
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid";
    const redirectUri = "http://localhost:3000/auth/callback";
    const responseType = "code";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = url;
  };

  return (
    <div>
      <button onClick={() => handleLogin()}>Login with Google</button>
    </div>
  );
};

export default Google;
