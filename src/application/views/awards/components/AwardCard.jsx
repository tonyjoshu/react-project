import React from "react";
import { RiVipCrownLine } from "react-icons/ri";

function AwardCard({ data, addEntry, onClick }) {
  return (
    <div className="w-full grow h-[300px] bg-[#7D3CA5] relative rounded-lg p-4 flex flex-col justify-between text-white">
      <div className="h-[50%] w-[50%] absolute top-4 right-0">
        <img src={data.image} alt="" className="h-full w-full object-contain" />
      </div>
      {/* overlay gradient */}
      <div className="h-[50%] w-[50%] absolute top-4 right-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[#7D3CA5] z-20" />

      {/* crown icon */}
      <div className=" h-[40px] w-[40px] rounded-full flex items-center justify-center bg-white ">
        <RiVipCrownLine className="text-xl text-black" />
      </div>

      {!addEntry && (
        <p className="uppercase font-extrabold text-4xl z-30">{data.month}</p>
      )}

      <div className="flex flex-col z-30">
        <p className="capitalize font-extrabold text-lg">
          {data.type === "player"
            ? " Player of the month"
            : data.type === "manager"
            ? "Manager of the  month"
            : ""}
        </p>
        <p>NBC Premier League {data.season}</p>
      </div>

      {addEntry ? (
        <button
          onClick={onClick}
          className="bg-white text-[#7D3CA5] w-full py-2 rounded-xl capitalize font-extrabold whitespace-nowrap "
        >
          {data.type === "player"
            ? "add player of the month"
            : data.type === "manager"
            ? "add manager of the month"
            : "Add .."}
        </button>
      ) : (
        <div className="flex items-center space-x-2 z-30">
          <img
            src={data.team.logo}
            alt=""
            className="h-[50px] w-[50px] rounded-full"
          />

          <div className="flex flex-col space-y-[0px]">
            <p className="text-xl font-bold">{data.name}</p>
            <p className="text-sm">{data.team.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AwardCard;
