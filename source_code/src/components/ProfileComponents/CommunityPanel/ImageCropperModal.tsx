import React from "react";
import Modal from "../../ModalComponent";
import ImageCropper from "./ImageCropper";

interface ModalComponentProps {
  OpenModal: boolean;
  onClose: () => void;
  title: string;
  imageSrc: string;
  handleCropComplete?: (croppedImage: string) => void;
}

const ImageCropperModal: React.FC<ModalComponentProps> = ({
  OpenModal,
  onClose,
  // title,
  imageSrc,
  handleCropComplete,
}) => {
  return (
    <div>
      <Modal isOpen={OpenModal} onClose={onClose} title="Image Cropper">
        <div className="w-[600px] max-w-2xl">
          <ImageCropper
            imageSrc={imageSrc}
            handleCropComplete={handleCropComplete}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ImageCropperModal;
