import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Main from "./Main";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    {console.log("%c祝你满绩每一天!", "font-size: 32px; font-weight: bold;")}
    {console.log("有问题/bug反馈? 联系作者 ADSR1042@gmail.com")}
    {console.log("Author: ADSR")}
    {console.log("deployed by")}
    {console.log(`
  _____       __   __  __    ______ _    __    ___ 
 /__  /      / /  / / / /   / ____/| |  / /   /   |
   / /  __  / /  / / / /   / __/   | | / /   / /| |
  / /__/ /_/ /  / /_/ /   / /___   | |/ /   / ___ |
 /____/\\____/   \\____/   /_____/   |___/   /_/  |_|
                                                   
 `)}
    <Main />
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
