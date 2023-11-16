import { RiSearch2Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";

function ManagersSearchInput({
  searchQuerry,
  handleSearchFieldChange,
  handleClearSearchField,
}) {
  return (
    <div className="w-[90%] z-50 backdrop-blur-sm mx-auto mb-4 shadow-md font-bold text-gray-700 border border-gray-500 px-4 py-2 rounded-lg flex items-center space-x-2 sticky top-[80px]">
      <RiSearch2Line />
      <input
        value={searchQuerry}
        onChange={handleSearchFieldChange}
        type="text"
        placeholder="Search manager(s) by name, team or country ..."
        className="w-full outline-none border-none bg-transparent"
      />
      {searchQuerry.length > 0 && (
        <TiDeleteOutline
          onClick={handleClearSearchField}
          className="text-xl cursor-pointer"
        />
      )}
    </div>
  );
}

export default ManagersSearchInput;
