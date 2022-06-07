import React from "react";
import Icon from "./components/Icon";

const sliderContent = [{
    text: "Motion",
    color: "blue",
    content: [{
      text1: 'Move ',
      text2: <span contentEditable="true" suppressContentEditableWarning="true">10</span>,
      text3:' steps',
      onClick: 'moveEvent'
    },{
      text1: 'Turn ',
      text2: <Icon name="redo" size={15} className="text-white mx-2" />,
      text3: <span contentEditable="true" suppressContentEditableWarning="true">15</span>,
      text4: ' degrees',
      onClick: 'rightEvent'
    },{
      text1: 'Turn ',
      text2: <Icon name="undo" size={15} className="text-white mx-2" />,
      text3: <span contentEditable="true" suppressContentEditableWarning="true">15</span>,
      text4: ' degrees',
      onClick: 'leftEvent'
    },{
      text1: 'go to ',
      text2: (
        <select className="bg-blue-700">
          <option value="random position">random position</option>
          <option value="mouse-pointer">mouse-pointer</option>
        </select>
      ),
      onClick: 'randomEvent'
    },{
      text1: 'go to x :',
      text2: <span contentEditable="true" suppressContentEditableWarning="true">0</span>,
      text3: ' y :',
      text4: <span contentEditable="true" suppressContentEditableWarning="true">0</span>,
      onClick: 'xyEvent'
    },{
      text1: 'glide',
      text2: <span contentEditable="true" suppressContentEditableWarning="true">1</span>,
      text3: ' secs to',
      text4: (
        <select className="bg-blue-700">
          <option value="random position">random position</option>
          <option value="mouse-pointer">mouse-pointer</option>
        </select>
      ),
      onClick: 'randomEventTime'
    }]
  },{
    text: "Looks",
    color: "green",
    content: [{
      text1: 'Move 10 steps',
      onClick: 'moveEvent'
    },{
      text1: 'Turn ',
      text2: <Icon name="undo" size={15} className="text-white mx-2" />,
      text3: '15',
      text4: ' degrees',
      onClick: 'leftEvent'
    },{
      text1: 'Turn ',
      text2: <Icon name="redo" size={15} className="text-white mx-2" />,
      text3: '15 degrees',
      onClick: 'rightEvent'
    }]
  },{
    text: "Control",
    color: "purple",
    content: [{
      text1: 'Move 10 steps',
      onClick: 'moveEvent'
    },{
      text1: 'Turn ',
      text2: <Icon name="undo" size={15} className="text-white mx-2" />,
      text3: '15 degrees',
      onClick: 'leftEvent'
    },{
      text1: 'Turn ',
      text2: <Icon name="redo" size={15} className="text-white mx-2" />,
      text3: '15 degrees',
      onClick: 'rightEvent'
    }]
  },{
    text: "Events",
    color: "yellow",
    content: [{
      text1: 'When ',
      text2: <Icon name="flag" size={15} className="text-green-600 mx-2" />,
      text3: 'clicked',
      onClick: 'flagEvent'
    },{
      text1: 'When this sprite clicked',
      onClick: 'spriteEvent'
    }]
  }];

  export default sliderContent;