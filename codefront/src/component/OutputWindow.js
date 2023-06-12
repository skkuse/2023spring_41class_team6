import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500" style={{
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          color: "#EF4444",
          fontSize: "0.75rem",
          lineHeight: "1rem",
          fontWeight: "400",
        }}>
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500" style={{
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          color: "#10B981",
          fontSize: "0.75rem",
          lineHeight: "1rem",
          fontWeight: "400",
        }}>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500" style={{
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          color: "#EF4444",
          fontSize: "0.75rem",
          lineHeight: "1rem",
          fontWeight: "400",
        }}>
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500" style={{
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
          color: "#EF4444",
          fontSize: "0.75rem",
          lineHeight: "1rem",
          fontWeight: "400",
        }}>
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2" style={{
        marginBottom: "0.5rem",
        backgroundClip: "text",
        backgroundImage: "background-image",
        color: "transparent",
        fontSize: "1.25rem",
        lineHeight: "1.75rem",
        fontWeight: "700",
      }}>
        Output
      </h1>
      <div className="w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto" style={{
        overflowY: "auto",
        color: "#ffffff",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: "400",
        width: "100%",
        height: "14rem",
        borderRadius: "0.375rem",
        background: "#1e293b",
      }}>
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;