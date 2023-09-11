import React from "react";
import {
  Drawer,
  Button,
  Space,
  Radio,
  Checkbox,
  Switch,
  Select,
  Modal,
  message,
} from "antd";
import { GuideUser } from "./Guide";
import { Contactme } from "./Contactme";
export const Setting = (props) => {
  const Mode = [
    { label: "顺序模式", value: "0" },
    { label: "随机模式", value: "1" },
  ];
  const Tag = [
    {
      label: "全部",value: "default"
    },
    {
      label: "CET4",value: "CET4"
    },
    {
      label: "CET6",value: "CET6"
    }


  ]
  const Book = [
    { label: "book1", value: "0" },
    { label: "book2", value: "1" },
    { label: "book3", value: "2" },
  ];
  const Unit = [
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
  const closeDrawer = () => {
    props.showDrawerfunc(false);
  };
  let defaultsettings = JSON.parse(JSON.stringify(props.settings));
  let settings = JSON.parse(JSON.stringify(defaultsettings));
  const convertUnit = (unit) => {
    let newUnit = [];
    for (let i = 0; i < 8; i++) {
      newUnit.push(false);
    }
    for (let i = 0; i < unit.length; i++) {
      newUnit[unit[i]] = true;
    }
    return newUnit;
  };
  const compareSettings = (a, b) => {
    if (
      a.mode === b.mode &&
      a.units.toString() === b.units.toString() &&
      a.book === b.book &&
      a.tag === b.tag
    ) {
      return true;
    }
    return false;
  };
  const isEmtpy = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i]) return false;
    }
    return true;
  }


  const onClose = () => {
    if(isEmtpy(settings.units)){
      Modal.error(
        {
          title: "错误",
          content: "至少选择一个单元",
        }
      )
      return;
    }
    if (props.inital) {
      // console.log("settings1", settings);
      props.setSettings(settings);
      // props.initalization();
      closeDrawer();
    } else {
      // console.log("no inital",settings);
      if (compareSettings(defaultsettings, settings)) {
        props.setSettings(settings);
        props.showDrawerfunc(false);
      } else {
        Modal.confirm({
          title: "提示",
          content: (
            <>
              <>&nbsp;</>
              <p>您现在正在检测中</p>
              <p>在检测的过程中切换单元将会重置进度</p>
              <p>按确定重置进度并切换单元</p>
              <p>按取消撤销操作</p>
            </>
          ),
          onOk: () => {
            props.setSettings(settings);
            props.setInital(true);
            // props.initalization();
            closeDrawer();
          },
          onCancel: () => {
            settings = JSON.parse(JSON.stringify(defaultsettings));
            // console.log("cancel");
            closeDrawer();
          },
        });
      }
    }
  };

  const loadLocalStore = () => {
    let savedata = localStorage.getItem("savedata");
    if (!savedata) {
      message.error("本地进度不存在或已损坏 ");
      return { setting: null, list: null, current: null };
    }
    savedata = JSON.parse(savedata);
    let setting = savedata.setting;
    let list = savedata.list;
    let current = savedata.current;
    // let setting = localStorage.getItem("setting");
    // let list = localStorage.getItem("list");
    // let current = localStorage.getItem("current");
    if (setting && list && current) {
      return { setting, list, current };
    } else {
      message.error("本地进度不存在或已损坏 ");
      return { setting: null, list: null,  current: null };
    }
  };


  const clearLocalStore = () => {
    Modal.confirm({
      title: "提示",
      zIndex: 2000,
      content: <>你即将清除本地保存的进度，确定要继续吗</>,
      onOk: () => {
        localStorage.setItem("savedata", JSON.stringify({}));
        message.success("清除成功");
      },
      onCancel: () => {},
    });
    localStorage.setItem("savedata", "");
  }

  return (
    <Drawer
      key={"settingDrawer"}
      title="设置"
      placement="right"
      onClose={onClose}
      open={props.showDrawer}
      maskClosable={false}
      closable={false}
      destroyOnClose={true}
      extra={
        <Space>
          <Button type="primary" onClick={onClose}>
            确定
          </Button>
        </Space>
      }
      autoFocus
    >
      <Space direction="vertical">
        <Space size={"large"}>
          <span>书本选择</span>
          <Select
            defaultValue={props.settings.book}
            style={{ width: 120 }}
            options={Book}
            onChange={(value) => {
              settings.book = value.toString();
            }}
          />
        </Space>
        <Space size={"large"}>
          <span>模式选择</span>
          <Space direction="vertical">
            <Radio.Group
              defaultValue={props.settings.mode}
              options={Mode}
              optionType="button"
              buttonStyle="solid"
              onChange={(value) => {
                settings.mode = value.target.value.toString();
              }}
            />
          </Space>
        </Space>
        <div>单元选择</div>

          <Checkbox.Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
            }}
            options={Unit}
            defaultValue={props.settings.units.map((value, index) => {
              if (value) return index.toString();
            })}
            onChange={(value) => {
              settings.units = convertUnit(value);
            }}
          />

          <Space size={"large"}>
          <span>难度选择</span>
          <Space direction="vertical">
            <Radio.Group
              defaultValue={props.settings.tag}
              options={Tag}
              optionType="button"
              buttonStyle="solid"
              onChange={(value) => {
                console.log(value);
                settings.tag = value.target.value;
              }}
            />
          </Space>
        </Space>
        <Space size={"large"}>
          <div
            style={{"width":"100px"}}
          >显示首字母</div>
          <Switch
            defaultChecked={props.settings.showFirstLetter}
            onChange={(value) => {
              settings.showFirstLetter = value;
            }}
          />
        </Space>
        <Space size={"large"}>
          <div
            style={{"width":"100px"}}
          >显示音标</div>
          <Switch
            defaultChecked={props.settings.showPronounce}
            onChange={(value) => {
              settings.showPronounce = value;
            }}
          />
        </Space>
        <Space size={"large"}>
          <div
            style={{"width":"100px"}}
          >显示切换按钮</div>
          <Switch
            defaultChecked={props.settings.showButton}
            onChange={(value) => {
              settings.showButton = value;
            }}
          />
        </Space>
        <Space size={"large"}>
          <div
            style={{"width":"100px"}}
          >自动保存</div>
          <Switch
            defaultChecked={props.settings.autoSave}
            onChange={(value) => {
              settings.autoSave = value;
            }}
          />
        </Space>
        <Space size={"large"}>
          <Button
            onClick={() => {
              let { setting, list, current } = loadLocalStore();
              console.log(setting, list,  current);
              if (setting && list && current) {
                props.setSettings(setting);
                props.setList(list);
                props.setCurrent(current);
                props.setInital(false);
                closeDrawer();
              }
            }}
          >
            加载之前的进度
          </Button>
        </Space>
        <Space size={"large"}>
        <Button
          onClick={() => {
            clearLocalStore();
          }}
        >
          删除保存的进度
        </Button>
        </Space>
        <span
          style={{"color":"grey","fontSize":"13px"}}
        >*设置将会在点击上方确认按钮后生效</span>
        <GuideUser />
      </Space>
      <Contactme/>
    </Drawer>
  );
};
