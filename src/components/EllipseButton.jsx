import React from "react";

const EllipseButton = ({name, bgColor, isIcon=false, icon}) => {
  return (
    <button
      type="button"
      className={`size-10 rounded-full ${bgColor}`}
    >
      <div className="flex justify-center items-center">
        {isIcon ? icon : name}
      </div>
    </button>
  );
};

export default EllipseButton;
