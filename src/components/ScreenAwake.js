import React, { useEffect } from "react";

export default function ScreenWake() {
  useEffect(() => {
    let wakeLock = null;

    async function requestWakeLock() {
      if (!("wakeLock" in navigator)) {
        console.log("Screen Wake Lock API is not supported by this browser.");
        return;
      }

      try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("✅ Screen Wake Lock requested.");

        // Handle when the wake lock is released by the browser (e.g., tab switch)
        wakeLock.addEventListener("release", () => {
          console.log("⚠️ Screen Wake Lock was released by the system.");
        });
      } catch (err) {
        console.error(
          `Failed to request Wake Lock: ${err.name}, ${err.message}`
        );
      }
    }

    requestWakeLock();

    // Cleanup when unmounting
    return () => {
      if (wakeLock) {
        wakeLock.release();
        console.log("🛑 Screen Wake Lock released manually.");
      }
    };
  }, []);

  return null;
}
