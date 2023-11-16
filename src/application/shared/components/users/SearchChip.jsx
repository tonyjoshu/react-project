import { useAtom } from "jotai";
import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import selectedFiltersAtom from "../../../../application/views/users/selectedFiltersAtom";

function SearchChip({ label, clicked, setFilteredUsers }) {
  const [isActive, setIsActive] = useState(false);
  const [_, setSelectedFiltersAtom] = useAtom(selectedFiltersAtom);
  const toggle = () => {
    if (isActive) {
      setFilteredUsers((prev) => {
        prev = prev.filter((filterItem) => filterItem.userType !== label);
        return prev;
      });
      //   setSelectedFiltersAtom((prev) => {
      //     prev = prev.filter((filterItem) => filterItem !== label);
      //     return prev;
      //   });
      setIsActive(false);
    } else {
      setFilteredUsers((prev) => {
        prev = prev.filter((filterItem) => filterItem.userType === label);
        return prev;
      });
      //   setSelectedFiltersAtom((prev) => {
      //     prev = [...prev, label];
      //     return prev;
      //   });
      //   setSelectedFiltersAtom((prev) => {
      //     prev = [...prev, label];
      //     return prev;
      //   });
      setIsActive(true);
    }
  };
  return (
    <div
      onClick={toggle}
      className="h-[30px] bg-gray-300 w-[fit-content] px-4 py-1 rounded-full flex items-center justify-center gap-2 text-gray-500 select-none cursor-pointer"
      style={{
        backgroundColor: isActive ? "#474C55" : "",
        color: isActive ? "#fff" : "",
      }}
    >
      <p className="text-sm font-bold capitalize">
        {label.replaceAll("_", " ")}
      </p>
      {isActive && <HiCheckCircle />}
    </div>
  );
}

export default SearchChip;
