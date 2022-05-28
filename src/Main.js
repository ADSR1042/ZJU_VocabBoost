import React from "react";
import { Layout, PageHeader } from "antd";
import { Button, Drawer, Space } from "antd";
import { Radio } from "antd";
import { useState } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Checkbox, Row, Col, Switch, Progress } from "antd";
const { Content, Footer } = Layout;
let unit = [
  {
    label: "Unit1",
    value: "Unit1",
  },
  {
    label: "Unit2",
    value: "Unit2",
  },
  {
    label: "Unit3",
    value: "Unit3",
  },
  {
    label: "Unit4",
    value: "Unit4",
  },
  {
    label: "Unit5",
    value: "Unit5",
  },
  {
    label: "Unit6",
    value: "Unit6",
  },
  {
    label: "Unit7",
    value: "Unit7",
  },
  {
    label: "Unit8",
    value: "Unit8",
  },
];
const mode = [
  { label: "顺序模式", value: "0" },
  { label: "随机模式", value: "1" },
];
//------------------checkbox------------------
const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};
//------------------checkbox------------------

function Main(props) {
  //------------------Drawer------------------
  const [Drawervisible, setVisible] = useState(false);
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
        <Drawer
          title="设置"
          placement="right"
          onClose={onClose}
          visible={Drawervisible}
          maskClosable={false}
          extra={
            <Space>
              <Button onClick={onClose}>取消</Button>
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
                options={mode}
                optionType="button"
                buttonStyle="solid"
              />
            </Space>
            <div>单元选择</div>
            <Row>
              <Col span={3}>
                <Checkbox.Group
                  options={unit}
                  defaultValue={[
                    "Unit1",
                    "Unit2",
                    "Unit3",
                    "Unit4",
                    "Unit5",
                    "Unit6",
                    "Unit7",
                    "Unit8",
                  ]}
                  onChange={onChange}
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
            <div style={{textAlign : "left"}}>
                <div>这里有内容</div>
                <div>这里还有内容</div>
                <div>这里还是有内容</div>
                <div>这里居然还有内容</div>
                <div>这里真的有内容吗</div>
                <div>这里好像有一点内容</div>
            </div>
              <Progress percent={Progressvalue} style = {{position:"relative",bottom :"-380px"}}></Progress>
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
