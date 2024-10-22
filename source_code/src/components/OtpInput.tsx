import React, { useRef } from "react";

type OtpInputProps = {
  otp: string;
  length?: number;
  onChangeOtp: (otp: string) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({
  otp,
  length = 6,
  onChangeOtp,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const otpArray = otp.split("");
    otpArray[index] = value;
    const newOtp = otpArray.join("");
    onChangeOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (pasteData.length === length && !isNaN(Number(pasteData))) {
      onChangeOtp(pasteData);
      inputsRef.current[length - 1]?.focus();
    }
    event.preventDefault();
  };

  return (
    <div className="flex gap-0 md:gap-6">
      {Array(length)
        .fill("")
        .map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={otp[index] || ""}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            style={{ background: "#00000099" }}
            className="h-9 w-9 rounded-lg border text-center text-lg text-white outline-none md:h-14 md:w-14"
          />
        ))}
    </div>
  );
};

export default OtpInput;
