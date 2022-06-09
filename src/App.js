import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import './App.css';
import Icon from "./components/Icon";

export default function App() {

  const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

  if(isMobile)
    return (
      <div className="divMobile">
        <span className="spanMobile">Sorry, this website is only available on desktop devices ...</span>
      </div>
    )

  const ref = useRef(null);
  const [mouse,setMouse] = useState({x:0,y:0});
  const [canvas,setCanvas] = useState({x:0,y:0});

  useEffect(()=>{

    const inputs = document.getElementsByTagName('input');
    for(let i in inputs) {
      try{
        inputs[i].onkeyup = adjust;
        inputs[i].style.width = ((inputs[i].value.length+2)*8)+'px';
      }catch(e){}
    }

    const x = (ref.current.parentNode.offsetWidth-ref.current.getAttributeNode('width').nodeValue)/2;
    const y = (ref.current.parentNode.offsetHeight-ref.current.getAttributeNode('height').nodeValue)/2;
    setCanvas({x:x,y:y});
    transform(x,y,0);
  },[]);

  const adjust = e => {
    e.target.style.width = ((e.target.value.length+2)*8)+'px';
  }

  const expand = e => {
    const allCollapse = document.getElementsByClassName('collapsible');
    for(let x in allCollapse) {
      if(allCollapse[x].classList) {
        allCollapse[x].classList.remove("active");
        allCollapse[x].nextElementSibling.style.maxHeight = null;
        allCollapse[x].nextElementSibling.classList.remove("con");
      }
    }
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
    const x=e.target.getElementsByTagName('input')[0];
    const x2=e.target.getElementsByTagName('input')[1];
    const x3=e.target.getElementsByTagName('input')[2];
    const y=e.target.getElementsByTagName('select')[0];
    if(x || x2 || x3 || y)
      action(e.target.title,[x?x.value:0,x2?x2.value:0,y?y.value:0,x3?x3.value:0]);
    else
      action(e.target.title,[]);
    if(e.target.a)
      document.getElementById(e.target.a).click();
  }

  const action = (a,b) => {
    console.log("b: "+b[0]);
    const txt = document.getElementById('spanTxt');
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
        transform(canvas.x+parseInt(b[0]),canvas.y+parseInt(b[1]),0,0,1);
        break;
      case "randomEventTime":
        if(b[2]=="mouse-pointer")
          transform(mouse.x,mouse.y,0,b[0],1);
        else
          transform(canvas.x*2*Math.random(),canvas.y*2*Math.random(),0,b[0],1);
        break;
      case "xyEventTime":
        transform(canvas.x+parseInt(b[1]),canvas.y+parseInt(b[3]),0,b[0],1);
        break;
      case "90Event":
        transform(0,0,b[0]-90,0,0,1);
        break;
      case "randomAngleEvent":
        transform(0,0,360*Math.random(),0,0,1);
        break;
      case "xMoveEvent":
        transform(b[0],0,0,0,0,0,1);
        break;
      case "xSetEvent":
        transform(canvas.x+parseInt(b[0]),0,0,0,0,0,2);
        break;
      case "yMoveEvent":
        transform(0,b[0],0,0,0,0,1);
        break;
      case "ySetEvent":
        transform(0,canvas.y+parseInt(b[0]),0,0,0,0,2);
        break;
      case "helloEventTime":
        txt.innerHTML = b[0];
        txt.style.transform = ref.current.style.transform;
        setTimeout(()=>{
          txt.innerHTML ='';
        },b[1]*1000);
        break;
      case "helloEvent":
        txt.innerHTML = b[0];
        txt.style.transform = ref.current.style.transform;
        break;
      case "showEvent":
        ref.current.style.display = "block";
        break;
      case "hideEvent":
        ref.current.style.display = "none";
        break;
    }
  }

  const transform = (x,y,r,t,o,ao,xy) => {

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
    const newRadian = (ao?0:transformValue[2]) + (r*(Math.PI/180));
    if(t)
      ref.current.style.transitionDuration = t+'s';
    else
      ref.current.style.transitionDuration = 'none';

    if(xy==2)
      ref.current.style.transform = "translate("+(parseInt(x)+(x?0:transformValue[0]))+"px,"+(parseInt(y)+(y?0:transformValue[1]))+"px) rotate(" + newRadian + "rad)";
    else if(xy)
      ref.current.style.transform = "translate("+(parseInt(x)+transformValue[0])+"px,"+(parseInt(y)+transformValue[1])+"px) rotate(" + newRadian + "rad)";
    else
      ref.current.style.transform = "translate("+(x*Math.cos(newRadian)+y*Math.sin(newRadian)+transformValue[0])+"px,"+(x*Math.sin(newRadian)+y*Math.cos(newRadian)+transformValue[1])+"px) rotate(" + newRadian + "rad)";
  }

  const drag = e => {
    e.dataTransfer.setData("text/html", e.target.id);
  }

  const drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/html");
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
      const eventPanel = document.getElementsByClassName('w-80')[0];
      node.style.transform = "translate("+(mouse.x-eventPanel.offsetWidth-20)+"px,"+(mouse.y-eventPanel.offsetTop-20)+"px)";
      e.target.appendChild(node);
    }
  }

  const plus = e => {
    if(!e.target.parentElement.a) {
      const rect = e.target.getBoundingClientRect();
      localStorage.setItem('pointer-x',rect.x);
      localStorage.setItem('pointer-y',rect.y);
      localStorage.setItem('pointer',e.target.parentElement.id);
    }
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
      let angle = Math.atan((pointer.x-mPointer.x)/(pointer.y-mPointer.y)*(-1));
      if(pointer.y>mPointer.y)
        angle += Math.PI;
      ele.style.height = Math.sqrt(Math.pow(pointer.y-mPointer.y,2)+Math.pow(pointer.x-mPointer.x,2))+'px';
      ele.style.transform = "translate(6px,6px) rotate("+angle+"rad)";
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
      <div className="pt-2 pb-2 pl-96 pr-24">
        <span className="inline-block float-right">
          <a href="https://github.com/ricku44/assessment" target="_blank" referrerPolicy="no-referrer" className="text-blue-700" style={{textDecoration:"underline"}}>Source Code</a>
        </span>
        <Icon name="stop" className="text-red-600 mx-2 inline-block float-right" style={{marginRight:"20%"}}/>
        <Icon name="flag" className="text-green-600 mx-2 inline-block float-right"/>
        <span className="inline-block">{"Mouse Position - x: " + mouse.x + " y: "+mouse.y}</span>
      </div>
      <div className="h-screen overflow-hidden flex flex-row" onMouseMove={e=>setMouse({x:e.screenX, y:e.screenY})} onDragOver={e=>setMouse({x:e.pageX, y:e.pageY})}>
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar drag={drag} drop={remove} onClick={onEventClick} expand={expand}/>
          <MidArea drop={drop}/>
          <div className="line" id="line1"></div>
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea refs={ref}/>
        </div>
      </div>
    </div>
  );
}
