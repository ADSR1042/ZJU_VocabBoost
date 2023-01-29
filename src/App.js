import React, { useState } from "react";
import "./App.css";
import { Layout, PageHeader, Button, Input, Alert } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Interface } from "./Interface";
import book1 from "./data/book1";
import book2 from "./data/book2";
import book3 from "./data/book3";
import { Setting } from "./Setting";
import { Progressline } from "./Progressline";
const { Content, Footer } = Layout;
const defaultsettings = {
  book: "0",
  mode: "0",
  showPronounce: false,
  showFirstLetter: false,
  units: [true, true, true, true, true, true, true, true],
};
const App = () => {
  let book = book1;
  let check = false;
  const [list, setList] = useState([{ unit: 1, lesson: 1 }]);
  const [current, setCurrent] = useState(0);
  const [settings, setSettings] = useState(defaultsettings);
  const [showSettings, setShowSettings] = useState(true);
  const [inital, setInital] = useState(true);
  const [alertState, setAlertState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);
  const initalization = () => {
    console.log("initalization now!");
    console.log(settings);
    setInital(false);
    setCurrent(0);
    check = false;
    switch (settings.book) {
      case "0":
        book = book1;
        break;
      case "1":
        book = book2;
        break;
      case "2":
        book = book3;
        break;
      default:
        book = book1;
    }
    setList([]);
    let temp = [];
    switch (settings.mode) {
      case "0":
        for (let i = 0; i < 8; i++) {
          if (settings.units[i]) {
            for (let j = 0; j < book[i][0].children.length; j++) {
              temp.push({ unit: i, lesson: j });
            }
          }
        }
        setList(temp);
        break;
      case "1":
        for (let i = 0; i < 8; i++) {
          if (settings.units[i]) {
            for (let j = 0; j < book[i][0].children.length; j++) {
              temp.push({ unit: i, lesson: j });
            }
          }
        }
        console.log(temp);
        for (let i = temp.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [temp[i], temp[j]] = [temp[j], temp[i]];
        }
        console.log(temp);
        setList(temp);
    }
  };
  const answerCheck = (answer, key) => {
    if (answer.trim() === key.trim()) {
      return true;
    } else return false;
  };
  const next = () => {
    if (current < list.length - 1) {
      setCurrent(current + 1);
    }
  };
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  // if (inital) initalization();

  return (
    <div className="App">
      <div className="site-page-header-ghost-wrapper">
        <Layout className="layout">
          <PageHeader
            className="site-page-header"
            title="大英四默写器"
            subTitle="仅供学习使用 请勿用于商业用途"
            extra={[
              <Button
                type="text"
                key="setting"
                onClick={() => {
                  setShowSettings(true);
                }}
                icon={<UnorderedListOutlined size={"large"} />}
                size={"large"}
              ></Button>,
            ]}
          />
          <Setting
            inital={inital}
            initalization={initalization}
            settings={settings}
            setSettings={(value) => {
              console.log(value);
              setSettings(value);
              console.log(settings);
            }}
            showDrawer={showSettings}
            showDrawerfunc={setShowSettings}
          />
          <Content
            style={{
              padding: "50px 50px 50px 50px",
            }}
          >
            <div className="site-layout-content">
              <Interface
                inital={inital}
                showPronounce={settings.showPronounce}
                partOfSpeech={
                  inital
                    ? "无:"
                    : book[list[current].unit][0].children[list[current].lesson]
                        .pee[0].partOfSpeech
                }
                explanations_and_examples={
                  inital
                    ? []
                    : book[list[current].unit][0].children[list[current].lesson]
                        .pee[0].explanations_and_examples
                }
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Input
                  placeholder="type your answer here"
                  size="large"
                  style={{
                    width: "50%",
                    top: "500px",
                    position: "absolute",
                  }}
                  onPressEnter={(e) => {
                    let answer = e.target.value;
                    next();
                    console.log(current);
                    console.log(
                      book[list[current].unit][0].children[list[current].lesson]
                        .word
                    );
                    if (check) {
                      next();
                    } else if (
                      answer.length === 1 &&
                      settings.showFirstLetter === true
                    ) {
                      next();
                    } else {
                      next();
                    }
                  }}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  autoFocus
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Alert
                  message={alertMessage}
                  type={alertState}
                  style={alertVisible}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Progressline current={current} total={list.length} />
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
    </div>
  );
};

export default App;
