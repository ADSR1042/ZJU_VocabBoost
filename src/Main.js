import React from "react";
import { Layout, PageHeader } from "antd";
import { Button, Drawer, Space } from "antd";
import { Radio } from "antd";
import { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Checkbox, Row, Col, Switch, Progress, Input, Modal } from "antd";
import data from "./newdata";
const { Content, Footer } = Layout;
let mode = 0;
let answertoshow = "123";
let cx1 = " ";
let meaning1 = " ";
let meaning2 = " ";
let answer = " ";
let isrunning = false;
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
function logic() {}
function GetUnit() {}
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
    setRadioValue(value);
  };
  //------------------Radio------------------

  //------------------Switch------------------
  const [Switchvalue1, setSwitchValue1] = useState(true);
  const onChangeSwitch1 = (checked) => {
    console.log("switch1 checked", checked);
    setSwitchValue1(!checked);
    console.log(Switchvalue1);
  };
  const [Switchvalue2, setSwitchValue2] = useState(true);
  const onChangeSwitch2 = (checked) => {
    console.log("switch2 checked", checked);
    setSwitchValue2(!checked);
    console.log(Switchvalue2);
  };
  //------------------Switch------------------

  //------------------Progress------------------
  const [Progressvalue, setProgressValue] = useState(10);
  //------------------Progress------------------
  //------------------Modal------------------
  const [isModalVisible, setIsModalVisible] = useState(true);

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
  return (
    <div className="site-page-header-ghost-wrapper">
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
              <Switch defaultChecked onChange={onChangeSwitch1} />
            </Space>

            <Space size={"large"}>
              <div>进度条显示</div>
              <Switch defaultChecked onChange={onChangeSwitch2} />
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
              <div>{data[1][1].word}</div>
              <h3>
                <big>
                  <b>{cx1}</b>
                </big>
              </h3>
              <h3>{meaning1}</h3>
              <h3>{meaning2}</h3>
              <h2>{answertoshow}</h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Input
                placeholder="type your answer here"
                size="large"
                style={{ width: "500px", margin: "50px" }}
                onPressEnter={(e) => {
                  console.log(e);
                  e.target.value = "";
                //   showModal();
                }}
                onChange={(e) => {
                  answer = e.target.value;
                  console.log(answer);
                }}
                autoFocus
              />
            </div>

            <Progress
              percent={Progressvalue}
              style={{ position: "sticky", top: "740px" }}
            ></Progress>
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
