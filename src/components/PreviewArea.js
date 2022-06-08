import React from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({refs}) {
  return (
    <div className="flex-none h-full overflow-y-auto p-2 w-full">
      <div className="bg-white" style={{height:"64.44%",marginBottom:"16px",borderRadius:"10px"}}>
      <CatSprite refs={refs}/>
      <span id="spanTxt" style={{position:"absolute"}}></span>
      </div>
      <div className="bg-white" style={{height:"33.33%"}}></div>
    </div>
  );
}
