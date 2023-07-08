import KanbanLane from "../components/KanbanLane"; 
import { closestCenter, DndContext, rectIntersection } from "@dnd-kit/core";
import { useState } from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

const Board = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);

    console.log("todo:", todoItems);
    console.log("done:", doneItems);
    console.log("inProgressItems:", inProgressItems);

    let temp;
    const editor = useBlockNote();

    const addComp = (title) => {
        console.log("title:",title)
        setDoneItems([...doneItems, { title,uid: Date.now() }]);
    };
    const addTodo = (title) => {
      console.log("title:",title)
        setTodoItems([...todoItems, { title,uid: Date.now() }]);
    };
    const addInp = (title) => {
      console.log("title:",title)
        setInProgressItems([...inProgressItems, { title,uid: Date.now() }]);
    };


    const arrayLanes = [
        {
            title: "ToDo",
            items: todoItems,
            color: "gray",
            svg: "/frame2.svg",
            frame1: "/frame3.svg",
            addCard: addTodo
        },
        {
            title: "InProgress",
            items: inProgressItems,
            color: "#337ea9",
            svg: "/svg.svg",
            frame1: "/frame4.svg",
            addCard: addInp
        },
        {
            title: "Completed",
            items: doneItems,
            color: "#448361",
            svg:"/frame5.svg",
            frame1:"/frame21.svg",
            addCard: addComp
        },
    ]


  return (
<DndContext
      collisionDetection={rectIntersection}
      onDragEnd={(e) => {
        console.log("todoItems",todoItems,"InProgress",inProgressItems,"doneItems",doneItems)
        const container = e.over?.id;
        const title = e.active.data.current?.cardtitle || "Enter a task";
        const index = e.active.data.current?.index || 0;
        const parent = e.active.data.current?.parent || "Completed";
        const uid = e.active.data.current?.uid;

        if (!container || !parent) return;

        if (container === parent) {
          return;
        }

        let tempData = null;

        if (parent === "ToDo") {
          tempData = todoItems[index];
          console.log("tempData",tempData)
          setTodoItems([
            ...todoItems.slice(0, index),
            ...todoItems.slice(index + 1)
          ]);
        } else if (parent === "InProgress") {
          tempData = inProgressItems[index];
          console.log("tempData",tempData)
          setInProgressItems([
            ...inProgressItems.slice(0, index),
            ...inProgressItems.slice(index + 1)
          ]);
        } else if (parent === "Completed") {
          tempData = doneItems[index];
          console.log("tempData",tempData)
          setDoneItems([
            ...doneItems.slice(0, index),
            ...doneItems.slice(index + 1)
          ]);
        }

        if (container === "ToDo") {
          const isExisting = todoItems.some((item) => item.uid === uid);
          if (!isExisting) {
            setTodoItems([...todoItems, tempData]);
            console.log("add pantu",todoItems);
          }
        } else if (container === "InProgress") {
          const isExisting = inProgressItems.some((item) => item.uid === uid);
          if (!isExisting) {
            setInProgressItems([...inProgressItems, tempData]);
            console.log("add pantu",inProgressItems);
          }
        } else if (container === "Completed") {
          const isExisting = doneItems.some((item) => item.uid === uid);
          if (!isExisting) {
            setDoneItems([...doneItems, tempData]);
            console.log("add pantu",doneItems);
          }
        }
      }}
    >

    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-center">
      <div className="self-stretch rounded-xl bg-white flex flex-row p-10 box-border items-center justify-start">
        <div className="self-stretch flex-1 flex flex-col py-0 px-[45px] items-center justify-start gap-[24px]">
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row p-2.5 items-start justify-start">
              <input
                className="[border:none] font-inter text-[32px] bg-[transparent] flex-1 relative font-bold text-black text-left"
                type="text"
                placeholder="Notion Board"
                maxLength
                minLength
              />
            </div>
            <div className="self-stretch flex flex-row p-2.5 items-start justify-start">
              <input
                className="[border:none] font-inter text-sm bg-[transparent] flex-1 relative tracking-[0.1px] text-dark-grey text-left"
                type="text"
                placeholder="A board to keep track of personal tasks."
                maxLength
                minLength
              />
            </div>
          </div>
          <div className="self-stretch rounded-xl bg-white flex flex-row items-center justify-start gap-[24px] md:flex-col">
            <KanbanLane 
            frame="/frame2.svg" 
            frame1="/frame3.svg" 
            propJustifyContent="flex-start"
            propColor="#898989"
              propCursor="pointer"
              frameFlexShrink="0"
              frameOverflow="hidden"
              addCard={addTodo}
              title="ToDo"
              items={todoItems}
              />
            <KanbanLane
              propJustifyContent="flex-start"
              propColor="#337ea9"
              propCursor="pointer"
              frame="/svg.svg"
              frameOverflow="hidden"
              frameFlexShrink="0"
              frame1="/frame4.svg"
              addCard={addInp}
              title="InProgress"
              items={inProgressItems}
            />
            <KanbanLane
              propJustifyContent="flex-start"
              propColor="#448361"
              propCursor="pointer"
              frame="/frame5.svg"
              counterValue="0"
              frameOverflow="unset"
              frameFlexShrink="unset"
              frame1="/frame21.svg"
              addCard={addComp}
              title="Completed"
              items={doneItems}
            />
            
</div>
        </div>
      </div>

      <div className="w-full h-full overflow-hidden shrink-0" >
      <BlockNoteView editor={editor} />
      </div>
    </div>
    </DndContext>
  );
};

export default Board;
