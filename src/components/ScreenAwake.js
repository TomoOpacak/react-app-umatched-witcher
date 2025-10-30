import { useEffect, useRef } from "react";

export function useWakeLock() {
  const wakeLockRef = useRef(null);

  useEffect(() => {
    let isSupported = "wakeLock" in navigator;
    let handleVisibilityChange;

    async function requestWakeLock() {
      try {
        if (isSupported) {
          wakeLockRef.current = await navigator.wakeLock.request("screen");
          console.log("Wake Lock is active");

          // Automatically re-request if the tab becomes visible again
          handleVisibilityChange = async () => {
            if (
              wakeLockRef.current !== null &&
              document.visibilityState === "visible"
            ) {
              wakeLockRef.current = await navigator.wakeLock.request("screen");
              console.log("Wake Lock re-acquired");
            }
          };

          document.addEventListener("visibilitychange", handleVisibilityChange);
        } else {
          console.warn("Wake Lock API not supported on this device.");
        }
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }

    requestWakeLock();

    return () => {
      // Clean up on unmount
      if (wakeLockRef.current) {
        wakeLockRef.current.release().then(() => {
          console.log("Wake Lock released");
          wakeLockRef.current = null;
        });
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}
