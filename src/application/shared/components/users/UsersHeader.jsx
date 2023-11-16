import { IoIosAddCircleOutline } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import InputFieldCustom from "src/application/views/player-profile/components/player-personal-info/components/input-field-cutom";
import { mainColor } from "../../../../config/colors/colors";
import Label from "../Label";
import MaterialSelect from "../material-select";
import ModalPopUp from "../ModalPopUp";

function UsersHeader({
  count,
  name,
  email,
  phone,
  userTypeDef,
  country,
  showPopUp,
  openPopUp,
  closePopUp,
  userType,
  handleConfirmAddUser,
  countryList,
}) {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col space-y-0">
          <p className="text-3xl font-[800]">Users</p>
          <p className="text-sm text-gray-400 font-bold">
            {count ?? "n/a"} users
          </p>
        </div>
        <button
          onClick={openPopUp}
          style={{ backgroundColor: mainColor ?? "#212121" }}
          className="px-4 py-2 text-white flex items-center justify-center space-x-2 rounded-lg"
        >
          <IoIosAddCircleOutline />
          <p>Add new User</p>
        </button>
      </div>

      <ModalPopUp
        open={showPopUp}
        handleClose={closePopUp}
        height="fit-content"
        children={
          <>
            <p className="self-start text-3xl font-[800] capitalize">
              Add new User
            </p>
            <InputFieldCustom
              value={name.firstName.value}
              setter={name.firstName.setter}
              label="First name"
              placeholder="Enter your first name"
              capitalize
            />

            <InputFieldCustom
              value={name.lastName.value}
              setter={name.lastName.setter}
              label="Last name"
              placeholder="Enter your last name"
              capitalize
            />

            <InputFieldCustom
              value={email.value}
              setter={email.setter}
              label="Email"
              placeholder="Enter your email"
            />

            <InputFieldCustom
              value={phone.value}
              setter={phone.setter}
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
                    value={userTypeDef.value}
                    setter={userTypeDef.setter}
                    options={((user_types) => {
                      return user_types.map((type, index) => ({
                        label: type,
                        value: type,
                      }));
                    })(user_types)}
                  />
                );
              })(userType)}
            </div>

            <div className="flex flex-col space-y-1 w-full">
              <Label small marginLeft={10} a_s_left text={"Country"} />
              <MaterialSelect
                value={country.value}
                setter={country.setter}
                options={((countries) => {
                  return countries.map((country) => ({
                    label: country.name.split(" ")[0],
                    value: country.name,
                  }));
                })(countryList)}
              />
            </div>

            <button
              onClick={handleConfirmAddUser}
              style={{ backgroundColor: mainColor ?? "#212121" }}
              className="px-4 py-2 mt-2 text-white flex items-center justify-center space-x-2 rounded-lg self-end"
            >
              <RiSendPlaneFill />
              <p>Confirm adding user</p>
            </button>
          </>
        }
      />
    </>
  );
}

export default UsersHeader;
