import React from "react";
import privacyPolicyPdf from "./assets/Pdf/AceCamGolfPrivacyPolicy.pdf";
import TermsAndConditionsPdf from "./assets/Pdf/AceCamGolfTermsandConditions.pdf";
import { viewPdf } from "./utils/downloadUtils";

const Footer: React.FC = () => {
  const downloadPrivacyPolicyFunc = () => {
    viewPdf(privacyPolicyPdf);
  };

  const downloadTermsAndConditionsFunc = () => {
    viewPdf(TermsAndConditionsPdf);
  };

  return (
    <div className="fixed bottom-0 w-full bg-[#F5F6F7] shadow-custom-shadow">
      <div className="flex justify-between py-1 px-2">
        <div className="flex items-center justify-center gap-2">
          <p className={`whitespace-nowrap p-2 text-[13px] text-textColor font-medium`}>
            © 2024 AceCam
            <sup className="text-[8px] font-medium">TM&nbsp;</sup>{" "}
            {/* <span className="align-super text-xs">™&nbsp;</span> */}
            Golf, LLC. All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p
            onClick={downloadTermsAndConditionsFunc}
            className={`cursor-pointer whitespace-nowrap text-[13px] text-buttonPrimary hover:underline font-medium`}
          >
            Terms and Conditions
          </p>{" "}
          <p className="cursor-pointer whitespace-nowrap text-[13px] text-[#7B7887] hover:underline">
            |
          </p>{" "}
          <p
            className={`cursor-pointer whitespace-nowrap text-[13px] text-buttonPrimary hover:underline font-medium`}
            onClick={downloadPrivacyPolicyFunc}
          >
            {" "}
            Privacy Policy
          </p>
          <p className="cursor-pointer whitespace-nowrap text-[13px] text-[#7B7887] hover:underline">
            |
          </p>{" "}
          <p
            className={`cursor-pointer whitespace-nowrap text-[13px] text-buttonPrimary hover:underline font-medium`}
          >
            <a href="mailto:support@acecamgolf.com">Contact Us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
