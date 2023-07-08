import { useState, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const ContainerInputsCheckboxs = ({ addNewCard, title, assign1, selectedStatus1, createfor1, createat1 }) => {

  console.log("Props in ContainerInputsCheckboxs:", title, assign1, selectedStatus1, createfor1, createat1);

  const [selectedStatus, setSelectedStatus] = useState('');

  const [assign, setAssign]=useState('');
  const [createfor, setCreatefor]=useState('')
  const [createat, setCreateat]=useState('')

  useEffect(() => {
    if (selectedStatus !== "" || assign !== "" || createfor !== "" || createat !== "") {
      const card = {
        title,
        assign,
        selectedStatus,
        createfor,
        createat,
      };
      addNewCard(card);
    }
  }, [selectedStatus, assign, createfor, createat]);

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
  const handleDropdownButtonSimpleTextOClose = (status) => {
    setSelectedStatus(status);
    setDropdownButtonSimpleTextOAnchorEl(null);
  };

  return (
    <div className="self-stretch flex flex-col py-2.5 px-[55px] items-center justify-center gap-[17px] z-[0] text-left text-smi text-darkslategray-200 font-inter">
      <div className="self-stretch h-[109px] flex flex-col items-center justify-between">
        <div className="self-stretch flex flex-row items-center justify-start gap-[181px]">
          <div className="w-[64.03px] flex flex-row items-center justify-between">
            <div className="flex flex-col py-[3px] px-0 items-start justify-start">
              <img
                className="relative w-[15.47px] h-[10.25px]"
                alt=""
                src="/vector2.svg"
              />
            </div>
            <div className="h-[17.8px] overflow-hidden flex flex-col pt-0 pb-[0.7999992370605469px] pr-[1.029998779296875px] pl-0 box-border items-center justify-between">
              <div className="relative leading-[16.8px]">Assign</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <input
              className="[border:none] font-inter text-smi bg-[transparent] relative leading-[21px] text-darkslategray-400 text-left"
              type="text"
              placeholder="Empty"
              value={assign || assign1}
              onChange={e=>{setAssign(e.target.value)}}
            />
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-row pt-0 px-0 pb-[0.3999992311000824px] items-center justify-start gap-[147px]">
            <div className="w-[90px] flex flex-row items-center justify-start gap-[6px]">
              <div className="overflow-hidden flex flex-row items-start justify-start">
                <img className="relative w-4 h-4" alt="" src="/frame.svg" />
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
                {selectedStatus.toString() || selectedStatus1 || "Choose Status" } 
              </Button>
              <Menu
                anchorEl={dropdownButtonSimpleTextOAnchorEl}
                open={dropdownButtonSimpleTextOOpen}
                onClose={handleDropdownButtonSimpleTextOClose}
              >
                <MenuItem onClick={()=>{handleDropdownButtonSimpleTextOClose("Not Started");setSelectedStatus('Not Started')}}>
                  Not Started
                </MenuItem>
                <MenuItem onClick={()=>{handleDropdownButtonSimpleTextOClose("Working");setSelectedStatus('Working')}}>
                  Working
                </MenuItem>
                <MenuItem onClick={()=>{handleDropdownButtonSimpleTextOClose("Testing");setSelectedStatus('Testing')}}>
                  Testing
                </MenuItem>
                <MenuItem onClick={()=>{handleDropdownButtonSimpleTextOClose("Completed");setSelectedStatus('Completed')}}>
                  Completed
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="self-stretch flex flex-row pt-0 px-0 pb-[0.3999992311000824px] items-center justify-start gap-[129px]">
            <div className="flex flex-row items-center justify-start gap-[5px]">
              <div className="overflow-hidden flex flex-row items-start justify-start">
                <img className="relative w-4 h-4" alt="" src="/frame1.svg" />
              </div>
              <div className="self-stretch w-[94px] overflow-hidden shrink-0 flex flex-row pt-0 pb-[0.7999992370605469px] pr-[0.48000335693359375px] pl-0 box-border items-center justify-start">
                <div className="relative leading-[16.8px]">Created for</div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start">
              <input
                className="[border:none] font-inter text-smi bg-[transparent] relative leading-[21px] text-darkslategray-100 text-left"
                type="text"
                placeholder="May 3, 2023 12:17 PM"
                value={createfor || createfor1}
                onChange={e=>{setCreatefor(e.target.value)}}
              />
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row pt-0 px-0 pb-[0.3999992311000824px] items-center justify-start gap-[142px]">
          <div className="w-[102.16px] h-[21px] flex flex-row items-center justify-start gap-[6px]">
            <div className="overflow-hidden flex flex-row items-start justify-start">
              <img className="relative w-4 h-4" alt="" src="/frame9.svg" />
            </div>
            <div className="overflow-hidden flex flex-row pt-0 pb-[0.7999992370605469px] pr-[0.160003662109375px] pl-0 items-start justify-start">
              <div className="relative leading-[16.8px]">Created at</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <input
              className="[border:none] font-inter text-smi bg-[transparent] relative leading-[21px] text-darkslategray-100 text-left"
              type="text"
              value={createat || createat1}
              placeholder="May 3, 2023 12:17 PM"
              onChange={e=>{setCreateat(e.target.value)}}
            />
          </div>
        </div>
      </div>
      <div className="h-[21px] flex flex-col p-2.5 box-border items-center justify-between">
        <div className="relative bg-darkslategray-300 w-[509px] h-px" />
      </div>
    </div>
  );
};

export default ContainerInputsCheckboxs;
