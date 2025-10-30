import React, { useEffect, useRef } from "react";
const ScreenAwake = () => {
  useEffect(() => {
    let wakeLock = null;

    // Request the wake lock
    const requestWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("🔋 Screen Wake Lock active");

        // Listen for when the wake lock is released
        wakeLock.addEventListener("release", () => {
          console.log("⚠️ Screen Wake Lock released");
        });
      } catch (err) {
        console.error("Wake Lock request failed:", err);
      }
    };

    // Handle visibility changes (e.g., user switches tabs or locks screen)
    const handleVisibilityChange = async () => {
      if (wakeLock !== null && document.visibilityState === "visible") {
        try {
          wakeLock = await navigator.wakeLock.request("screen");
          console.log("🔄 Wake Lock re-acquired after visibility change");
        } catch (err) {
          console.error("Failed to re-acquire Wake Lock:", err);
        }
      }
    };

    // Request Wake Lock after user interaction
    const enableWakeLock = () => {
      requestWakeLock();
      document.removeEventListener("click", enableWakeLock);
      document.removeEventListener("touchstart", enableWakeLock);
    };

    document.addEventListener("click", enableWakeLock);
    document.addEventListener("touchstart", enableWakeLock);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", enableWakeLock);
      document.removeEventListener("touchstart", enableWakeLock);

      if (wakeLock) {
        wakeLock.release().then(() => {
          console.log("🛑 Wake Lock released on cleanup");
        });
      }
    };
  }, []);

  return null;
};
export default ScreenAwake;
