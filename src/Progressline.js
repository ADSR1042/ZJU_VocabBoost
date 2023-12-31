import React from "react";
import { Progress } from "antd";
export const Progressline = (props) => {
    let percent = props.current/props.total*100;
  return (
    <Progress
      percent={percent===0?0.0:percent.toFixed(1)}
      style={{ position: "absolute", top: "650px", width:window.innerWidth<500? "60%":"80%" }}
    ></Progress>
  );
};
