import { useMemo, useState } from "react";
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";

const KanbanLane = ({
  frame17JustifyContent,
  frame,
  frameOverflow,
  frameFlexShrink,
  addCard,
  items,
  toDoColor,
  title,
  frame1,
}) => {
  const frameDiv2Style = useMemo(() => {
    return {
      justifyContent: frame17JustifyContent,
    };
  }, [frame17JustifyContent]);

  const frameIconStyle = useMemo(() => {
    return {
      overflow: frameOverflow,
      flexShrink: frameFlexShrink,
    };
  }, [frameOverflow, frameFlexShrink]);

  const toDoStyle = useMemo(() => {
    return {
      color: toDoColor,
    };
  }, [toDoColor]);

  const [titlelane, setTitleLane]=useState(title)

  const {setNodeRef}=useDroppable({
    id: title,
  })

  const onClickHandle = ()=>{
    addCard("Enter a task")
  }

  const setCard=(card)=>{
    console.log(card);
    const {title1, assign, selectedState, createfor, createat}=card;
    console.log(title1, assign, selectedState, createat, createfor);
    const lastIndex=items.length-1;
    if(lastIndex>=0){
      items[lastIndex]={
        ...items[lastIndex],
        title: title1,
        assign: assign,
        selectedState: selectedState,
        createfor: createfor,
        createat: createat
      }
    }
  }

  return (
    <div className="self-stretch flex-1 flex flex-col items-center justify-center text-left text-sm text-darkslategray-200 font-inter md:flex-[unset] md:self-stretch">
      <div className="self-stretch flex flex-row items-center justify-between">
        <div
          className="flex flex-row items-center justify-center gap-[7px]"
          style={frameDiv2Style}
        >
          <img
            className="relative w-4 h-4"
            alt=""
            src={frame}
            style={frameIconStyle}
          />
          <input
            className="[border:none] font-medium font-inter text-xs bg-[transparent] relative leading-[21px] text-gray text-left"
            type="text"
            placeholder="To-do"
            onChange={(e)=>setTitleLane(e.target.value)}
            value={titlelane}
            style={toDoStyle}
          />
          <div className="relative leading-[21px] flex items-center w-2 h-4 shrink-0">
          </div>
        </div>
        <button 
        onClick={onClickHandle}
        className="cursor-pointer [border:none] p-1 bg-gray-50 rounded-md flex flex-col items-start justify-start">
          <img
            className="relative w-[12.03px] h-3 overflow-hidden shrink-0"
            alt=""
            src={frame1}
          />
        </button>
      </div>
      <div 
      ref={setNodeRef}
      className="self-stretch flex-1 rounded-xl flex flex-col p-3 items-start justify-start">
        {items.map(({title: cardname, uid,  assign, selectedState, createfor, createat,}, index)=>(
          <Card
          cardtitle={cardname}
          setCard={setCard}
          key={index}
          uid={uid}
          index={index}
          parent={title}
          assign={assign} 
          selectedState={selectedState} 
          createfor={createfor} 
          createat={createat}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanLane;
