import React, { useEffect, useState } from "react";
import Modal from "../ModalComponent";
import { ArrowDownToLine } from "lucide-react";
import { BsFacebook } from "react-icons/bs";

interface ShareVideoModalProps {
  isShareModalOpen: boolean;
  setIsShareModalOpen: (flag: boolean) => void;
  url: any;
}

const ShareVideoModal: React.FC<ShareVideoModalProps> = ({
  isShareModalOpen,
  setIsShareModalOpen,
  url,
}) => {
  const [URLCopiedMessage, setURLCopiedMessage] = useState<boolean>(false);

  useEffect(() => {
    setURLCopiedMessage(false);
  }, [isShareModalOpen]);

  const handleFacebookClick = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setURLCopiedMessage(true);
  };

  return (
    <div className="text-black">
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Share Video"
      >
        <div className="mx-auto mt-[-40px] h-[220px] w-[420px] p-4">
          <div className="flex space-x-4 overflow-x-auto py-2">
            <div className="flex flex-col items-center">
              <a
                href={url}
                download
                className="flex items-center justify-center rounded-full bg-gray-200 text-[gray] hover:bg-blue-700"
              >
                <ArrowDownToLine className="text-2xl hover:text-[#fff] p-3 h-full w-full" />
              </a>
              <span className="mt-2 text-xs text-gray-600">Download</span>
            </div>

            {/* Facebook */}
            <div className="flex flex-col items-center">
              <button
                className="rounded-full bg-blue-600 p-3 text-white hover:bg-blue-700"
                onClick={handleFacebookClick}
              >
                <BsFacebook className="text-2xl" />
              </button>
              <span className="mt-2 text-xs text-gray-600">Facebook</span>
            </div>
          </div>

          {/* URL and Copy Button */}
          <div className="mt-4 flex items-center justify-between rounded-lg border p-3">
            <input
              type="text"
              value={url}
              className="w-full bg-transparent text-sm outline-none"
              readOnly
            />
            <button
              className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
              onClick={handleCopyUrl}
            >
              Copy
            </button>
          </div>
          <span
            hidden={!URLCopiedMessage}
            className="m-1 text-sm text-green-700"
          >
            URL copied!
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default ShareVideoModal;
