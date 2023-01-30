import {
  Button,
  Divider,
  Popover,
  Space,
  Switch,
  Empty,
  Modal,
  message,
  Tooltip,
} from "antd";
import { FileTextOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const ContentModal = (props) => {
  return (
    <div key={props.word + "-1"}>
      <b key={props.word}>{props.word}</b>
      <div key={props.index + "partOfSpeech"}>
        &nbsp;{props[0].partOfSpeech}
      </div>
      {props[0].explanations_and_examples.map((item, index) => (
        <div key={props.word + index} style={{ margin: "0.5em" }}>
          <div key={props.word + index + "explanation"}>{item.explanation}</div>
          <span key={props.word + index + "eg"} style={{ color: "#2187e0" }}>
            {item.example === undefined
              ? null
              : props.showExample
              ? "e.g. "
              : null}
          </span>
          <em key={props.word + index + "example"}>
            {props.showExample ? item.example : null}
          </em>
        </div>
      ))}
      <Divider key={props.word + "Divider"} />
    </div>
  );
};

const Content = (props) => {
  const [showExample, setShowExample] = useState(true);
  const saveStorage = (value) => {
    if (value.length !== 0) {
      localStorage.setItem("history", JSON.stringify(value));
    }
  };
  const clearStorage = () => {
    Modal.confirm({
      title: "提示",
      zIndex: 2000,
      content: <>你即将清除本地错题缓存，确定要继续吗</>,
      onOk: () => {
        localStorage.setItem("history", JSON.stringify([]));
        props.setHistory([]);
        message.success("清除成功");
      },
      onCancel: () => {},
    });
    localStorage.setItem("history", "");
  };
  const loadStorage = () => {
    if (
      localStorage.getItem("history") === null ||
      localStorage.getItem("history").length === 2 ||
      localStorage.getItem("history") === ""
    ) {
      message.error("本地缓存为空");
    } else {
      Modal.confirm({
        title: "提示",
        zIndex: 2000,
        content: <>读取缓存后会清楚当前错题记录，确定要继续吗</>,
        onOk: () => {
          console.log(localStorage.getItem("history"));
          props.setHistory(JSON.parse(localStorage.getItem("history")));
          message.success("读取成功");
        },
        onCancel: () => {},
      });
    }
  };
  return (
    <div style={{ top: "50px" }}>
      <div style={{ maxHeight: window.innerHeight * 0.75, overflowY: "auto" }}>
        {props.data.length !== 0 ? (
          props.data.map((item, index) => (
            <ContentModal
              index={index}
              key={index}
              word={item.word}
              showExample={showExample || false}
              {...item.pee}
            />
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>

      <div style={{ position: "sticky", bottom: "10px" }}>
        <Divider />
        <span>展示例句&nbsp;&nbsp;</span>
        <Switch
          defaultChecked={true}
          onChange={(value) => {
            setShowExample(value);
          }}
        />
        <span>&nbsp;&nbsp;</span>
        <span>
          {/* <Button type="primary" style={{"margin":"0px 5px"}} disabled={true}>导出记录</Button> */}
          <Button
            onClick={saveStorage(props.data)}
            style={{ margin: "0px 5px" }}
          >
            缓存错题
          </Button>
          <Button onClick={loadStorage} style={{ margin: "0px 5px" }}>
            读取缓存
          </Button>
          <Button onClick={clearStorage} style={{ margin: "0px 5px" }}>
            清空缓存
          </Button>
          <Tooltip
            title="本地缓存仅储存于该浏览器本地 不含云端同步功能"
            placement="right"
            zIndex={3000}
          >
            <Button type="link" icon={<QuestionCircleOutlined />}></Button>
          </Tooltip>
        </span>
      </div>
    </div>
  );
};
const Record = (props) => {
  return (
    <Space wrap>
      <Popover
        content={
          <Content data={props.data || null} setHistory={props.setHistory} />
        }
        title="错题本"
        trigger="click"
        overlayStyle={{
          maxWidth: window.innerWidth * 0.8,
          minWidth: window.innerWidth * 0.8,
        }}
        placement="bottomLeft"
      >
        <Button type="text" icon={<FileTextOutlined />}></Button>
      </Popover>
    </Space>
  );
};
export default Record;
