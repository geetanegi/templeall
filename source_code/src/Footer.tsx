import React from "react";

import { TERMS_AND_CONDITIONS_URL, PRIVACY_POLICY_URL } from "./utils/constantEnums";

const Footer: React.FC = () => {
  const downloadPrivacyPolicyFunc = () => {
    window.open(PRIVACY_POLICY_URL, "_blank");
  };

  const downloadTermsAndConditionsFunc = () => {
    window.open(TERMS_AND_CONDITIONS_URL, "_blank");

  };

  return (
    <div className="fixed bottom-0 z-40 w-full bg-[#F5F6F7] shadow-custom-shadow">
      <div className="flex justify-between py-1 pl-[24px] pr-[24px]">
        <div className="flex items-center justify-center gap-2">
          <p
            className={`whitespace-nowrap p-2 text-[13px] font-medium text-textColor`}
          >
            © 2025 Temple App. All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p
            onClick={downloadTermsAndConditionsFunc}
            className={`cursor-pointer whitespace-nowrap text-[13px] font-medium text-buttonPrimary hover:underline`}
          >
            Terms and Conditions
          </p>{" "}
          <p className="cursor-pointer whitespace-nowrap text-[13px] text-[#7B7887] hover:underline">
            |
          </p>{" "}
          <p
            className={`cursor-pointer whitespace-nowrap text-[13px] font-medium text-buttonPrimary hover:underline`}
            onClick={downloadPrivacyPolicyFunc}
          >
            {" "}
            Privacy Policy
          </p>
          <p className="cursor-pointer whitespace-nowrap text-[13px] text-[#7B7887] hover:underline">
            |
          </p>{" "}
          <p
            className={`cursor-pointer whitespace-nowrap text-[13px] font-medium text-buttonPrimary hover:underline`}
          >
            <a href="mailto:support@acecamgolf.com">Contact Us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
