import Avatar from "@mui/material/Avatar";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { BsCheckCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { MdDelete, MdOutlineClear } from "react-icons/md";
import InputFieldCustom from "../input-field-cutom";
import Label from "../Label";
import MaterialSelect from "../material-select";
import ModalPopUp from "../ModalPopUp";

export default function DataTable({
  users,
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
  const [showPopUp, setShowPopUp] = useState(false); // for deletion
  const [rowUserId, setRowUserId] = useState(0);

  const handleRowClick = ({ row }) => {
    setRowUserId((prev) => {
      prev = row.id;
      return prev;
    });
    handleUpdateUserPopUpOpen({
      name: row.user.username,
      userType: row.userType,
      email: row.email,
      country: row.country,
      phoneNumber: row.phone,
    });
  };

  return (
    <div className="w-full h-[60vh] cursor-pointer">
      <DataGrid
        rows={rows(users)}
        columns={columns(handleDeleteUser)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        density={"standard"}
        disableColumnMenu
        editMode={"row"}
        onRowClick={handleRowClick}
      />

      {/* for update */}
      <ModalPopUp
        open={showUpdatePopUp}
        handleClose={handleCloseUpdatePopUp}
        height="fit-content"
        children={
          <>
            <p>
              <span className="font-bold">
                {name.firstName.update_value} {name.lastName.update_value}'s
              </span>{" "}
              information
            </p>

            <InputFieldCustom
              value={name.firstName.update_value}
              setter={name.firstName.update_setter}
              label="First name"
              placeholder="Enter your first name"
              capitalize
            />

            <InputFieldCustom
              value={name.lastName.update_value}
              setter={name.lastName.update_setter}
              label="Last name"
              placeholder="Enter your Last name"
              capitalize
            />

            <InputFieldCustom
              value={email.update_value}
              setter={email.update_setter}
              label="Email"
              placeholder="Enter your email"
            />

            <InputFieldCustom
              value={phone.update_value}
              setter={phone.update_setter}
              label="Phone"
              placeholder="Enter your phone"
            />

            <div className="flex flex-col space-y-1 w-full">
              <Label small marginLeft={10} a_s_left text={"User type"} />
              {((types) => {
                let user_types_set = new Set();
                for (const [key, value] of Object.entries(types)) {
                  user_types_set.add(value);
                }
                const user_types = [...user_types_set];
                return (
                  <MaterialSelect
                    value={userTypeDef.update_value}
                    setter={userTypeDef.update_setter}
                    options={((user_types) => {
                      return user_types.map((type) => ({
                        label: type,
                        value: type,
                      }));
                    })(user_types)}
                  />
                );
              })(userType)}
            </div>

            <div className="flex flex-col space-y-1 w-full">
              <Label small marginLeft={10} a_s_left text={"User type"} />
              <MaterialSelect
                value={country.update_value}
                setter={country.update_setter}
                options={((countries) => {
                  return countries.map((country) => ({
                    label: country.name.split(" ")[0],
                    value: country.name,
                  }));
                })(countryList)}
              />
            </div>

            <div className="flex items-center space-x-2 w-full mt-4">
              <button
                onClick={() => setShowPopUp(true)}
                className="w-full px-3 py-2 text-white capitalize rounded-lg bg-red-500 flex space-x-2 items-center justify-center"
              >
                <MdDelete />
                <p>delete</p>
              </button>

              <button
                onClick={() => handleConfirmUpdateUser({ id: rowUserId })}
                className="w-full px-3 py-2 capitalize rounded-lg bg-[#2F57A3] text-white flex space-x-2 items-center justify-center"
              >
                <BsFillCheckCircleFill />
                <p>update</p>
              </button>
            </div>
          </>
        }
      />

      {/* for deletion */}
      <ModalPopUp
        open={showPopUp}
        handleClose={() => setShowPopUp(false)}
        height="fit-content"
        width="fit-content"
        children={
          <>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-[800]">
                {name.firstName.update_value} {name.lastName.update_value}'s{" "}
              </span>
              details ?
            </p>
            <div className="flex items-center justify-center space-x-3 w-full">
              {[
                {
                  Icon: <MdOutlineClear />,
                  id: 1,
                  onClick: () => setShowPopUp(false),
                  label: "Cancel deletion",
                  color: "#EF4444",
                  text: "#fff",
                },
                {
                  Icon: <BsCheckCircleFill />,
                  id: 2,
                  onClick: () => {
                    handleDeleteUser({
                      name: `${name.firstName.update_value} ${name.lastName.update_value}`,
                      userType: `${userTypeDef.update_value}`,
                      phone_number: `${phone.update_value}`,
                    });
                    setShowPopUp(false);
                    handleCloseUpdatePopUp();
                  },
                  label: "Proceed to delete",
                  color: "#2F57A3",
                  text: "#fff",
                },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={btn.onClick}
                  style={{ backgroundColor: btn.color, color: btn.text }}
                  className="py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                >
                  {btn.Icon}
                  <p>{btn.label}</p>
                </button>
              ))}
            </div>
          </>
        }
      />
    </div>
  );
}

const columns = (handleDeleteUser) => {
  return [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      valueFormatter: (params) => params.value.username,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          <div className="h-[45px] aspect-square bg-[#2F57A3] text-white font-bold rounded-full flex items-center justify-center">
            <p>
              {((username) => {
                const splittedUsername = username.split(" ");
                return `${splittedUsername[0][0] ?? ""}.${
                  splittedUsername[1][0] ?? ""
                }`;
              })(params.value.username ?? "")}
            </p>
          </div>
          <p className="font-bold whitespace-nowrap">{params.value.username}</p>
        </div>
      ),
      sortComparator: (a, b) => (a.username > b.username ? 1 : -1),
    },
    { field: "userType", headerName: "User Type", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 120 },
    { field: "country", headerName: "Country", width: 130 },
  ];
};

const rows = (users) => {
  const usersList = users.map((user, index) => {
    return {
      id: user.id,
      user: {
        username: user.name,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8ma2KIUHWy3owG081-6NGNCMFbFtH6oI7A&usqp=CAU",
      },
      email: user.email,
      userType: user.userType,
      phone: user.phoneNumber,
      country: user.country,
    };
  });

  return usersList;
};
