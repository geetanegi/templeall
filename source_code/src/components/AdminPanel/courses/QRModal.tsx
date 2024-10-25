import React, { useRef } from "react";
import QRCode from "react-qr-code";
import Modal from "../../ModalComponent";

interface QRModalProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  course: any;
}

const QRModal: React.FC<QRModalProps> = ({
  openModal,
  setOpenModal,
  course,
}) => {
  const qrCodeRefs = useRef<{ [key: string]: SVGSVGElement | null }>({});
  // Function to convert query params to an object
  const getQueryParams = (): Record<string, string> => {
    const queryString = course?.split("?")[1]; // Get the part after '?' in the URL
    const params = new URLSearchParams(queryString);
    const queryParamsObj: Record<string, string> = {};
    for (let [key, value] of params.entries()) {
      queryParamsObj[key] = value;
    }
    return queryParamsObj;
  };

  const queryParams = getQueryParams();
  console.log("course", queryParams);
  return (
    <div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title={""}>
        <div
          className="mx-auto w-[500px] overflow-auto p-2 text-center"
          style={{ maxHeight: "480px" }}
        >
          <div className="m-1 flex items-center justify-center">
            <QRCode
              key={course}
              value={course}
              size={256}
              // level="H"
              bgColor="#FFFFFF"
              fgColor="#000000"
              ref={(el: any) => (qrCodeRefs.current[course] = el)}
            />
          </div>
          <div className="px-5 py-5 text-left">
            <span>
              {" "}
              <strong>Course</strong>: {queryParams.courseName},
            </span>
            <span>
              <strong>{queryParams.holeNo && "  Hole No: "}</strong>
              {queryParams.holeNo}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QRModal;
