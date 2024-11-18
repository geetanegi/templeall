import React from "react";
import AppleLogin from "react-apple-login";
import AppleIcon from "../../assets/images/apple-1.png";

const AppleSignInButton: React.FC = () => {
  // Handle the success response from Apple (callback for both success and failure)
  const handleAppleResponse = (response: any) => {
    console.log("Apple response:", response);
    if (response.error) {
      console.error("Apple login failed:", response.error);
      alert("Apple login failed. Please try again later.");
      return;
    }

    // If login is successful, proceed with the token
    console.log("Apple login successful:", response);

    // Send the response to your backend for validation
    fetch("/api/apple-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.authorization.id_token }),
    })
      .then((res) => res.json()) // Parse JSON response from backend
      .then((data) => {
        console.log("Backend response:", data);
        // Handle the backend response here (e.g., set user data, redirect, etc.)
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
        alert("Failed to sign in. Please try again later.");
      });
  };

  return (
    <AppleLogin
      clientId="com.acecamgolf.web" // Your Service ID as Client ID
      redirectURI="https://dev.acecamgolf.com" // Your redirect URL
      responseType="code id_token"
      responseMode="form_post"
      scope="name email"
      callback={handleAppleResponse} // Handle both success and failure here
      render={(renderProps: any) => (
        <button onClick={renderProps.onClick} className="apple-signin-button">
          <img
            src={AppleIcon}
            alt="Sign in with Apple"
            className="h-10 w-10 rounded-full bg-white"
          />
          <span>Sign in with Apple</span>
        </button>
      )}
    />
  );
};

export default AppleSignInButton;
