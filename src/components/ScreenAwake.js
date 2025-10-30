import React, { useEffect, useRef } from "react";
const ScreenAwake = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const startVideo = async () => {
      try {
        await video.play();
        console.log("🔋 Screen kept awake via video playback");
      } catch (err) {
        console.warn("Video wake lock failed:", err);
      }
    };

    const enable = () => {
      startVideo();
      document.removeEventListener("click", enable);
      document.removeEventListener("touchstart", enable);
    };

    document.addEventListener("click", enable);
    document.addEventListener("touchstart", enable);

    return () => {
      video.pause();
    };
  }, []);

  return (
    <video ref={videoRef} playsInline muted loop className="hidden-video">
      <source
        src="data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDFtcDQxaXNvbQAAABJtZGF0AAAAAA=="
        type="video/mp4"
      />
    </video>
  );
};
export default ScreenAwake;
