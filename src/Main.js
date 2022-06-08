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
let randomrecord = [];
const Mode = [
  { label: "顺序模式", value: "0" },
  { label: "随机模式", value: "1" },
];
let unitable = [true, true, true, true, true, true, true, true];
let moderecord = 0;
let checkboxrecord = [];

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
  for (i = 0; i < 8; i++) {
    if (unitable[i] === true) {
      aim += data[i].length;
    }
  }
  if (mode === 0) {
    // console.log(unitable);
    for (i = 0; i < unitnow; i++) {
      if (unitable[i] === true) {
        process += data[i].length;
      }
    }
    process = process + wordnow + 1;
    if (aim === 0) return 0;
    return (process / aim) * 100;
  } else if (mode === 1) {
    process = randomrecord.length;
    if (aim === 0) return 0;
    return (process / aim) * 100;
  }
}

function nextrandom() {
  // let i = 0;
  //check if all words has been chosen
  let all = 0;
  let length = 0;
  for (let i = 0; i < 8; i++) {
    if (unitable[i] === true) {
      all += data[i].length;
      length += 1;
    }
  }
  if (all === randomrecord.length) {
    return { unit: 8, word: 0 };
  }
  let randomunit = Math.floor(Math.random() * length);
  while(unitable[randomunit] === false) {
    randomunit = Math.floor(Math.random() * 8);
  }
  console.log(randomunit);
  let randomword = Math.floor(Math.random() * data[randomunit].length);
  while (randomrecord.includes(randomunit + "-" + randomword)) {
    // randomunit = Math.floor(Math.random() * length);
    while(unitable[randomunit] === false) {
        randomunit = Math.floor(Math.random() * 8);
      }
    randomword = Math.floor(Math.random() * data[randomunit].length);
  }
  randomrecord.push(randomunit + "-" + randomword);
  console.log(randomrecord);
  return { unit: randomunit, word: randomword };
  //当一段代码以奇迹般的写法跑起来时
  //就别改了
  //这个随机取样烂得我都看不下去了
  //怎么会有这种写法的啊
}

//------------------logic------------------
function Main(props) {
  //------------------Drawer------------------
  const [Drawervisible, setVisible] = useState(true);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    let tmp = [];
    for (let i = 0; i < 8; i++) {
      tmp.push(unitable[i]);
      // if (unitable[i] === true) {
      //     tmp.push(i);
      // }
    }
    if (init === true) {
      if (
        mode === Number(moderecord) &&
        tmp.toString() === checkboxrecord.toString()
      ) {
        console.log(unitable);
        console.log(checkboxrecord);
        setVisible(false);
      } else {
        // setIsModalVisible2(true);
        console.log(mode === Number(moderecord));
        console.log(unitable === checkboxrecord);
        console.log(unitable);
        console.log(checkboxrecord);
        showModal2();
      }
    } else {
      setVisible(false);
    }
  };
  //------------------Drawer------------------
  //------------------CheckboxGroup------------------
  const [checkedList, setCheckedList] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]);

  const CheckChange = (checkedValues) => {
    let i = 0;
    setCheckedList(checkedValues);
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

  //------------------Radio------------------
  const [Radiovalue, setRadioValue] = useState("0");
  const onChangeRadio = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    if (value === "0") {
      setRadioValue(value);
      mode = Number(value);
    } else {
      setRadioValue(value);
      mode = Number(value);
    }
  };
  //------------------Radio------------------

  //------------------Switch------------------
  const onChangeSwitch1 = (checked) => {
    // console.log("switch1 checked", checked);
    firstletter = checked;
    console.log("首字母检验" + firstletter);
    if(firstletter === true) {
        setSearchVaule(data[unitnow][wordnow].word[0]);
    }
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
    resetall();
    setRadioValue("0");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetall();
    setRadioValue("0");
  };
  //create a new modal
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const handleOk2 = () => {
    setIsModalVisible2(false);
    let tmpmode = mode;
    let tmpunitable = JSON.parse(JSON.stringify(unitable));
    // let tmp
    resetall();
    let tmp = [];
    for (let i = 0; i < tmpunitable.length; i++) {
      if (unitable[i] === true) {
        tmp.push(String(i));
      }
    }
    setCheckedList(tmp);
    setRadioValue(String(tmpmode));
    setVisible(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
    let tmp = [];
    console.log("撤销操作");
    mode = Number(moderecord);
    unitable = JSON.parse(JSON.stringify(checkboxrecord));
    for (let i = 0; i < unitable.length; i++) {
      if (unitable[i] === true) {
        tmp.push(String(i));
      }
    }
    setRadioValue(String(moderecord));
    setCheckedList(tmp);
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
    //   console.log("logic");
    console.log("主逻辑判断");
    let tmp = {};
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
        checkboxrecord = JSON.parse(JSON.stringify(unitable));
        moderecord = mode;
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
      //随机模式
      console.log("随机模式");
      if (init === false) {
        tmp = nextrandom();
        unitnow = tmp.unit;
        wordnow = tmp.word;
        setCx1(data[unitnow][wordnow].cx1);
        setCx2(data[unitnow][wordnow].cx2);
        setMeaning1(data[unitnow][wordnow].meaning1);
        setMeaning2(data[unitnow][wordnow].meaning2);
        init = true;
        // checkboxrecord = unitable;
        // checkboxrecord = unitable;
        checkboxrecord = JSON.parse(JSON.stringify(unitable));
        moderecord = mode;
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
        tmp = nextrandom();
        unitnow = tmp.unit;
        wordnow = tmp.word;
        if (unitnow === 8) {
          showModal();
        }
        //todo
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
        tmp = nextrandom();
        unitnow = tmp.unit;
        wordnow = tmp.word;
        if (unitnow === 8) {
          showModal();
        }
      }
    }
    setCx1(data[unitnow][wordnow].cx1);
    setCx2(data[unitnow][wordnow].cx2);
    setMeaning1(data[unitnow][wordnow].meaning1);
    setMeaning2(data[unitnow][wordnow].meaning2);
    process = ProcessCalculate();
    setProgressValue(process.toFixed(1));
  }
  function resetall() {
    let tmp = [];
    unitnow = -1;
    wordnow = 0;
    // firstletter = false;
    needclear = false;
    inputanswer = " ";
    ischecked = false;
    randomrecord = [];
    init = false;
    for (let i = 0; i < unitable.length; i++) {
      if (unitable[i] === true) {
        tmp.push(String(i));
      }
    }
    // checkboxrecord = tmp;
    checkboxrecord = JSON.parse(JSON.stringify(tmp));
    setRadioValue(0);
    setAlertVisible(AlertHideCSS);
    setAlertState("success");
    setAlertMessage("");
    setCx1("选中输入框后按下回车进行检测");
    setCx2("");
    setMeaning1("");
    setMeaning2("");
    setProgressValue("0");
    setSearchVaule("");
    showDrawer();
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
          cancelText="取消"
          okText="确定"
        >
          <p>已经没有更多的单词啦！</p>
          <p>很不错啦 继续加油哦~</p>
          <p>点击确定或取消都会重新开始检测</p>
          {/* <p>Some contents...</p> */}
        </Modal>
        <Modal
          title="警告"
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          cancelText="取消"
          okText="确定"
        >
          <p>您现在正在检测中</p>
          <p>在检测的过程中切换单元将会重置进度</p>
          <p>按确定重置进度并切换单元</p>
          <p>按取消撤销操作</p>
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
                  value={checkedList}
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
                  top: "500px",
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
          {/* <p></p> */}
        </Footer>
      </Layout>
    </div>
  );
}
export default Main;
