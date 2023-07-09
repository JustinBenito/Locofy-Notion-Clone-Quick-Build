import { useState, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const Drawer = ({ onClose, assign1, selectedState1, createfor1, createat1, title, addNewCard }) => {

  const [selectedState, setSelectedState]=useState('')
  const [assign, setAssign]=useState('')
  const [createfor, setCreatefor]=useState('')
  const [createat, setCreateAt]=useState('')
  const [title1, setTitle]=useState(title)

    useEffect(()=>{
      console.log(selectedState, assign, createfor, createat, title1);
        if(selectedState!=="" || assign!=="" || createfor!=="" || createat!=="" || title1!==''){
          const card={
            title1,
            assign,
            selectedState,
            createfor,
            createat
          }
          addNewCard(card)
        }
    },[selectedState, assign, createfor, createat, title1])



  const [
    dropdownButtonSimpleTextOAnchorEl,
    setDropdownButtonSimpleTextOAnchorEl,
  ] = useState(null);
  const dropdownButtonSimpleTextOOpen = Boolean(
    dropdownButtonSimpleTextOAnchorEl
  );
  const handleDropdownButtonSimpleTextOClick = (event) => {
    setDropdownButtonSimpleTextOAnchorEl(event.currentTarget);
  };
  const handleDropdownButtonSimpleTextOClose = () => {
    setDropdownButtonSimpleTextOAnchorEl(null);
  };
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  return (
    <div
      className="relative bg-white shadow-[0px_0px_0px_1px_rgba(15,_15,_15,_0.02),_0px_3px_6px_rgba(15,_15,_15,_0.03),_0px_9px_24px_rgba(15,_15,_15,_0.06)] w-[548px] h-full overflow-hidden flex flex-col items-start justify-start [&.animate]:animate-[0.25s_ease_0s_1_normal_forwards_slide-in-right] opacity-[0] max-w-[90%] text-left text-smi text-darkslategray-300 font-inter"
      data-animate-on-scroll
    >
      <div className="flex-1 w-[702px] overflow-hidden flex flex-row items-start justify-between">
        <div className="w-[702px] h-[309px] flex flex-col pt-[38px] px-0 pb-[594.6099853515625px] box-border items-start justify-start gap-[5px]">
          <div className="self-stretch flex flex-col py-0 px-[55px] items-start justify-start z-[1]">
            <div className="flex flex-col py-2.5 px-0 items-start justify-start">
              <input
                className="[border:none] font-inter text-[31px] bg-[transparent] relative leading-[38.4px] font-bold text-darkslategray-100 text-left"
                type="text"
                placeholder="Enter Title"
                value={title1||title}
                onChange={e=>{setTitle(e.target.value)}}
              />
            </div>
          </div>
          <div className="self-stretch flex flex-col py-2.5 px-[55px] items-center justify-center gap-[17px] z-[0]">
            <div className="self-stretch h-[109px] flex flex-col items-center justify-between">
              <div className="self-stretch flex flex-row items-center justify-start gap-[181px]">
                <div className="w-[64.03px] flex flex-row items-center justify-between">
                  <div className="flex flex-col py-[3px] px-0 items-start justify-start">
                    <img
                      className="relative w-[15.47px] h-[10.25px]"
                      alt=""
                      src="/vector.svg"
                    />
                  </div>
                  <div className="h-[17.8px] overflow-hidden flex flex-col pt-0 pb-[0.7999992370605469px] pr-[1.029998779296875px] pl-0 box-border items-center justify-between">
                    <div className="relative leading-[16.8px]">Assign</div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start">
                  <input
                    className="[border:none] font-inter text-smi bg-[transparent] relative leading-[21px] text-darkslategray-200 text-left"
                    type="text"
                    placeholder="Empty"
                    value={assign1 || assign}
                    onChange={e=>{setAssign(e.target.value)}}
                  />
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start">
                <div className="self-stretch flex flex-row pt-0 px-0 pb-[0.3999992311000824px] items-center justify-start gap-[147px]">
                  <div className="w-[90px] flex flex-row items-center justify-start gap-[6px]">
                    <div className="overflow-hidden flex flex-row items-start justify-start">
                      <img
                        className="relative w-4 h-4"
                        alt=""
                        src="/frame.svg"
                      />
                    </div>
                    <div className="flex flex-row pt-0 px-0 pb-[0.7999992370605469px] items-center justify-start">
                      <div className="relative leading-[16.8px]">Status</div>
                    </div>
                  </div>
                  <div>
                    <Button
                      id="button-Choose Status"
                      aria-controls="menu-Choose Status"
                      aria-haspopup="true"
                      aria-expanded={
                        dropdownButtonSimpleTextOOpen ? "true" : undefined
                      }
                      onClick={handleDropdownButtonSimpleTextOClick}
                      color="primary"
                    >
                      {selectedState1 || selectedState.toString() || "Choose Status" }
                    </Button>
                    <Menu
                      anchorEl={dropdownButtonSimpleTextOAnchorEl}
                      open={dropdownButtonSimpleTextOOpen}
                      onClose={handleDropdownButtonSimpleTextOClose}
                    >
                      <MenuItem onClick={()=>{handleDropdownButtonSimpleTextOClose; setSelectedState('Not Started')}}>
                        Not Started
                      </MenuItem>
                      <MenuItem onClick={()=>{handleDropdownButtonSimpleTextOClose; setSelectedState('Working')}}>
                        Working
                      </MenuItem>
                      <MenuItem onClick={()=>{handleDropdownButtonSimpleTextOClose; setSelectedState('Testing')}}>
                        Testing
                      </MenuItem>
                      <MenuItem onClick={()=>{handleDropdownButtonSimpleTextOClose; setSelectedState('Completed')}}>
                        Completed
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                <div className="self-stretch flex flex-row pt-0 px-0 pb-[0.3999992311000824px] items-center justify-start gap-[129px]">
                  <div className="flex flex-row items-center justify-start gap-[5px]">
                    <div className="overflow-hidden flex flex-row items-start justify-start">
                      <img
                        className="relative w-4 h-4"
                        alt=""
                        src="/frame1.svg"
                      />
                    </div>
                    <div className="self-stretch w-[94px] overflow-hidden shrink-0 flex flex-row pt-0 pb-[0.7999992370605469px] pr-[0.48000335693359375px] pl-0 box-border items-center justify-start">
                      <div className="relative leading-[16.8px]">
                        Created for
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-start">
                    <input
                      className="[border:none] font-inter text-smi bg-[transparent] relative leading-[21px] text-darkslategray-100 text-left"
                      type="text"
                      placeholder="May 3, 2023 12:17 PM"
                      value={createfor1 || createfor }
                      onChange={e=>setCreatefor(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row pt-0 px-0 pb-[0.3999992311000824px] items-center justify-start gap-[142px]">
                <div className="w-[102.16px] h-[21px] flex flex-row items-center justify-start gap-[6px]">
                  <div className="overflow-hidden flex flex-row items-start justify-start">
                    <img
                      className="relative w-4 h-4"
                      alt=""
                      src="/frame2.svg"
                    />
                  </div>
                  <div className="overflow-hidden flex flex-row pt-0 pb-[0.7999992370605469px] pr-[0.160003662109375px] pl-0 items-start justify-start">
                    <div className="relative leading-[16.8px]">Created at</div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start">
                  <input
                    className="[border:none] font-inter text-smi bg-[transparent] relative leading-[21px] text-darkslategray-100 text-left"
                    type="text"
                    placeholder="May 3, 2023 12:17 PM"
                    value={createat1 || createat }
                    onChange={e=>setCreateAt(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="h-[21px] flex flex-col p-2.5 box-border items-center justify-between">
              <div className="relative bg-darkslategray-400 w-[509px] h-px" />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch bg-whitesmoke overflow-hidden flex flex-row py-[61px] px-[88px] items-center justify-start text-[40px] text-black">
        <div className="relative">
          <p className="m-0">
            <b>Hello</b>
          </p>
          <p className="m-0 text-[16px] font-light">this is Markdown here :)</p>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
