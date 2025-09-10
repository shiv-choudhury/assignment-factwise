import React from "react";

export default function Button({ children, btnStyle, style, ...props }) {
  //give some good styles to the button
  return (
    <button
      className={`px-2 py-2 rounded-lg bg-blue-500 text-sm text-white font-medium shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200 ${btnStyle}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
