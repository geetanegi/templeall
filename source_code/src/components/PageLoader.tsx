import React, { useEffect } from "react";

import LoadingOverlay from "react-loading-overlay-ts";
import { BeatLoader, PropagateLoader } from "react-spinners";

interface PageLoaderProps {
  isActive: boolean;
  children: React.ReactNode;
  individual?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isActive,
  children,
  individual = false,
}) => {
  useEffect(() => {
    if (isActive) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isActive]);

  return (
    <LoadingOverlay
      active={isActive}
      spinner={
        individual ? (
          <BeatLoader color={"#FFFFFF"} />
        ) : (
          <PropagateLoader color={"#5383ff"} />
        )
      }
      styles={{
        overlay: (base: React.CSSProperties) => ({
          ...base,
          zIndex: 1038,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        }),
      }}
    >
      {children}
    </LoadingOverlay>
  );
};

export default PageLoader;
