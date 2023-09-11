import React from "react";
import "./FloatButton.css";
import Record from "./Record";
export const FloatButton = (props) => {
  return (
    <div className="FloatButton">
      <Record key="record" data={props.data} setHistory={props.setHistory} />
    </div>
  );
};
