import React from "react";
export const Interface = (props) => {
  const charremove = (string,char) => {
    let newstring = "";
    for (let i = 0; i < string.length; i++) {
      if (string[i] !== char) {
        newstring += string[i];
      }
    }
    return newstring;
  }
  let showPronounce = props.showPronounce;
  let explanations_and_examples = ""
  let pronounce = " "
  let partOfSpeech = " "
  if(props.data){
    if(props.data.pee[0].partOfSpeech!==undefined){
      pronounce = props.data.pee[0].partOfSpeech.indexOf("/")!==-1?props.data.pee[0].partOfSpeech.split("/")[1]:""; 
    partOfSpeech = props.data.pee[0].partOfSpeech.indexOf("【")!==-1? charremove( charremove( props.data.pee[0].partOfSpeech.slice(props.data.pee[0].partOfSpeech.indexOf("【")+1),"】"),";"):""; 
  }
  if(props.data.pee[0].explanations_and_examples!==undefined){
    explanations_and_examples = props.data.pee[0].explanations_and_examples;
  }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <h3>
        <big>
          <b>{props.inital?"选中输入框后敲击回车开始检测":partOfSpeech}</b>
          
        </big>
      </h3>
      <div>{props.inital?null:showPronounce? pronounce?"/"+pronounce+"/":"":""}</div>
      <div>&nbsp;</div>
      {
        explanations_and_examples?explanations_and_examples.map((item, index) => {
            return (
                <div key={index}>
                    <h3>{props.inital?null:item.explanation}</h3>
                </div>
            );
            }):""
      }
    </div>
  );
};
