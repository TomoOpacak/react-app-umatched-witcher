import React, { useEffect, useState, useRef } from "react";

export default function WakeLockButton() {
  const [isSupported, setIsSupported] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const wakeLockRef = useRef(null);

  useEffect(() => {
    // Check browser support once on mount
    setIsSupported("wakeLock" in navigator);
  }, []);

  // Re-request wake lock if page becomes visible again
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && isActive) {
        await requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive]);

  // Request wake lock
  const requestWakeLock = async () => {
    try {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
      console.log("✅ Screen Wake Lock active");
      wakeLockRef.current.addEventListener("release", () => {
        console.log("⚠️ Screen Wake Lock released");
        setIsActive(false);
      });
      setIsActive(true);
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  // Release wake lock
  const releaseWakeLock = async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log("🛑 Screen Wake Lock released manually");
        setIsActive(false);
      }
    } catch (err) {
      console.error("Error releasing wake lock:", err);
    }
  };

  // Toggle button
  const toggleWakeLock = async () => {
    if (!isActive) {
      await requestWakeLock();
    } else {
      await releaseWakeLock();
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4 rounded-xl bg-red-100 text-red-600 text-center">
        ⚠️ Your browser doesn’t support the Screen Wake Lock API.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <button
        onClick={toggleWakeLock}
        className={`px-6 py-3 rounded-2xl font-semibold shadow-md transition 
          ${
            isActive
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        {isActive
          ? "🟢 Wake Lock Active — Tap to Release"
          : "🟡 Activate Screen Wake Lock"}
      </button>

      <p className="mt-4 text-gray-500 text-sm">
        Keeps your screen awake while this page is open.
      </p>
    </div>
  );
}
