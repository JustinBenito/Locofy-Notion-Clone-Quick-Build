import { memo,useState, useMemo, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./Card";
import { color } from "@mui/system";

const KanbanLane = ({
  propJustifyContent,
  propColor,
  propCursor,
  propJustifyContent1,
  addCard,
  frame,
  title,
  items,
  frameOverflow,
  frameFlexShrink,
  frame1,
}) => {
  const [counterValue, setCounter] = useState(0);
  console.log("items", items);


  const { setNodeRef } = useDroppable({
    id: title,
  });

  // const [cards, setCards] = useState({});

  // const addNewCard = (newCard) => {
  //   setCards(newCard);
  //   console.log("cards:", newCard.title, newCard.assign,
  //   newCard.selectedStatus,
  //   newCard.createfor,
  //   newCard.createat)
  // };

  const [titlelane, setTitle] = useState(title);

  const countItems = items?.length || 0;


  const frameDivStyle = useMemo(() => {
    return {
      justifyContent: propJustifyContent,
    };
  }, [propJustifyContent, items]);

  const toDoStyle = useMemo(() => {
    return {
      color: propColor,
    };
  }, [propColor, items]);

  const buttonStyle = useMemo(() => {
    return {
      cursor: propCursor,
    };
  }, [propCursor, items]);

  const frameIconStyle = useMemo(() => {
    return {
      overflow: frameOverflow,
      flexShrink: frameFlexShrink,
    };
  }, [frameOverflow, frameFlexShrink, items]);

  const onClickHandle = () => {
    addCard();
  };

  const setCard = (title,cards) => {
    const lastIndex = items.length - 1;
    if (lastIndex >= 0) {
      items[lastIndex] = {
        ...items[lastIndex],
        title: title,
        assign: cards?.assign,
        selectedStatus:cards?.selectedStatus,
        createfor:cards?.createfor,
        createat:cards?.createat,
      };
      console.log("final items:", items);
    }
    console.log("i", items[lastIndex].title);
    console.log(items);

  };

  return (
    <>
      <div
        className={` self-stretch flex-1 flex flex-col items-center justify-center text-left text-sm text-darkslategray-400 font-inter md:flex-[unset] md:self-stretch `}
      >
        <div className="self-stretch flex flex-row items-center justify-between">
          <div
            className="flex flex-row items-center justify-center gap-[7px]"
            style={frameDivStyle}
          >
            <img
              className="relative w-4 h-4"
              alt="image"
              src={frame}
              style={frameIconStyle}
            />
            <input
              className="[border:none] font-medium font-inter text-xs bg-[transparent] relative leading-[21px] text-gray text-left"
              type="text"
              placeholder="To-do"
              onChange={(e) => setTitle(e.target.value)}
              style={toDoStyle}
              value={titlelane}
            />
            <div className="relative leading-[21px] flex items-center w-2 h-4 shrink-0">
              {countItems}
            </div>
          </div>
          <button
            className="[border:none] p-1 bg-gray-50 rounded-md flex flex-col items-start justify-start"
            style={buttonStyle}
            onClick={onClickHandle}
          >
            <img
              className="relative w-[12.03px] h-3 overflow-hidden shrink-0"
              alt=""
              src={frame1}
            />
          </button>
        </div>
        <div
          ref={setNodeRef}
          className={`bg-[${propColor}] self-stretch flex-1 flex flex-col items-center justify-center text-left text-sm text-darkslategray-400 font-inter md:flex-[unset] md:self-stretch`}
        >
          {items.map(({ title: cardname, uid, assign, selectedStatus, createfor, createat }, index) => (
            <KanbanCard
              cardtitle={cardname}
              setCard={setCard}
              key={index}
              uid={uid}
              index={index}
              parent={title}
              assign={assign}
              selectedStatus={selectedStatus}
              createfor={createfor}
              createat={createat}
              // addNewCard={addNewCard}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default KanbanLane;

const CardRender = memo(function CardRender(props) {

  return (
    <>
     <KanbanCard 
              cardtitle={props.cardtitle}
              setCard={props.setCard}
              key={props.key}
              uid={props.uid}
              index={props.index}
              parent={props.parent}
              assign={props.assign}
              selectedStatus={props.selectedStatus}
              createfor={props.createfor}
              createat={props.createat}
            />
    </>
  );
},(prev, next)=>{
  console.log("hi",{prev, next})
  return (prev.index == next.index && prev.cardtitle==next.cardtitle)}
);