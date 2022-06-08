import React, { useState } from "react";
import CatSprite from "./CatSprite";
import video from "../assets/demo.mp4"

export default function PreviewArea({refs}) {
  const [expand,setExpand] = useState(false);
  return (
    <div className="flex-none h-full overflow-y-auto p-2 w-full">
      <div className="bg-white" style={{height:"60%",marginBottom:"16px",borderRadius:"10px"}}>
      <CatSprite refs={refs}/>
      <span id="spanTxt" style={{position:"absolute"}}></span>
      </div>
      <div className={"bg-white "+(expand?"activeDiv":"")} style={{height:"30%"}} onClick={()=>setExpand(!expand)}>
        <video autoPlay muted loop className={(expand?"activeDiv":"")}  onClick={()=>setExpand(!expand)}>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
