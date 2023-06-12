import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        style={{zIndex: "10",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "#ffffff",
        transitionProperty: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
        transitionDuration: "200ms",
        width: "100%",
        borderRadius: "0.375rem",
        borderWidth: "2px",
        borderColor: "#000000",}}
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white mt-2"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;