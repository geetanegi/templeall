// src/components/InstagramLogin.tsx
import React from "react";
import Instagram from "../../assets/images/Instagram.svg";

const InstagramLoginComponent: React.FC = () => {
  const appId: string = "1231935291184850"; // Replace with your Instagram App ID
  const redirectUri: string = "http://localhost:3000/instagram-callback"; // Replace with your redirect URI

  const handleLogin = () => {
    const authUrl: string = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=user_profile,user_media&response_type=code`;
    window.location.href = authUrl;






    
  };

  return (
    <button onClick={handleLogin} className="cursor-pointer">
      <img src={Instagram} alt="Instagram login" />
    </button>
  );
};

export default InstagramLoginComponent;
