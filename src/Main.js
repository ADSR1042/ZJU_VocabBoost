import React from "react";
import { Layout, PageHeader } from "antd";
import { Button, Drawer, Space } from "antd";
import { Radio } from "antd";
import { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Row,
  Col,
  Switch,
  Progress,
  Input,
  Modal,
  Alert,
} from "antd";
import data from "./newdata";
const { Content, Footer } = Layout;
const AlertShowCSS = {
  top: "570px",
  width: "50%",
  margin: "auto",
  visibility: "visible",
  position: "absolute",
};
const AlertHideCSS = {
  top: "570px",
  width: "50%",
  margin: "auto",
  visibility: "hidden",
  position: "absolute",
};
let mode = 0;
let inputanswer = " ";
let ischecked = false;
let unitnow = -1;
let wordnow = 0;
let firstletter = false;
let needclear = false; //是否需要清空输入框
let init = false;
let process = 0;
let unit = [
  {
    label: "Unit1",
    value: "0",
  },
  {
    label: "Unit2",
    value: "1",
  },
  {
    label: "Unit3",
    value: "2",
  },
  {
    label: "Unit4",
    value: "3",
  },
  {
    label: "Unit5",
    value: "4",
  },
  {
    label: "Unit6",
    value: "5",
  },
  {
    label: "Unit7",
    value: "6",
  },
  {
    label: "Unit8",
    value: "7",
  },
];
const Mode = [
  { label: "顺序模式", value: "0" },
  { label: "随机模式", value: "1" },
];
let unitable = [true, true, true, true, true, true, true, true];
//------------------checkbox------------------
const CheckChange = (checkedValues) => {
  let i = 0;
  console.log("checked = ", checkedValues);
  for (i = 0; i < 8; i++) {
    unitable[i] = false;
  }
  for (i = 0; i < checkedValues.length; i++) {
    // console.log(checkedValues[i]);
    unitable[parseInt(checkedValues[i])] = true;
  }
  console.log(unitable);
};
//------------------checkbox------------------

//------------------logic------------------
function nextunit(unitnow) {
  let i = 0;
  for (i = unitnow + 1; i < 8; i++) {
    if (unitable[i] === true) {
      return i;
    }
  }
  return 8;
}
function answercheck() {
  console.log(inputanswer);
  console.log(data[unitnow][wordnow].word);
  if (inputanswer.trim() === data[unitnow][wordnow].word) {
    return true;
  }
  return false;
}

function ProcessCalculate() {
  let i = 0;
  let process = 0;
  let aim = 0;
  // console.log(unitable);
  for (i = 0; i < 8; i++) {
    if (unitable[i] === true) {
      aim += data[i].length;
    }
  }
  for (i = 0; i < unitnow; i++) {
    if (unitable[i] === true) {
      process += data[i].length;
    }
  }
  process = process + wordnow + 1;
  return (process / aim) * 100;
}
//------------------logic------------------
function Main(props) {
  //------------------Drawer------------------
  const [Drawervisible, setVisible] = useState(true);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  //------------------Drawer------------------

  //------------------Radio------------------
  const [Radiovalue, setRadioValue] = useState("0");
  const onChangeRadio = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    if (value === "0") {
      setRadioValue(value);
      mode = value;
    } else {
      alert("咕咕咕咕");
      alert("小王已经累的不行了");
      alert("下次一定");
    }
  };
  //------------------Radio------------------

  //------------------Switch------------------
  const onChangeSwitch1 = (checked) => {
    // console.log("switch1 checked", checked);
    firstletter = checked;
    console.log("首字母检验" + firstletter);
  };

  //------------------Switch------------------

  //------------------Progress------------------
  const [Progressvalue, setProgressValue] = useState(process);
  //------------------Progress------------------
  //------------------Modal------------------
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //------------------Modal------------------

  //------------------Alert------------------
  const [AlertVisible, setAlertVisible] = useState(AlertHideCSS);
  const [AlertState, setAlertState] = useState("success");
  const [AlertMessage, setAlertMessage] = useState("回答正确");
  //------------------Alert------------------

  //------------------Input------------------
  const [searchVaule, setSearchVaule] = useState("");

  //------------------Input------------------

  //------------------other------------------
  const [cx1, setCx1] = useState("选中输入框后敲击回车开始检测");
  const [cx2, setCx2] = useState("");
  const [meaning1, setMeaning1] = useState("");
  const [meaning2, setMeaning2] = useState("");

  function logic() {
    if (mode === 0) {
      //顺序模式
      console.log("顺序模式");
      console.log("unitnow = " + unitnow);
      console.log("wordnow = " + wordnow);
      if (init === false) {
        unitnow = nextunit(unitnow);
        wordnow = 0;
        setCx1(data[unitnow][wordnow].cx1);
        setCx2(data[unitnow][wordnow].cx2);
        setMeaning1(data[unitnow][wordnow].meaning1);
        setMeaning2(data[unitnow][wordnow].meaning2);
        init = true;
        if (firstletter === true)
          setSearchVaule(data[unitnow][wordnow].word[0]);
        return;
      }
      if (
        inputanswer.trim() === "" ||
        (firstletter === true &&
          inputanswer.trim().length === 1 &&
          inputanswer.trim() === data[unitnow][wordnow].word[0])
      ) {
        console.log("不需要检查");
        //不需要检查答案
        needclear = true;
        setAlertVisible(AlertHideCSS);
        ischecked = false;
        if (wordnow === data[unitnow].length - 1) {
          wordnow = 0;
          unitnow = nextunit(unitnow);
          if (unitnow === 8) {
            showModal();
          }
        } else {
          wordnow++;
        }
      } else if (ischecked === false) {
        //需要检查答案
        console.log("需要检查答案");
        if (answercheck() === true) {
          //答案正确
          ischecked = true;
          setAlertVisible(AlertShowCSS);
          setAlertState("success");
          setAlertMessage("回答正确");
          console.log("答案正确");
          needclear = false;
        } else {
          //答案错误
          ischecked = true;
          console.log("答案错误");
          setAlertVisible(AlertShowCSS);
          setAlertState("error");
          setAlertMessage(
            <span>
              答案错误 正确答案是{" "}
              <span style={{ fontSize: "larger", fontWeight: "500" }}>
                {data[unitnow][wordnow].word}
              </span>
            </span>
          );
          needclear = false;
        }
      } else {
        console.log("已经检查过了");

        ischecked = false;
        needclear = true;
        setAlertVisible(AlertHideCSS);
        if (wordnow === data[unitnow].length - 1) {
          wordnow = 0;
          unitnow = nextunit(unitnow);
          if (unitnow === 8) {
            showModal();
          }
        } else {
          wordnow++;
        }
      }
    } else if (mode === 1) {
    }
    setCx1(data[unitnow][wordnow].cx1);
    setCx2(data[unitnow][wordnow].cx2);
    setMeaning1(data[unitnow][wordnow].meaning1);
    setMeaning2(data[unitnow][wordnow].meaning2);
    process = ProcessCalculate();
    setProgressValue(process.toFixed(1));
  }

  return (
    <div className="site-page-header-ghost-wrapper">
      <Layout className="layout">
        <PageHeader
          className="site-page-header"
          title="大英四默写器"
          subTitle="仅供学习使用 请勿用于商业用途"
          extra={[
            <Button
              type="text"
              onClick={showDrawer}
              icon={<UnorderedListOutlined size={"large"} />}
              size={"large"}
            ></Button>,
          ]}
        />
        <Modal
          title="提示"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>已经没有更多的单词啦！</p>
          <p>很不错啦 继续加油哦~</p>
          {/* <p>Some contents...</p> */}
          {/* <p>Some contents...</p> */}
        </Modal>
        <Drawer
          title="设置"
          placement="right"
          onClose={onClose}
          visible={Drawervisible}
          maskClosable={false}
          extra={
            <Space>
              <Button type="primary" onClick={onClose}>
                确定
              </Button>
            </Space>
          }
        >
          <Space direction="vertical">
            <Space size={"large"}>
              <span>模式选择</span>
              <Radio.Group
                onChange={onChangeRadio}
                value={Radiovalue}
                options={Mode}
                optionType="button"
                buttonStyle="solid"
              />
            </Space>
            <div>单元选择</div>
            <Row>
              <Col span={3}>
                <Checkbox.Group
                  options={unit}
                  defaultValue={["0", "1", "2", "3", "4", "5", "6", "7"]}
                  onChange={CheckChange}
                />
              </Col>
            </Row>

            <Space size={"large"}>
              <div>首字母显示</div>
              <Switch onChange={onChangeSwitch1} />
            </Space>
          </Space>
        </Drawer>
        <Content
          style={{
            padding: "50px 50px 50px 50px",
          }}
        >
          <div className="site-layout-content">
            <div style={{ textAlign: "left" }}>
              <h3>
                <big>
                  <b>{cx1}</b>
                </big>
              </h3>
              <h3>{meaning1}</h3>
              <h3>
                <big>
                  <b>{cx2}</b>
                </big>
              </h3>
              <h3>{meaning2}</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Input
                placeholder="type your answer here"
                size="large"
                style={{
                  width: "50%",
                  margin: "50px",
                  top: "450px",
                  position: "absolute",
                }}
                value={searchVaule}
                onPressEnter={(e) => {
                  inputanswer = e.target.value;
                  logic();
                  if (needclear === true) {
                    if (firstletter === true)
                      setSearchVaule(data[unitnow][wordnow].word[0]);
                    else setSearchVaule("");
                  }
                }}
                onChange={(e) => {
                  setSearchVaule(e.target.value);
                  console.log(inputanswer);
                }}
                autoFocus
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Alert
                message={AlertMessage}
                type={AlertState}
                style={AlertVisible}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Progress
                percent={Progressvalue}
                style={{ position: "absolute", top: "670px", width: "80%" }}
              ></Progress>
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ZJU SQTP
        </Footer>
      </Layout>
    </div>
  );
}
export default Main;
