import React, { useState, useEffect } from "react";
import { NotificationOutlined } from "@ant-design/icons";

export const AudioPlayer = ({ src }) => {
  const [audio] = useState(new Audio());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 预加载音频
    audio.src = src;
    audio.load();
    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    // 在组件卸载时清除事件监听和音频对象
    return () => {
      audio.removeEventListener("canplaythrough", () => {
        setIsLoaded(true);
      });
      audio.pause();
      audio.src = "";
      audio.load();
    };
  }, [src]);

  const play = () => {
    if (isLoaded) {
      audio.play().catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <NotificationOutlined
      style={{ fontSize: "16px", color: "#08c", cursor: "pointer" }}
      onClick={play}
      id="audio_player"
    />
  );
};
