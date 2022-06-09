import React from "react";
import Icon from "./components/Icon";

const sliderContent = [{
    text: "Motion",
    color: "blue",
    content: [{
      text1: 'move ',
      text2: <input type="number" defaultValue="10" />,
      text3:' steps',
      onClick: 'moveEvent'
    },{
      text1: 'turn ',
      text2: <Icon name="redo" size={15} className="text-white mx-2" />,
      text3: <input type="number" defaultValue="15" />,
      text4: ' degrees',
      onClick: 'rightEvent'
    },{
      text1: 'turn ',
      text2: <Icon name="undo" size={15} className="text-white mx-2" />,
      text3: <input type="number" defaultValue="15" />,
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
      text2: <input type="number" defaultValue="0" />,
      text3: ' y :',
      text4: <input type="number" defaultValue="0" />,
      onClick: 'xyEvent'
    },{
      text1: 'glide',
      text2: <input type="number" defaultValue="1" />,
      text3: ' secs to',
      text4: (
        <select className="bg-blue-700">
          <option value="random position">random position</option>
          <option value="mouse-pointer">mouse-pointer</option>
        </select>
      ),
      onClick: 'randomEventTime'
    },{
      text1: 'glide',
      text2: <input type="number" defaultValue="1" />,
      text3: ' secs to x :',
      text4: <input type="number" defaultValue="0" />,
      text5: ' y :',
      text6: <input type="number" defaultValue="0" />,
      onClick: 'xyEventTime'
    },,{
      text1: 'point in direction ',
      text2: <input type="number" defaultValue="90" />,
      onClick: '90Event'
    },{
      text1: 'point towards',
      text2: (
        <select className="bg-blue-700">
          <option value="random position">random position</option>
          <option value="mouse-pointer">mouse-pointer</option>
        </select>
      ),
      onClick: 'randomAngleEvent'
    },{
      text1: 'change x by ',
      text2: <input type="number" defaultValue="10" />,
      onClick: 'xMoveEvent'
    },{
      text1: 'set x to ',
      text2: <input type="number" defaultValue="0" />,
      onClick: 'xSetEvent'
    },{
      text1: 'change y by ',
      text2: <input type="number" defaultValue="10" />,
      onClick: 'yMoveEvent'
    },{
      text1: 'set y to ',
      text2: <input type="number" defaultValue="0" />,
      onClick: 'ySetEvent'
    }]
  },{
    text: "Looks",
    color: "green",
    content: [{
      text1: 'say',
      text2: <input type="number" defaultValue="Hello!" />,
      text3: ' for',
      text4: <input type="number" defaultValue="1" />,
      text5: 'seconds',
      onClick: 'helloEventTime'
    },{
      text1: 'say',
      text2: <input type="number" defaultValue="Hello!" />,
      onClick: 'helloEvent'
    },{
      text1: 'think',
      text2: <input type="number" defaultValue="Hmm!" />,
      text3: ' for',
      text4: <input type="number" defaultValue="1" />,
      text5: 'seconds',
      onClick: 'helloEventTime'
    },{
      text1: 'think',
      text2: <input type="number" defaultValue="Hmm!" />,
      onClick: 'helloEvent'
    },{
      text1: 'show',
      onClick: 'showEvent'
    },{
      text1: 'hide',
      onClick: 'hideEvent'
    }]
  },{
    text: "Control",
    color: "purple",
    content: [{
      text1: 'wait',
      text2: <input type="number" defaultValue="1" />,
      text3: ' seconds',
      onClick: 'waitEvent'
    },{
      text1: 'repeat ',
      text2: <input type="number" defaultValue="10" />,
      onClick: 'repeatEvent'
    },{
      text1: 'forever ',
      text3: '15 degrees',
      onClick: 'foreverEvent'
    },{
      text1: 'wait until',
      text2: <input type="number" defaultValue="1" />,
      text3: ' seconds',
      onClick: 'waitEvent'
    },{
      text1: 'repeat until',
      text2: <input type="number" defaultValue="10" />,
      onClick: 'repeatEvent'
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