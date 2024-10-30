import React from "react";
import TermsAndConditionsPdf from "../assets/Pdf/AceCam Golf Terms and Conditions.pdf";

const TermsAndConditons: React.FC = () => {
  return (
    <div>
      <iframe
        src={TermsAndConditionsPdf}
        width="100%"
        className="min-h-screen"
      />
    </div>
  );
};

export default TermsAndConditons;
