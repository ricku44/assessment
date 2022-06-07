import React from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({refs}) {
  return (
    <div className="flex-none h-full overflow-y-auto p-2 w-full">
      <CatSprite refs={refs}/>
    </div>
  );
}
