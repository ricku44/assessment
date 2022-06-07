import React from "react";

export default function MidArea(props) {
  return <div className="flex-1 h-full overflow-auto bg-white" onDrop={props.drop} onDragOver={e=>e.preventDefault()}></div>;
}
