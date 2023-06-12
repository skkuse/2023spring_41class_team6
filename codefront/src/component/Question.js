import React from "react";
import QuestionData from "../files/leetcode";


const Question = () => {
  console.log(QuestionData[0].description)
  return <textarea style={{ whiteSpace: 'pre-line', height: '300px' }}>{QuestionData[0].description}</textarea>;
};


export default Question;