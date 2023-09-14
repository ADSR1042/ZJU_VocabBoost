import { Button, Modal } from "antd";
import React from "react";
export const GuideUser = () => {
  const guideModal = () => {
    Modal.info({
      title: "如何使用",
      width:
        window.innerWidth < 600 ? window.innerWidth : window.innerWidth * 0.6,
      content: (
        <>
          <div>
            点击页面上方右侧按钮可打开设置页面，在设置页面选择需要测试的书、单元以及模式，单击确认开始检测。在检测的过程中更改书、单元、模式设置将会重置检测进度。
          </div>
          <br/>
          <div>
            在检测过程中需要选中输入框输入您的答案，按下回车可进行校验。对于已经掌握的单词。您可以不输入任何内容直接按下回车跳过
            如果想要返回之前/跳跃之后的单词，您可以按下方向键↑与↓，对于移动端的用户，您可以使用pre/next两个按钮来切换单词。需要注意的是，使用此种方式切换单词并不会触发答案检查。
          </div>
          <br/>
          <div>
            输入框内可以按下'Alt'键快捷发音
          </div>
          <br></br>
          <div>
            点击页面右上角按钮可打开错题本，这里记录了您之前回答错误的单词。我们提供了缓存功能，您可以把本次的错题缓存至浏览器。在下次使用前加载错题缓存即可看到之前的错题。错题缓存只要您不清除浏览器缓存即可较长时间保存，但由于仅存在您的浏览器内无法云端同步。
          </div>
        </>
      ),
      onOk() {},
    });
  };
  return (
    <>
      <Button onClick={guideModal}>使用指南</Button>
    </>
  );
};
