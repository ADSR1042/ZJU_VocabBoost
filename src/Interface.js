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
  let explanations_and_examples = props.explanations_and_examples;
  let pronounce = props.partOfSpeech.indexOf("/")!==-1?props.partOfSpeech.split("/")[1]:""; 
  let partOfSpeech = props.partOfSpeech.indexOf("【")!==-1? charremove( props.partOfSpeech.slice(props.partOfSpeech.indexOf("【")+1),"】"):""; 
  return (
    <div style={{ textAlign: "left" }}>
      <h3>
        <big>
          <b>{partOfSpeech}</b>
          
        </big>
      </h3>
      <div>{showPronounce?"/"+pronounce+"/":""}</div>
      <div>&nbsp;</div>
      {
        explanations_and_examples?explanations_and_examples.map((item, index) => {
            return (
                <div key={index}>
                    <h3>{item.explanation}</h3>
                </div>
            );
            }):""
      }
    </div>
  );
};
