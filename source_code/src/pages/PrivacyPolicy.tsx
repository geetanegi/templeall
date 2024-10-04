import React from "react";
import privacyPolicyPdf from "../assets/Pdf/AceCamGolf_PrivacyPolicy.pdf";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <iframe src={privacyPolicyPdf} width="100%" className="min-h-screen" />
    </div>
  );
};

export default PrivacyPolicy;
