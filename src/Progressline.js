import React from "react";
import { Progress } from "antd";
export const Progressline = (props) => {
    let percent = props.current/props.total*100;
  return (
    <Progress
      percent={percent.toFixed(2)}
      style={{ position: "absolute", top: "670px", width: "80%" }}
    ></Progress>
  );
};
