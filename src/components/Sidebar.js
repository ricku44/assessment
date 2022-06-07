import React, { Fragment } from "react";
import sliderContent from "../events";
import Icon from "./Icon";

export default function Sidebar(props) {

  return (
    <div className="w-96 flex-none h-full flex flex-col items-start p-2 border-r border-gray-200" onDrop={props.drop} onDragOver={e=>e.preventDefault()}>
      {sliderContent.map((item,i)=>{
        return (
          <Fragment key={"slider"+item.text+i}>
            <div className={"font-bold collapsible bg-"+item.color+"-500 "+(i==0?"active":"")} onClick={props.expand}> {item.text} </div>
            <div className={"content "+(i==0?"con":"")}>
              {item.content.map((innerItem,j)=>{
                return (
                  <div key={"inner"+innerItem.onClick+j} 
                    id={"inner"+innerItem.onClick+j} 
                    className={"flex flex-row bg-"+item.color+"-500 text-white py-1 my-2 text-xs fit-content hideSvg"} 
                    onClick={props.onClick}
                    title={innerItem.onClick}
                    draggable="true" onDragStart={props.drag}>
                      <Icon name="minus-circle" size="12" className="text-white mx-2"/>
                      {innerItem.text1}
                      {innerItem.text2}
                      {innerItem.text3}
                      {innerItem.text4}
                      {innerItem.text5}
                      <Icon name="plus-circle" size="12" className="text-white mx-2"/>
                  </div>
                );
              })}
            </div>
          </Fragment>
        )
      })}
    </div>
  );
}
