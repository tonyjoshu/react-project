import { ImCancelCircle } from "react-icons/im";
import { RiSearch2Line } from "react-icons/ri";
import DataTable from "./UserDataTable";

function SearchUsers({
  searchValue,
  filteredUsers,
  handleClearInput,
  handleInputChange,
  handleDeleteUser,
  name,
  email,
  phone,
  userTypeDef,
  country,
  showUpdatePopUp,
  handleCloseUpdatePopUp,
  handleUpdateUserPopUpOpen,
  userType,
  countryList,
  handleConfirmUpdateUser,
}) {
  return (
    <div className="w-full flex flex-col space-y-2">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center space-x-2 rounded-lg border-2 border-gray-300 w-full p-2 text-gray-500 font-bold"
      >
        <RiSearch2Line className="cursor-pointer" />
        <input
          type="text"
          placeholder="Search users by name, user type, email, phone or country"
          className="border-none outline-none h-full bg-transparent w-full"
          onChange={handleInputChange}
          value={searchValue}
        />
        {searchValue.length > 0 && (
          <ImCancelCircle
            onClick={handleClearInput}
            className="cursor-pointer"
          />
        )}
      </form>

      <DataTable
        users={filteredUsers}
        handleDeleteUser={handleDeleteUser}
        name={name}
        email={email}
        phone={phone}
        userTypeDef={userTypeDef}
        country={country}
        showUpdatePopUp={showUpdatePopUp}
        handleCloseUpdatePopUp={handleCloseUpdatePopUp}
        handleUpdateUserPopUpOpen={handleUpdateUserPopUpOpen}
        userType={userType}
        countryList={countryList}
        handleConfirmUpdateUser={handleConfirmUpdateUser}
      />
    </div>
  );
  s;
}

export default SearchUsers;
