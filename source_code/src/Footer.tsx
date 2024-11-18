import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#F5F6F7]">
      <div className="flex justify-between pr-2">
        <div className="flex items-center justify-center gap-2">
          <p className={`whitespace-nowrap p-2 text-[13px] text-textColor`}>
            © 2024 AceCam
            <sup className="text-[8px]">TM&nbsp;</sup>{" "}
            {/* <span className="align-super text-xs">™&nbsp;</span> */}
            Golf, LLC. All rights reserved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p
            // onClick={downloadTermsAndConditionsFunc}
            className={`cursor-pointer whitespace-nowrap text-[13px] text-link hover:underline`}
          >
            Terms and Conditions
          </p>{" "}
          <p className="cursor-pointer whitespace-nowrap text-[13px] text-[#FFFFFF] hover:underline">
            |
          </p>{" "}
          <p
            className={`cursor-pointer whitespace-nowrap text-[13px] text-link hover:underline`}
            // onClick={downloadPrivacyPolicyFunc}
          >
            {" "}
            Privacy Policy
          </p>
          <p className="cursor-pointer whitespace-nowrap text-[13px] text-[#FFFFFF] hover:underline">
            |
          </p>{" "}
          <p
            className={`cursor-pointer whitespace-nowrap text-[13px] text-link hover:underline`}
          >
            <a href="mailto:support@acecamgolf.com">Contact Us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
