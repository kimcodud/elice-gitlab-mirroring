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
    <div>
      <button
  onClick={handleLogin}
  className="px-32 py-2 mt-6 text-black rounded bg-gray-100"
>
  구글로 로그인하기
</button>

    </div>
  );

};

export default Google;

