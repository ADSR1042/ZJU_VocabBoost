import { Tooltip } from "antd";

export const Contactme = () => {
  return (
    <div
    // style={{
    //   position: "absolute",
    //   bottom: "3%",
    // }}
    >
      <br />
      <span>有问题/bug反馈?</span>
      <a href="mailto:ADSR1042@gmail.com" type="email">
        联系作者
      </a>
      <div>
        Special Thanks to{" "}
        <Tooltip placement="topLeft" title={"提供了词库"}>
          <span style={{ cursor: "pointer" }}>非牛顿流体</span>
        </Tooltip>{" "}
        &{" "}
        <Tooltip placement="top" title={"为词库添加四六级标签"}>
          <span style={{ cursor: "pointer" }}> BymE </span>
        </Tooltip>{" "}
        &{" "}
        <Tooltip
          placement="topRight"
          title={"提供了备案域名与服务器"}
          style={{ cursor: "pointer" }}
        >
          <span style={{ cursor: "pointer" }}>E志者协会</span>
        </Tooltip>
      </div>
    </div>
  );
};
