import React, { useState } from "react";
import { NotificationOutlined } from "@ant-design/icons";

export const AudioPlayer = ({ src }) => {
  const [audio, setAudio] = useState(null);

  const play = () => {
    if (!audio||audio.src !== src) {
      const newAudio = new Audio(src);
      newAudio.play().catch((err) => {
        console.log(err);
      });
      setAudio(newAudio);
    } else {
      audio.play().catch((err) => {
        // console.log(err);
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
