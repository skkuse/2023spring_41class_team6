import React from "react";
import QuestionData from "../files/leetcode";


const Question = () => {
  console.log(QuestionData[0].description);
  return (
    <div style={{ fontSize: '30px', fontWeight: 'bold'}}>{QuestionData[0].title}</div>
    );
};


export default Question;