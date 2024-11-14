import { Button, Slider } from "@mui/material";
import React, { useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import getCroppedImg from "../../../utils/ImageUtils";

interface ImageCropperProps {
  imageSrc: string;
  buttonText?: string;
  handleCropComplete?: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  buttonText,
  handleCropComplete,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  // const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

      if (croppedImage && handleCropComplete) {
        handleCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative h-[500px] w-[600px]">
      <div className="absolute bottom-40 left-2 right-2 top-0">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          cropShape="round"
          aspect={4 / 5}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="absolute left-5 right-5 top-[70%]">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(_, zoom) => setZoom(Number(zoom))}
          classes={{ root: "slider" }}
        />

        <div>
          <Button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            className="w-full"
          >
            {buttonText || "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
