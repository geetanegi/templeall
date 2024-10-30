import React from "react";
import privacyPolicyPdf from "../assets/Pdf/AceCam Golf Privacy Policy.pdf";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <iframe src={privacyPolicyPdf} width="100%" className="min-h-screen" />
    </div>
  );
};

export default PrivacyPolicy;
