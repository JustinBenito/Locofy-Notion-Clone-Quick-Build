import { useState, useMemo, useCallback } from "react";
import Drawer from "./Drawer";
import PortalDrawer from "./PortalDrawer";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Card = ({
  assign,
  selectedState,
  createfor,
  createat,
  vector,
  prop,
  uid,
  cardtitle,
  setCard,
  index,
  parent,
  cardBoxSizing,
  frame37BoxSizing,
  postTheVideoDisplay,
  frame33BoxSizing,
}) => {

  const {attributes, listeners, setNodeRef, transform}=useDraggable({
    id: `cardtitle-${uid}`,
    data:{
      cardtitle,
      index,
      parent,
      uid
    },
    onDragStart: ()=>{
      setDragging(true)
    },
    onDragEnd: ()=>{
      setDragging(false)
    }
  })

  const style={
    transform: CSS.Transform.toString(transform),
  }

  const [isEditable, setEditable]=useState(false)
  const [isDragging, setDragging]=useState(false)
  const [title, setTitle]=useState(cardtitle)
  const [isHoverable, setHoverable]=useState(false)

  const cardStyle = useMemo(() => {
    return {
      boxSizing: cardBoxSizing,
    };
  }, [cardBoxSizing]);

  const frameDivStyle = useMemo(() => {
    return {
      boxSizing: frame37BoxSizing,
    };
  }, [frame37BoxSizing]);

  const postTheVideoStyle = useMemo(() => {
    return {
      display: postTheVideoDisplay,
    };
  }, [postTheVideoDisplay]);

  const frameDiv1Style = useMemo(() => {
    return {
      boxSizing: frame33BoxSizing,
    };
  }, [frame33BoxSizing]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);



  const handleCardClick = useCallback(()=>{
    if(!isDragging && !isEditable){
      setEditable(true);
    }
  }, [isDragging, isEditable])

  const handleInputChange = useCallback((e)=>{
    setTitle(e.target.value);
    const card={
      title1: e.target.value,
      assign: null,
      selectedState: null,
      createfor: null,
      createat: null
    }
    setCard(card);
  },[title])

  const handleCardHover = useCallback(()=>{
    setHoverable(true);
  }, [])

  const handleCardLeave = useCallback(()=>{
    setHoverable(false);
  }, [])

  const handleInputBlur = useCallback(()=>{
    setEditable(false)
    setDragging(false)
  }, [])

  const handleDoubleClick = useCallback(()=>{
    setDrawerOpen(true);
  })

  const addNewCard=(newCard)=>{
    setCard(newCard)
  }

  return (
    <>
      <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleCardClick}
        className="self-stretch rounded-lg bg-white shadow-[0px_2px_4px_rgba(0,_0,_0,_0.08)] flex flex-col p-4 items-center justify-center gap-[8px] border-[1px] border-solid border-gainsboro-100 [&_.simple-buttons]:hover:flex"
     onMouseEnter={handleCardHover}
     onMouseLeave={handleCardLeave}
     >
        <div
          className="self-stretch flex flex-row py-1.5 px-0 items-center justify-center relative gap-[33px]"
          style={frameDivStyle}
        >
          <div className="self-stretch flex-1 flex flex-row items-center justify-start z-[0]">
            <div className="self-stretch flex-1 flex flex-row items-center justify-start">
              {isEditable || isHoverable ? (<input
                className="[border:none] font-inter text-sm bg-[transparent] flex-1 relative tracking-[-0.2px] font-bold text-black text-left"
                type="text"
                value={title || cardtitle}
                onChange={handleInputChange}
                style={postTheVideoStyle}
                onBlur={handleInputBlur}
                autoFocus
              />):
              <span>{title || cardtitle}</span>}
            </div>
          </div>
          <button
            className="simple-buttons cursor-pointer p-0 bg-white my-0 mx-[!important] absolute top-[3.06px] right-[-0.33px] rounded-10xs shadow-[0px_2px_4px_rgba(0,_0,_0,_0.08)] box-border w-[88px] h-[29px] hidden flex-row items-center justify-center z-[1] border-[1px] border-solid border-gainsboro-100 hover:flex"
            autoFocus
            onDoubleClick={handleDoubleClick}
          >
            <div
              className="self-stretch flex-1 flex flex-row items-center justify-center border-r-[1px] border-solid border-gainsboro-200"
              style={frameDiv1Style}
            >
              <img
                className="relative w-[11.9px] h-[12.75px]"
                alt=""
                src="/vector1.svg"
              />
            </div>
            <div className="flex-1 flex flex-row items-center justify-center">
              <img className="relative w-7 h-[5px]" alt="" src="/dots.svg" />
            </div>
          </button>
        </div>
        {/* <textarea className="[border:none] bg-[transparent] self-stretch h-[38px] overflow-hidden shrink-0" /> */}
      </div>
      {isDrawerOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeDrawer}
        >
          <Drawer onClose={closeDrawer} assign1={assign} selectedState1={selectedState} createfor1={createfor} createat1={createat} title={title} addNewCard={addNewCard}/>
        </PortalDrawer>
      )}
    </>
  );
};

export default Card;
