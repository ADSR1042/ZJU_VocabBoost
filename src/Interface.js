import React from "react";
import { AudioPlayer } from "./AudioPlayer";
export const Interface = (props) => {
  const charremove = (string, char) => {
    let newstring = "";
    for (let i = 0; i < string.length; i++) {
      if (string[i] !== char) {
        newstring += string[i];
      }
    }
    return newstring;
  };
  let showPronounce = props.showPronounce;
  let explanations_and_examples = "";
  let pronounce = " ";
  let partOfSpeech = " ";
  if (props.data) {
    if (props.data.pee[0].partOfSpeech !== undefined) {
      pronounce =
        props.data.pee[0].partOfSpeech.indexOf("/") !== -1
          ? props.data.pee[0].partOfSpeech.split("/")[1]
          : "";
      partOfSpeech =
        props.data.pee[0].partOfSpeech.indexOf("【") !== -1
          ? charremove(
              charremove(
                props.data.pee[0].partOfSpeech.slice(
                  props.data.pee[0].partOfSpeech.indexOf("【") + 1
                ),
                "】"
              ),
              ";"
            )
          : "";
    }
    if (props.data.pee[0].explanations_and_examples !== undefined) {
      explanations_and_examples = props.data.pee[0].explanations_and_examples;
    }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <h3>
        <big>
          <b>
            {props.inital ? (
              "选中输入框后敲击回车开始检测"
            ) : partOfSpeech ? (
              partOfSpeech
            ) : (
              <span>&nbsp;</span>
            )}
          </b>
        </big>
      </h3>
      <div>
        {props.inital ? null : (
          <AudioPlayer src={AudioURLTransfer(props.data, props.book)} />
        )}
        &nbsp;
        {props.inital
          ? null
          : showPronounce
          ? pronounce
            ? "/" + pronounce + "/"
            : ""
          : ""}
      </div>
      <div>&nbsp;</div>
      {explanations_and_examples
        ? explanations_and_examples.map((item, index) => {
            return (
              <div key={index}>
                <h3>{props.inital ? null : item.explanation}</h3>
              </div>
            );
          })
        : ""}
    </div>
  );
};
const AudioURLTransfer = (word, book) => {
  // debugger;
  let uuid = word.audio.split("/")[word.audio.split("/").length - 1];
  //replace # with _
  uuid = uuid.replace("#","_");
  let baseurl = "https://vocal-boost-1312007296.cos.ap-shanghai.myqcloud.com/";
  switch (book) {
    case "0":
      return baseurl + "book1/" + uuid;
    case "1":
      return baseurl + "book2/" + uuid;
    case "2":
      return baseurl + "book3/" + uuid;
    default:
      console.error("book error");
      return "";
  }
};
