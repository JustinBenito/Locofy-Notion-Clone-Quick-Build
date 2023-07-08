import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState, useCallback, useEffect } from "react";
import Drawer from "./Drawer";
import PortalDrawer from "./PortalDrawer";

const KanbanCard = ({ cardtitle, setCard, index, parent, uid,assign, selectedStatus, createfor, createat, }) => {
  console.log("cardtitle",cardtitle);
  console.log("data we get in card:",assign, selectedStatus, createfor, createat)
  const [title, setTitle] = useState('');
  const [isDragging, setDragging] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [cards, setCards] = useState({});

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `cardtitle-${uid}`,
    data: {
      cardtitle,
      index,
      parent,
      uid
    },
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const handleCardClick = useCallback(() => {
    if (!isDragging && !isEditable) {
      setEditable(true);
    }
  }, [isDragging, isEditable]);

  const handleButtonDoubleClick = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      setTitle(e.target.value);
      setCard(title);
    },
    []
  );

  const addNewCard = (newCard) => {
    setCards(newCard);
    setCard(title, newCard);
    console.log("added",newCard)
    // console.log("cards:", newCard.title, 
    // newCard.assign,
    // newCard.selectedStatus,
    // newCard.createfor,
    // newCard.createat)
  };

  const handleInputBlur = useCallback(() => {
    setEditable(false);
    setDragging(false);
  }, []);

  const handleCardHover = useCallback(() => {
    setHovered(true);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHovered(false);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  useEffect(() => {
    console.log("Title:", title);
  }, [title]);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="self-stretch flex-1 rounded-xl flex flex-col p-3 items-start justify-start"
        onClick={handleCardClick}
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
      >
        <div className="self-stretch rounded-lg bg-white shadow-[0px_2px_4px_rgba(0,_0,_0,_0.08)] flex flex-col p-4 items-center justify-center gap-[8px] border-[1px] border-solid border-gainsboro-100 hover:bg-[#efefef] [&_.simple-buttons]:hover:flex [&_.simple-buttons]:hover:animate-[0.3s_ease_0s_1_normal_none_fade-in] [&_.simple-buttons]:hover:opacity-[1]">
          <div className="self-stretch flex flex-row py-1.5 px-0 items-center justify-center relative gap-[33px]">
            <div className="self-stretch flex-1 flex flex-row items-center justify-start z-[0]">
              <div className="self-stretch flex-1 flex flex-row items-center justify-start">
                {isEditable || isHovered ? (
                  <input
                    className="[border:none] font-inter text-sm bg-[transparent] flex-1 relative tracking-[-0.2px] font-bold text-black text-left"
                    type="text"
                    value={title || cardtitle}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                  />
                ) : (
                  <span>{title || cardtitle}</span>
                )}
              </div>
            </div>
            <button
              className="simple-buttons cursor-pointer p-0 bg-white my-0 mx-[!important] absolute top-[3.06px] right-[0.33px] rounded-10xs shadow-[0px_2px_4px_rgba(0,_0,_0,_0.08)] box-border w-[88px] h-[29px] hidden flex-row items-center justify-center z-[1] border-[1px] border-solid border-gainsboro-100 hover:flex hover:cursor-pointer"
              onDoubleClick={handleButtonDoubleClick}
            >
              <div className="self-stretch flex-1 flex flex-row items-center justify-center border-r-[1px] border-solid border-gainsboro-200">
                <img
                  className="relative w-[11.9px] h-[12.75px]"
                  alt=""
                  src="/vector.svg"
                />
              </div>
              <div className="flex-1 flex flex-row items-center justify-center">
                <img className="relative w-7 h-[5px]" alt="" src="/1.svg" />
              </div>
            </button>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <PortalDrawer
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Right"
          onOutsideClick={closeDrawer}
        >
          <Drawer onClose={closeDrawer} title={title} addNewCard={addNewCard} assign={assign} selectedStatus={selectedStatus} createfor={createfor} createat={createat} />
        </PortalDrawer>
      )}
    </>
  );
};

export default KanbanCard;
