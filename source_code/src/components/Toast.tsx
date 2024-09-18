import React from "react";
import { toast } from "react-toastify";

interface MsgProps {
  message: string;
  subtitle: string;
  icon?: React.ReactNode; // Optional icon prop
}

const Msg: React.FC<MsgProps> = ({ message, subtitle }) => (
  <div className="flex items-start">
    <div className="mx-2"></div>
    <div className="flex flex-col">
      <div className="text-lg font-bold">{subtitle}</div>
      <div className="text-base">{message}</div>
    </div>
  </div>
);

export function ToastSuccess(message: string) {
  toast.success(<Msg message={message} subtitle="Success!" />);
}

export function ToastError(message: string) {
  toast.error(<Msg message={message} subtitle="Error!" />);
}

export function ToastWarning(message: string) {
  toast.warning(<Msg message={message} subtitle="Warning" />);
}

export function ToastInfo(message: string) {
  toast.info(<Msg message={message} subtitle="Information." />);
}
