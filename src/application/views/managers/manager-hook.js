import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { adminTokenConfig } from "src/config/jotai/atoms";
import axios from "axios";
import URLS from "src/config/urls/urls";
import CountryList from "country-list-with-dial-code-and-flag";
import { uploadImageToCloudinary } from "src/helper_functions/upload_to_cloudinary";
import apiCall from "src/helper_functions/api_call";
import { useNavigate } from "react-router-dom";
import { routeStrings } from "src/application/routing/routes";
import imageSelect from "./helpers/handle-image-select";
import popUpFormValidation from "./helpers/popup-form-validation";

function useManagersHook() {
  // config
  const adminTokenAtomValue = useAtomValue(adminTokenConfig);
  const imageInputRef = useRef(null);

  const [image, setImage] = useState("");
  const [uploadedImageFile, set_uploadedImageFile] = useState();

  // image selection
  const handleImageSelect = (event) =>
    imageSelect(event, setImage, set_uploadedImageFile);

  const [clubs, set_clubs] = useState();
  const [countries, set_countries] = useState();

  const [loading, setLoading] = useState(false);

  // player data fetch
  const [players, setPlayers] = useState();

  // to be submitted
  const [name, set_name] = useState("");
  const [currentClub, set_currentClub] = useState("");
  const [dob, set_dob] = useState(new Date("04-09-2000"));
  const [country, set_country] = useState("");
  const [height, set_height] = useState("150");

  // for pop-up
  const [modalLoading, setModalLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    set_name("");
    set_currentClub("");
    set_dob(new Date("04-09-2000"));
    set_country("");
    set_height("150");
  };

  // managers
  const [managers, setManagers] = useState([])

  // for use effect rerun
  const [rerun, setRerun] = useState(0)

  useEffect(() => {
    setLoading(true);
    apiCall({ url: URLS.managers })
      .then(resp => setManagers(resp.data))
      .finally(() => {
        setLoading(false);
      })
  }, [rerun])

  const handleCountrySelectChange = (event) => {
    set_country(event.target.value);
  };

  let navigate = useNavigate();
  const goToManagerProfile = (manager_id) => {
    navigate(`${ routeStrings.managerProfile }/${ manager_id }`);
  }

  const addPlayer = async () => {
    const validated = popUpFormValidation(
      name,
      country,
      height,
      currentClub,
      uploadedImageFile
    );
    if (!validated) return;

    setModalLoading(true);
    let countryObj = CountryList.find((_country) => _country.name === country);
    let _currentClubId = clubs.find((club) => club.name === currentClub)._id;
    let secureUrl = await uploadImageToCloudinary(uploadedImageFile);

    let body = {
      name,
      current_club: _currentClubId,
      dob: `${ dob.getFullYear() }-${ dob.getMonth() + 1 }-${ dob.getDate() }`,
      country: countryObj.name,
      country_code: countryObj.dial_code.replace("+", ""),
      height_in_cm: height,
      pic: secureUrl,
      shirt_no: 96,
    };

    // adding a player
    apiCall({
      url: URLS.addPlayer,
      body,
      tokenRequired: true,
      method: "post",
      config: adminTokenAtomValue.config,
    })
      .then((res) => console.log({ res: res.data }))
      .finally(() => {
        setModalLoading(false);
        setRerun(prev => prev + 1)
      });
  };

  function handleSelectClubChange(event) {
    set_currentClub(event.target.value);
  }

  // filtered managers
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [searchQuerry, setSearchQuerry] = useState("");

  const handleClearSearchField = () => {
    setSearchQuerry("");
    setFilteredManagers((prev) => {
      prev = managers;
      return prev;
    });
  };

  const handleSearchFieldChange = (event) => {
    setSearchQuerry(event.target.value);

    if (event.target.value === "") {
      setFilteredManagers((prev) => {
        prev = managers;
        return prev;
      });
    } else {
      const _filteredManagers = managers.filter(
        (_manager) =>
          _manager.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          _manager.current_club.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          CountryList.find(
            (cty) => cty.dial_code.replace("+", "") === _manager.country_code
          )
            .name.toLowerCase()
            .includes(event.target.value.toLowerCase())
      );
      setFilteredManagers((prev) => {
        prev = _filteredManagers;
        return prev;
      });
    }
  };

  useEffect(() => {
    setFilteredManagers((prev) => {
      prev = managers;
      return prev;
    });
  }, [managers]);

  // api call functions
  async function getTeams() {
    return axios.get(URLS.teams);
  }

  useEffect(() => {
    setLoading(true);
    set_countries(CountryList);
    let apiCalls = [getTeams(), apiCall({ url: URLS.players })];
    Promise.allSettled(apiCalls)
      .then((result) => {
        let _clubs = result[0].value.data;
        let sortedClubs = _clubs.sort((a, b) => (a.name > b.name ? 1 : -1));
        set_clubs(sortedClubs);
      })
      .finally(async () => setLoading(false));
  }, []);

  return {
    clubs,
    currentClub,
    handleSelectClubChange,

    name,
    set_name,

    dob,
    set_dob,

    height,
    set_height,

    imageInputRef,
    image,
    uploadedImageFile,
    handleImageSelect,

    countries,
    country,
    handleCountrySelectChange,

    addPlayer,

    modalOpen,
    handleModalOpen,
    handleModalClose,
    modalLoading,

    loading,
    players,

    goToManagerProfile,

    managers,
    filteredManagers,
    searchQuerry,
    handleClearSearchField,
    handleSearchFieldChange
  };
}

export default useManagersHook;
