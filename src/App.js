import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import './App.css';
import Icon from "./components/Icon";

export default function App() {

  const ref = useRef(null);
  const [mouse,setMouse] = useState({x:0,y:0});
  const [canvas,setCanvas] = useState({x:0,y:0});

  useEffect(()=>{
    const x = (ref.current.parentNode.offsetWidth-ref.current.getAttributeNode('width').nodeValue)/2;
    const y = (ref.current.parentNode.offsetHeight-ref.current.getAttributeNode('height').nodeValue)/2;
    setCanvas({x:x,y:y});
    transform(x,y,0);
  },[]);

  const expand = e => {
    e.target.classList.toggle("active");
    var content = e.target.nextElementSibling;
    if(content.classList.contains("con")){
      content.classList.remove("con");
      content.style.maxHeight = null;
    } else if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = "fit-content";
    } 
  }

  const onEventClick = e => {
    const x=e.target.getElementsByTagName('span')[0];
    const x2=e.target.getElementsByTagName('span')[1];
    const x3=e.target.getElementsByTagName('span')[1];
    const y=e.target.getElementsByTagName('select')[0];
    if(x || x2 || x3 || y)
      action(e.target.title,[x?x.innerHTML:0,x2?x2.innerHTML:0,y?y.value:0]);

    if(e.target.a)
      document.getElementById(e.target.a).click();
  }

  const action = (a,b) => {
    console.log("b: "+b[0]);
    switch(a) {
      case "moveEvent":
        transform(b[0],0,0);
        break;
      case "leftEvent":
        transform(0,0,-1*b[0]);
        break;
      case "rightEvent":
        transform(0,0,b[0]);
        break;
      case "randomEvent":
        if(b[2]=="mouse-pointer")
          transform(mouse.x,mouse.y,0,0,1);
        else
          transform(canvas.x*2*Math.random(),canvas.y*2*Math.random(),0,0,1);
        break;
      case "xyEvent":
        transform(canvas.x+b[0],canvas.y+b[1],0,0,1);
        break;
      case "randomEventTime":
        if(b[2]=="mouse-pointer")
          transform(mouse.x,mouse.y,0,b[0],1);
        else
          transform(canvas.x*2*Math.random(),canvas.y*2*Math.random(),0,b[0],1);
        break;
    }
  }

  const transform = (x,y,r,t,o) => {

    let values = (window.getComputedStyle(ref.current, null)).getPropertyValue("transform");
    let transformValue = [0,0,0];
    if(values != 'none') {
      values = values.split('(')[1].split(')')[0].split(',');
      let radians = Math.atan2(values[1], values[0]);
      if (radians < 0) {
          radians += (2 * Math.PI);
      }
      transformValue[0] = parseInt(o?0:values[4]);
      transformValue[1] = parseInt(o?0:values[5]);
      transformValue[2] = radians;
    }
    const newRadian = transformValue[2] + (r*(Math.PI/180));
    if(t)
      ref.current.style.transitionDuration = t+'s';
    else
      ref.current.style.transitionDuration = 'none';

    ref.current.style.transform = "translate("+(x*Math.cos(newRadian)+y*Math.sin(newRadian)+transformValue[0])+"px,"+(x*Math.sin(newRadian)+y*Math.cos(newRadian)+transformValue[1])+"px) rotate(" + newRadian + "rad)";
  }

  const drag = e => {
    e.dataTransfer.setData("text/html", e.target.id);
  }

  const drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/html");
    console.log(data);
    let node = document.getElementById(data);
    if(data) {
      if(data.charAt(0) == 'i') {
        node = node.cloneNode(true);
        node.id = 'm'+node.id + document.getElementsByClassName('fit-content').length;
        node.onclick = onEventClick;
        node.ondragstart = drag;
        if(node.classList.contains("hideSvg")){
          node.classList.remove("hideSvg");
        }
        const svgs = node.getElementsByTagName('svg');
        svgs[0].onclick = minus;
        svgs[svgs.length-1].onclick = plus;
      }
      const eventPanel = document.getElementsByClassName('w-96')[0];
      node.style.transform = "translate("+(mouse.x-eventPanel.offsetWidth-20)+"px,"+(mouse.y-eventPanel.offsetTop-20)+"px)";
      e.target.appendChild(node);
    }
  }

  const plus = e => {
    const rect = e.target.getBoundingClientRect();
    localStorage.setItem('pointer-x',rect.x);
    localStorage.setItem('pointer-y',rect.y);
    localStorage.setItem('pointer',e.target.parentElement.id);
  }

  const minus = e => {
    const mPointer = e.target.getBoundingClientRect();
    const pointer = {
      x: localStorage.getItem('pointer-x'), 
      y: localStorage.getItem('pointer-y'), 
      z: localStorage.getItem('pointer')
    };
    if(localStorage.getItem('pointer-x')) {
      document.getElementById(pointer.z).a = e.target.parentElement.id;
      localStorage.removeItem('pointer-x');
      localStorage.removeItem('pointer-y');
      localStorage.removeItem('pointer');
      const ele = document.getElementById('line1').cloneNode(true);
      ele.id += document.getElementsByClassName('line').length;
      ele.style.left = pointer.x+'px';
      ele.style.top = pointer.y+'px';
      let angle = (pointer.x-mPointer.x)/(pointer.y-mPointer.y)*(-1);
      if(angle<0)
        angle -= Math.PI;
      ele.style.height = Math.sqrt(Math.pow(pointer.y-mPointer.y,2)+Math.pow(pointer.x-mPointer.x,2))+'px';
      console.log(Math.atan(angle));
      ele.style.transform = "translate(6px,6px) rotate("+Math.atan(angle)+"rad)";
      document.getElementsByClassName('parent')[0].appendChild(ele);
    }
  }

  const remove = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/html");
    if(data.charAt(0)=='m')
      document.getElementById(data).remove();
  }

  return (
    <div className="bg-blue-100 font-sans parent">
      <div className="pt-2 pb-2 pl-96 pr-96">
        <Icon name="stop" className="text-red-600 mx-2 inline-block float-right" />
        <Icon name="flag" className="text-green-600 mx-2 inline-block float-right" />
        <span className="inline-block">{"Mouse Position - x: " + mouse.x + " y: "+mouse.y}</span>
      </div>
      <div className="h-screen overflow-hidden flex flex-row" onMouseMove={e=>setMouse({x:e.screenX, y:e.screenY})} onDragOver={e=>setMouse({x:e.pageX, y:e.pageY})}>
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar drag={drag} drop={remove} onClick={onEventClick} expand={expand}/>
          <MidArea drop={drop}/>
          <div className="line" id="line1"></div>
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea refs={ref}/>
        </div>
      </div>
    </div>
  );
}