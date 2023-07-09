import KanbanLane from "../components/KanbanLane";
import { DndContext, rectIntersection } from "@dnd-kit/core";
import { useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";


const Board = () => {


  const editor=useBlockNote();

  const [todoItems, setTodoItems]=useState([])
  const [doneItems, setDoneItems]=useState([])
  const [inProgressItems, setInprogressItems]=useState([])

  const addTodo=(title)=>{
    setTodoItems([...todoItems, {title, uid: Date.now()}])
  }
  const addComp=(title)=>{
    setDoneItems([...doneItems, {title, uid: Date.now()}])
  }
  const addInp=(title)=>{
    setInprogressItems([...inProgressItems, {title, uid: Date.now()}])
  }




  return (
    <DndContext
    collisionDetection={rectIntersection}
    onDragEnd={(e)=>{
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
        setTodoItems([
          ...todoItems.slice(0, index),
          ...todoItems.slice(index + 1)
        ]);
      } else if (parent === "InProgress") {
        tempData = inProgressItems[index];
        setInprogressItems([
          ...inProgressItems.slice(0, index),
          ...inProgressItems.slice(index + 1)
        ]);
      } else if (parent === "Completed") {
        tempData = doneItems[index];
        setDoneItems([
          ...doneItems.slice(0, index),
          ...doneItems.slice(index + 1)
        ]);
      }

      if (container === "ToDo") {
        const isExisting = todoItems.some((item) => item.uid === uid);
        if (!isExisting) {
          setTodoItems([...todoItems, tempData]);
        }
      } else if (container === "InProgress") {
        const isExisting = inProgressItems.some((item) => item.uid === uid);
        if (!isExisting) {
          setInprogressItems([...inProgressItems, tempData]);
        }
      } else if (container === "Completed") {
        const isExisting = doneItems.some((item) => item.uid === uid);
        if (!isExisting) {
          setDoneItems([...doneItems, tempData]);
        }
      }
    }}
    
    
    
    
    >
    <div className="relative bg-white w-full overflow-hidden flex flex-col items-center justify-center">
      <div className="self-stretch rounded-xl bg-white h-[509.75px] flex flex-row p-10 box-border items-center justify-start">
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
                className="[border:none] font-inter text-sm bg-[transparent] flex-1 relative tracking-[0.1px] text-dimgray text-left"
                type="text"
                placeholder="A board to keep track of personal tasks."
                maxLength
                minLength
              />
            </div>
          </div>
          <div className="self-stretch flex-1 rounded-xl bg-white flex flex-row items-center justify-start gap-[24px] md:flex-col">
            <KanbanLane frame="/frame3.svg" frame1="/frame4.svg" 
            addCard={addTodo}
            title="ToDo"
              items={todoItems}/>
            <KanbanLane
              frame17JustifyContent="flex-start"
              frame="/svg.svg"
              frameOverflow="hidden"
              frameFlexShrink="0"
              toDoColor="#337ea9"
              frame1="/frame5.svg"
              addCard={addInp}
              items={inProgressItems}
              title="InProgress"
            />
            <KanbanLane
              frame17JustifyContent="flex-start"
              frame="/frame6.svg"
              frameOverflow="unset"
              frameFlexShrink="unset"
              toDoColor="#448361"
              frame1="/frame7.svg"
              addCard={addComp}
              items={doneItems}
              title="Completed"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[509.75px] overflow-hidden shrink-0" >
        <BlockNoteView editor={editor} />
      </div>
    </div>
    </DndContext>
  );
};

export default Board;
