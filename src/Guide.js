import { Button, Modal } from "antd";
import React from "react";
export const GuideUser = () => {
  const guideModal = () => {
    Modal.info({
      title: "如何使用",
      width: 500,
      content: (
        <>
          <div>在设置页面选择需要测试的书以及单元，单击确认开始检测</div>
          <div>选中输入框按下回车进行检测</div>
          <div>你也可以通过单击pre/next两个按钮来切换单词</div>
          <div>需要注意的是 pre/next按钮并不会校验输入正确与否</div>
          <div>建议使用输入框纯键盘操作 在需要时鼠标操作按钮</div>
        </>
      ),
      onOk() {},
    });
  }
    return (
      <>
        <Button onClick={guideModal}>使用指南</Button>
      </>
    );
  };
