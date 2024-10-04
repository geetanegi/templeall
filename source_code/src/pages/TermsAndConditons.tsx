import React from "react";
import TermsAndConditionsPdf from "../assets/Pdf/AceCamGolf_TermsAndConditions.pdf";

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
