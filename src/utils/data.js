import { message } from "antd";
import datalist from "../data/dataConfig.json";
let data = [];
export const loadData = async () => {
  //dynamic import
  data = await Promise.all(
    datalist.unit.map(async (item) => {
      return await import(`../data/book${item}.json`);
    })
  );
  data = data.map((item) => {
    return item.default;
  });
};
const defaultword = {
  word: "default",
  "tag":["dafault"],
  audio:
    "http://course.media.unipus.cn/edx/course-v1:Unipus+nce_4_rw_1+202008/resource/audio/46376caddb24d2f3dd7f9ef3d2d760e9cde0bf31_96k.mp3#duration=1.5&t=.mp3",
  pee: [
    {
      partOfSpeech: "/blablabla/【n.】",
      explanations_and_examples: [
        {
          explanation: "Error Deault word 空保护默认单词",
          example: "The word is not supposed to be here.这个单词不应该显示在这里 出现故障",
        },
      ],
    },
  ],
};

//input format book unit id
export const getWord = (bookId, unit, wordId) => {
  //检查词库是否加载完全
  if (data.length === 0) {
    console.error("数据未加载完全时获取词汇");
    return defaultword;
  }
  if (bookId > 3 || bookId < 0) {
    console.error("书本错误");
    return defaultword;
  }
  if (unit > 8 || unit < 0) {
    console.error("单元错误");
    return defaultword;
  }
  if(wordId >getUnitLength(bookId,unit)||wordId<0){
    console.error("单词错误");
    return defaultword;
  }
  return data[bookId][unit][0].children[wordId];
};

export const getUnitLength = (bookId, unit) => {
    let result = 0;
    if (data.length === 0) {
        console.error("数据未加载完全时获取词汇");
        return defaultword;
    }
    if (bookId > 3 || bookId < 0) {
        console.error("书本范围错误");
        return defaultword;
    }
    if(unit<0||unit>8){
        console.error("单元范围错误");
        return defaultword;
    }
    return data[bookId][unit][0].children.length;

};
//判断此单词是否与要求tag匹配
export const TagMatch = (bookId, unit, wordId,tag)=>{
    if(tag==="default"){
      return true;
    }
    let word = getWord(bookId,unit,wordId);
    switch (tag) {
      case "default":
        return true;
      case "CET4" :
        return word.tag.includes("CET4");
      case "CET6" :
        return word.tag.includes("CET6");
      default :
        console.error("tag错误");
        return false;
    }
}