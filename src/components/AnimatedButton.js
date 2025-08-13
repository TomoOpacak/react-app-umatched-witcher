import React, { useRef, useEffect } from "react";
import beatSound from "../assets/sounds/click.mp3";

const AnimatedButton = ({
  onClick,
  className = "",
  children,
  style = {},
  sound = beatSound,
  ...props
}) => {
  const btnRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Preload the audio once
    const audio = new Audio(sound);
    audio.preload = "auto";
    audioRef.current = audio;
  }, [sound]);

  const handleClick = (e) => {
    const btn = btnRef.current;

    // Animation logic
    if (btn) {
      btn.classList.remove("clicked");
      void btn.offsetWidth;
      btn.classList.add("clicked");

      setTimeout(() => {
        btn?.classList.remove("clicked");
      }, 125);
    }

    // Reuse and reset audio for quick playback
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Restart from beginning
      audioRef.current.play().catch((err) => {
        console.warn("Sound playback failed:", err);
      });
    }

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      className={`${className} clicked-transition`}
      onClick={handleClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
