import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout, Button, Input, Alert, Modal, message, PageHeader } from "antd";
// import { PageHeader } from "@ant-design/pro-layout";
import { UnorderedListOutlined, SaveOutlined ,GithubOutlined} from "@ant-design/icons";
import { Interface } from "./Interface";
import { Setting } from "./Setting";
import { FloatButton } from "./FloatButton";
import { Progressline } from "./Progressline";
import { TagMatch, getUnitLength, getWord, loadData } from "./utils/data";
// import History from "./History";
const { Content, Footer } = Layout;
const defaultsettings = {
  book: "0",
  mode: "0",
  showPronounce: false,
  showFirstLetter: false,
  showButton: true,
  units: [true, true, true, true, true, true, true, true],
  tag: "default",
  autoSave: false,
};
const AlertShowCSS = {
  top: "530px",
  width: "50%",
  margin: "auto",
  visibility: "visible",
  position: "absolute",
};
const AlertHideCSS = {
  top: "450px",
  width: "50%",
  margin: "auto",
  visibility: "hidden",
  position: "absolute",
};
const defaultIput = { target: { value: "" } };

const App = () => {
  // let book = [];
  const [check, setCheck] = useState(false);
  const [list, setList] = useState([
    { unit: 0, lesson: 0 },
    { unit: 0, lesson: 0 },
  ]);
  const [current, setCurrent] = useState(0);
  const [settings, setSettings] = useState(defaultsettings);
  const [showSettings, setShowSettings] = useState(true);
  const [inital, setInital] = useState(true);
  const [alertState, setAlertState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const initalization = () => {
    // console.log("initalization now!");
    // console.log(settings);
    setInital(false);
    setCheck(false);
    setList([]);
    setAlertVisible(false);
    let temp = [];
    switch (settings.mode) {
      //顺序模式
      case "0":
        //根据设置中的单元选择初始化索引list
        //计时
        console.time("init");
        for (let i = 0; i < 8; i++) {
          if (settings.units[i]) {
            for (let j = 0; j < getUnitLength(settings.book * 1, i); j++) {
              //
              if (TagMatch(settings.book * 1, i, j, settings.tag))
                temp.push({ unit: i, lesson: j });
            }
          }
        }
        //结束计时
        console.timeEnd("init");
        setList(temp);
        //返回初始化索引list
        return temp;
      //随机模式
      case "1":
        //根据设置中的单元选择初始化索引list
        for (let i = 0; i < 8; i++) {
          if (settings.units[i]) {
            for (let j = 0; j < getUnitLength(settings.book * 1, i); j++) {
              if (TagMatch(settings.book * 1, i, j, settings.tag))
                temp.push({ unit: i, lesson: j });
            }
          }
        }
        //打乱list
        for (let i = temp.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [temp[i], temp[j]] = [temp[j], temp[i]];
        }
        //返回初始化索引list
        setList(temp);
        return temp;
      default:
        console.error("模式错误:未知的模式");
        break;
    }
  };
  const showFirstLetterfunc = (initlist, trueIndex) => {
    //shit code here need modify in the future
    let temp = current === list.length - 1 ? current : current + 1;
    if (trueIndex !== undefined) temp = trueIndex;
    if (initlist !== undefined && settings.showFirstLetter) {
      //为了防止setState异步导致list未更新
      setInputValue(
        getWord(settings.book * 1, list[temp].unit, list[temp].lesson).word[0]
      );
      return;
    }
    if (settings.showFirstLetter)
      setInputValue(
        getWord(settings.book * 1, list[temp].unit, list[temp].lesson).word[0]
      );
    else setInputValue("");
  };
  const handlePressEnter = (e) => {
    // console.log("settings when PressEnter", settings);
    let answer = " ";
    let temp = [];
    if (e !== undefined) answer = e.target.value;
    if (inital) {
      temp = initalization();
      setCurrent(0);
      showFirstLetterfunc(temp, 0);
      return;
    }
    // console.log("current", current);
    // console.log(list[current]);
    if (check) {
      setAlertVisible(false);
      setCheck(false);
      next();
      showFirstLetterfunc();
    } else if (
      answer === undefined ||
      (answer.length === 1 && settings.showFirstLetter === true) ||
      answer.length === 0
    ) {
      next();
      showFirstLetterfunc();
    } else {
      let key = getWord(
        settings.book * 1,
        list[current].unit,
        list[current].lesson
      ).word;
      if (answerCheck(answer, key)) {
        setAlertState("success");
        setAlertMessage("Correct!");
        setAlertVisible(true);
      } else {
        setAlertState("error");
        setAlertMessage(
          <>
            Wrong! The answer is&nbsp;
            <span style={{ display: "inline", fontSize: "1.1rem" }}>
              <b>{key}</b>
            </span>
          </>
        );
        setAlertVisible(true);
        updateHistory(
          getWord(settings.book * 1, list[current].unit, list[current].lesson)
        );
      }
      setCheck(true);
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
    } else {
      Modal.success({
        title: "完成!",
        content: (
          <>
            <div>你已经完成选定的所有检测!</div>
            <div>按下确认建重新检测</div>
          </>
        ),
        onOk: () => {
          setInputValue("");
          setInital(true);
          setCurrent(0);
          setShowSettings(true);
        },
      });
    }
    if (settings.autoSave) save();
  };
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setAlertVisible(false);
    } else {
      message.error("前面已经没有单词啦");
      return;
    }
    showFirstLetterfunc(undefined, current - 1);
    if (settings.autoSave) save();
  };
  const updateHistory = (newdata) => {
    let temp = history;
    temp.push(newdata);
    setHistory(temp);
  };
  const save = () => {
    //save all
    //构造数据
    if (inital === true) {
      message.error("请先开始检测");
      return false;
    }
    let savedata = {
      setting: settings,
      list: list,
      current: current,
    };
    //保存数据
    localStorage.setItem("savedata", JSON.stringify(savedata));
    return true;
  };


  //listen when showSettings change
  useEffect(() => {
    if (!isDataReady) {
      // console.log("load data");
      message.loading("正在加载数据", 0);
      loadData().then((data) => {
        message.destroy();
        setIsDataReady(true);
        //数据加载失败也会报 success 之后修
        message.success("数据加载完成");
      });
    }
    if (showSettings === false && inital === true) setInputValue(""); //用于清除 更改设置之后的输入框内容
  }, [showSettings,isDataReady,inital]);

  //listen when settings.showFirstLetter change
  // useEffect(() => {
  //   if(settings.showFirstLetter === true) setInputValue();
  // }, [settings.showFirstLetter]);
  return (
    <div className="App">
      <div className="site-page-header-ghost-wrapper">
        <Layout className="layout">
          <PageHeader
            key={"header"}
            className="site-page-header"
            title="大英默写器"
            subTitle="仅供学习 请勿商用"
            extra={[
              <div key="extra">
                <Button
                  type="text"
                  key="save"
                  onClick={() => {
                    if (save()) {
                      message.success("保存成功");
                    }
                  }}
                  icon={<SaveOutlined size="large" />}
                  size={"large"}
                ></Button>
                <Button
                  type="text"
                  key="setting"
                  onClick={() => {
                    setShowSettings(true);
                  }}
                  icon={<UnorderedListOutlined size={"large"} />}
                  size={"large"}
                ></Button>
              </div>,
            ]}
          />
          <Setting
            key={settings}
            inital={inital}
            setInital={setInital}
            settings={settings}
            setSettings={(value) => {
              setSettings(value);
            }}
            setList={setList}
            setCurrent={setCurrent}
            showDrawer={showSettings}
            showDrawerfunc={setShowSettings}
          />
          <Content
            style={{
              padding: "50px 50px 6px 50px",
            }}
          >
            <div className="site-layout-content">
              <Interface
                inital={inital}
                showPronounce={settings.showPronounce}
                data={getWord(
                  settings.book * 1,
                  list[current].unit,
                  list[current].lesson
                )}
                book={settings.book}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Input
                  placeholder="type your answer here"
                  size="large"
                  style={{
                    width: "50%",
                    top: "480px",
                    position: "absolute",
                  }}
                  disabled={showSettings}
                  value={inputValue}
                  onPressEnter={handlePressEnter}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    switch (e.key) {
                      case "ArrowUp":
                        if (inital === false) prev();
                        break;
                      case "ArrowDown":
                        handlePressEnter(defaultIput);
                        break;
                      case "Control":
                        let player = document.getElementById("audio_player");
                        if (player !== null) player.click();
                        break;
                      default:
                        break;
                    }
                  }}
                  autoFocus
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Alert
                  message={alertMessage}
                  type={alertState}
                  style={
                    inital
                      ? AlertHideCSS
                      : alertVisible
                      ? AlertShowCSS
                      : AlertHideCSS
                  }
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={prev}
                  size="large"
                  disabled={current === 0 || inital === true}
                  style={{
                    position: "absolute",
                    top: "590px",
                    left: window.innerWidth < 600 ? "30%" : "35%",
                    marginRight: "25%",
                    display: settings.showButton ? null : "none",
                  }}
                >
                  pre&nbsp;
                </Button>
                <Button
                  onClick={() => handlePressEnter(defaultIput)}
                  size="large"
                  disabled={current === list.length - 1}
                  style={{
                    position: "absolute",
                    top: "590px",
                    left: window.innerWidth < 600 ? "30%" : "35%",
                    marginLeft: "25%",
                    display: settings.showButton ? null : "none",
                  }}
                >
                  next
                </Button>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Progressline
                  key={current}
                  current={inital ? 0 : current}
                  total={list.length - 1}
                />
              </div>
            </div>
          </Content>
          <FloatButton data={history} setHistory={setHistory} />
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            <div style={{cursor:"pointer"}} onClick={()=>{
              save();
              window.open("https://github.com/ADSR1042/ZJU_VocabBoost")
            }}>
              <GithubOutlined />
            </div>
            ZJU EVA
            <div
              style={{
                fontStyle: "italic",
                textDecoration: "underline",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                save();
                window.open("https://mp.weixin.qq.com/s/H9DP3wERAAVlskDohom0xg");
              }}
            >
              🔥浙江大学学生E志者协会火热纳新中!
            </div>
          </Footer>
        </Layout>
      </div>
    </div>
  );
};

export default App;
