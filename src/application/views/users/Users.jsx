import SearchUsers from "src/application/shared/components/users/SearchUsers";
import UsersHeader from "src/application/shared/components/users/UsersHeader";
import useUsers from "./useUsers";

function Users() {
  const hook = useUsers();

  return (
    <div className="flex flex-col w-full space-y-2">
      <UsersHeader
        count={hook.filteredUsers.length}
        name={{
          firstName: {
            value: hook.firstName,
            setter: hook.setFirstName,
          },
          lastName: {
            value: hook.lastName,
            setter: hook.setLastName,
          },
        }}
        email={{
          value: hook.email,
          setter: hook.setEmail,
        }}
        phone={{
          value: hook.phone,
          setter: hook.setPhone,
        }}
        userTypeDef={{
          value: hook.userTypeDef,
          setter: hook.setUserTypeDef,
        }}
        country={{
          value: hook.country,
          setter: hook.setCountry,
        }}
        showPopUp={hook.showAddUserForm}
        openPopUp={hook.handleAddUserFormOpen}
        closePopUp={hook.handleAddUserFormClose}
        userType={hook.userType}
        handleConfirmAddUser={hook.handleConfirmAddUser}
        countryList={hook.countryList}
      />
      <SearchUsers
        searchValue={hook.searchValue}
        filteredUsers={hook.filteredUsers}
        handleClearInput={hook.handleClearInput}
        handleInputChange={hook.handleInputChange}
        handleDeleteUser={hook.handleDeleteUser}
        showUpdatePopUp={hook.showUpdatePopUp}
        handleCloseUpdatePopUp={hook.handleCloseUpdatePopUp}
        handleUpdateUserPopUpOpen={hook.handleUpdateUserPopUpOpen}
        name={{
          firstName: {
            update_value: hook.update_firstName,
            update_setter: hook.set_update_FirstName,
          },
          lastName: {
            update_value: hook.update_lastName,
            update_setter: hook.set_update_LastName,
          },
        }}
        email={{
          update_value: hook.update_email,
          update_setter: hook.set_update_Email,
        }}
        phone={{
          update_value: hook.update_phone,
          update_setter: hook.set_update_Phone,
        }}
        userTypeDef={{
          update_value: hook.update_userTypeDef,
          update_setter: hook.set_update_UserTypeDef,
        }}
        country={{
          update_value: hook.update_country,
          update_setter: hook.set_update_Country,
        }}
        userType={hook.userType}
        countryList={hook.countryList}
        handleConfirmUpdateUser={hook.handleConfirmUpdateUser}
      />
    </div>
  );
}

export default Users;
