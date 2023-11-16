import { useEffect, useState } from "react";
import CountryList from "country-list-with-dial-code-and-flag";
import toast from "react-hot-toast";

const useUsers = () => {
    const [searchValue, setSearchValue] = useState("");
    const userType = {
        ADMIN: "Admin",
        NORMAL_USER: "Normal User",
    };
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Clark Kent",
            userType: userType.ADMIN,
            email: "ClarkKent@mail.com",
            country: "Tanzania",
            phoneNumber: "+25578323567",
        },
        {
            id: 2,
            name: "Michael Broadley",
            userType: userType.NORMAL_USER,
            email: "MichaelBroadley@mail.com",
            country: "Tanzania",
            phoneNumber: "+25567345678",
        },
        {
            id: 3,
            name: "Claudia Michael",
            userType: userType.ADMIN,
            email: "ClaudiaMichael@mail.com",
            country: "Kenya",
            phoneNumber: "+25378390678",
        },
        {
            id: 4,
            name: "Jemma Simmons",
            userType: userType.NORMAL_USER,
            email: "JemmaSimmons@mail.com",
            country: "Kenya",
            phoneNumber: "+25371245678",
        },
    ]);

    const [filteredUsers, setFilteredUsers] = useState([]);
    useEffect(() => {
        setFilteredUsers((prev) => {
            prev = users;
            return prev;
        });
    }, [users]);

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.country.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.userType
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase()) ||
                user.phoneNumber
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
        );
        setFilteredUsers((prev) => {
            prev = filtered;
            return prev;
        });
    };

    const handleClearInput = () => {
        setSearchValue("");
        setFilteredUsers((prev) => {
            prev = users;
            return prev;
        });
    };

    // add user form values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [userTypeDef, setUserTypeDef] = useState("");
    const [country, setCountry] = useState("");

    // update user form values
    const [update_firstName, set_update_FirstName] = useState("");
    const [update_lastName, set_update_LastName] = useState("");
    const [update_email, set_update_Email] = useState("");
    const [update_phone, set_update_Phone] = useState("");
    const [update_userTypeDef, set_update_UserTypeDef] = useState("");
    const [update_country, set_update_Country] = useState("");

    const handleClearInputs = () => {
        setPhone("");
        setEmail("");
        setCountry("");
        setLastName("");
        setFirstName("");
        setUserTypeDef("");
        set_update_Phone("");
        set_update_Email("");
        set_update_Country("");
        set_update_LastName("");
        set_update_FirstName("");
        set_update_UserTypeDef("");
        setSearchValue("")
    };

    const countryList = CountryList;

    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const handleAddUserFormOpen = () => setShowAddUserForm(true);
    const handleAddUserFormClose = () => setShowAddUserForm(false);

    const handleConfirmAddUser = () => {
        if (
            firstName === "" ||
            lastName === "" ||
            userTypeDef === "" ||
            email === "" ||
            phone === "" ||
            country === ""
        ) {
            toast.error("make sure all inputs are filled before continuing");
            return;
        }

        const selectedCountry = countryList.find(
            (countryItem) => countryItem.name === country
        );
        const body = {
            id: users.length + 1,
            name: `${ firstName } ${ lastName }`,
            userType: userTypeDef,
            email,
            country: selectedCountry.name,
            phoneNumber: phone,
        };

        setUsers((prev) => {
            prev = [...prev, { ...body }];
            return prev;
        });
        handleAddUserFormClose();
        handleClearInputs();
    };

    const handleDeleteUser = ({ name, userType, phone_number }) => {
        const key = `${ name }-${ userType }-${ phone_number }`;
        const phoneNumber = users.filter(
            (user) => `${ user.name }-${ user.userType }-${ user.phoneNumber }` !== key
        );
        setUsers((prev) => {
            prev = phoneNumber;
            return prev;
        });
    };

    const [showUpdatePopUp, setShowUpdatePopUp] = useState(false);
    const handleCloseUpdatePopUp = () => {
        setShowUpdatePopUp(false);
        handleClearInputs();
    };

    // update user handlers
    const handleUpdateUserPopUpOpen = ({
        name,
        userType,
        email,
        country,
        phoneNumber,
    }) => {
        setShowUpdatePopUp(true);
        const [_firstName, _lastName] = name.split(" ");
        set_update_FirstName(_firstName);
        set_update_LastName(_lastName);
        set_update_Email(email);
        set_update_Phone(phoneNumber);
        set_update_UserTypeDef(userType);
        set_update_Country(CountryList.find(ct => ct.name.includes(country)).name);
    };

    const handleConfirmUpdateUser = ({ id }) => {
        if (
            update_firstName === "" ||
            update_lastName === "" ||
            update_userTypeDef === "" ||
            update_email === "" ||
            update_phone === "" ||
            update_country === ""
        ) {
            toast.error("make sure all inputs are filled before continuing");
            return;
        }

        const selectedCountry = countryList.find(
            (countryItem) => countryItem.name === update_country
        );
        const body = {
            id,
            name: `${ update_firstName } ${ update_lastName }`,
            userType: update_userTypeDef,
            email: update_email,
            country: selectedCountry.name,
            phoneNumber: update_phone,
        };

        setUsers(prev => {
            prev = prev.map(prevItem => prevItem.id === id ? body : prevItem)
            return prev
        })
        handleCloseUpdatePopUp();
    };

    return {
        searchValue,
        setSearchValue,
        filteredUsers,
        users,
        handleClearInput,
        setFilteredUsers,
        handleInputChange,
        // add user
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phone,
        setPhone,
        showAddUserForm,
        handleAddUserFormOpen,
        handleAddUserFormClose,
        userType,
        userTypeDef,
        setUserTypeDef,
        handleConfirmAddUser,
        countryList,
        country,
        setCountry,
        handleDeleteUser,
        // update user
        update_firstName,
        set_update_FirstName,
        update_lastName,
        set_update_LastName,
        update_email,
        set_update_Email,
        update_phone,
        set_update_Phone,
        update_userTypeDef,
        set_update_UserTypeDef,
        update_country,
        set_update_Country,
        showUpdatePopUp,
        handleCloseUpdatePopUp,
        handleUpdateUserPopUpOpen,
        handleConfirmUpdateUser
    };
};

export default useUsers;
