import axios from "axios";
import CountryList from "country-list-with-dial-code-and-flag";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { routeStrings } from "src/application/routing/routes";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import { uploadImageToCloudinary } from "src/helper_functions/upload_to_cloudinary";

function usePlayersHook() {
  // config
  const adminTokenAtomValue = useAtomValue(adminTokenConfig);
  const imageInputRef = useRef(null);

  // for useeffect re-runs
  const [reRun, setRerun] = useState(0);
  const handleRefresh = () => setRerun(prev => prev + 1)

  const [image, setImage] = useState("");
  const [uploadedImageFile, set_uploadedImageFile] = useState();

  function handleImageSelect(event) {
    const fileUploaded = event.target.files[0];
    let localImageUrl = URL.createObjectURL(fileUploaded);
    setImage(localImageUrl);
    set_uploadedImageFile(fileUploaded);
  }

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

  // for bulk player adding
  const [playersBulkList, setPlayersBulkList] = useState([]);
  const [addToBulkLoading, setAddToBulkLoading] = useState(false);
  const [bulkUpdateLoading, setBulkUpdateLoading] = useState(false);
  const handleDeleteItem = (index) => {
    setPlayersBulkList((prev) => {
      prev = [...prev.slice(0, index), ...prev.slice(index + 1, prev.length)];
      return prev;
    });
  };

  const handleAddToBulkUpdate = async () => {
    if (name === "") return;
    if (country === "") return;
    if (height === "") return;
    if (currentClub === "") return;
    if (!uploadedImageFile) return;

    setAddToBulkLoading(true);
    let countryObj = CountryList.find((_country) => _country.name === country);
    let _currentClubId = clubs.find((club) => club.name === currentClub)._id;

    let x = {
      name,
      current_club: _currentClubId,
      dob: `${ dob.getFullYear() }-${ dob.getMonth() + 1 }-${ dob.getDate() }`,
      country: countryObj.code,
      country_code: countryObj.dial_code.replace("+", ""),
      height_in_cm: height,
      preview_pic: image,
      pic_to_upload: uploadedImageFile,
      shirt_no: 96,
    };

    setPlayersBulkList((prev) => {
      prev = [...prev, { ...x, countryObj }];
      return prev;
    });

    set_name("");
    set_currentClub("");
    set_dob(new Date("04-09-2000"));
    set_country("");
    set_height("150");
    set_uploadedImageFile();
    setImage("");
    setAddToBulkLoading(false);
  };

  const handleConfirmHandlePlayersInBulk = () => {
    if (playersBulkList.length === 0) return;

    setBulkUpdateLoading(true);
    let cloudinaryPromises = playersBulkList.map((playerInfo) => {
      return uploadImageToCloudinary(playerInfo.pic_to_upload);
    });

    Promise.allSettled(cloudinaryPromises)
      .then((results) => {
        let _bulkData = [];
        results.forEach((res, index) => {
          console.log("res", res);
          const { name, current_club, dob, country, country_code } =
            playersBulkList[index];
          let dataToSubmit = {
            name,
            current_club,
            dob,
            country,
            country_code,
            pic: res.value,
          };
          _bulkData.push(dataToSubmit);
        });

        console.log("_bulkData", _bulkData);

        let promises = _bulkData.map((dt) => {
          return apiCall({
            url: URLS.addPlayer,
            body: dt,
            tokenRequired: true,
            method: "post",
            config: adminTokenAtomValue.config,
          });
        });

        Promise.allSettled(promises)
          .then((results) => { })
          .finally(() => {
            setBulkUpdateLoading(false);
            setRerun((prev) => {
              prev = prev + 1;
              return prev;
            });
          });
      })
      .finally(() => {
        setBulkUpdateLoading(false);
      });
  };

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
    setPlayersBulkList([]);
    set_uploadedImageFile();
    setImage("");
  };

  function handleCountrySelectChange(event) {
    set_country(event.target.value);
  }

  let navigate = useNavigate();
  const goToPlayerProfile = (player_name) => {
    navigate(`${ routeStrings.playerProfile }/${ player_name }`);
  };

  // filtered players
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchQuerry, setSearchQuerry] = useState("");

  const handleClearSearchField = () => {
    setSearchQuerry("");
    setFilteredPlayers((prev) => {
      prev = players;
      return prev;
    });
  };

  const handleSearchFieldChange = async(event) => {
    if(event.target.value.length > 0) {
      try {
        const response = await apiCall({ url: `${URLS.players}?q=${event.target.value } `})
        if(response.statusText === "OK") {
           setPlayers(response.data)
        }

        if(response.statusText !== "OK") {
            toast.error("Failed to search players")
        }
      } catch(err) { 
         console.log(err)
      }
    } else {
        setRerun(1)
    }
  }

  useEffect(() => {
    setFilteredPlayers((prev) => {
      prev = players;
      return prev;
    });
  }, [players]);

  useEffect(() => {
    setLoading(true);
    set_countries(CountryList);
    let apiCalls = [getTeams(), apiCall({ url: URLS.players })];
    Promise.allSettled(apiCalls)
      .then((result) => {
        //RESULTS
        //console.log(result,'api call results')
        let _clubs = result[0].value.data;
        let sortedClubs = _clubs.sort((a, b) => (a.name > b.name ? 1 : -1));
        set_clubs(sortedClubs);

        let _players = result[1].value.data;
        let sortedPlayers = _players.sort((a, b) => (a.name > b.name ? 1 : -1));
        setPlayers(sortedPlayers);
      })
      .finally(async () => setLoading(false));
  }, [reRun]);


  const addPlayer = async () => {
    if (name === "") {
      toast.error("Name should be filled")
      return
    }
    if (country === "") {
      toast.error("Country should be selected")
      return
    }

    if (currentClub === "") {
      toast.error("Current club should be selected")
      return
    }

    if (!uploadedImageFile) {
      toast.error("Please select an image to be uploaded")
      return
    }


    setModalLoading(true);
    let countryObj = CountryList.find((_country) => _country.name === country);
    let _currentClubId = clubs.find((club) => club.name === currentClub)._id;
    let secureUrl = await uploadImageToCloudinary(uploadedImageFile);

    let body = {
      name,
      current_club: _currentClubId,
      dob: `${ dob.getFullYear() }-${ dob.getMonth() + 1 }-${ dob.getDate() }`,
      country: countryObj.code,
      country_code: countryObj.dial_code.replace("+", ""),
      height_in_cm: height,
      pic: secureUrl,
      shirt_no: 96,
    };

    apiCall({
      url: URLS.addPlayer,
      body,
      tokenRequired: true,
      method: "post",
      config: adminTokenAtomValue.config,
    })
      .then((res) => { })
      .finally(() => {
        setModalLoading(false);
        setRerun((prev) => {
          prev = prev + 1;
          return prev;
        });
        handleModalClose()
      });
  };

  function handleAddPlayer() {
    alert("adding new players");
  }

  function handleSelectClubChange(event) {
    set_currentClub(event.target.value);
  }

  // api call functions
  async function getTeams() {
    return axios.get(URLS.teams);
  }

  async function getCountrires() {
    return axios.get(URLS.countryListApi);
  }

  return {
    handleAddPlayer,

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

    goToPlayerProfile,

    playersBulkList,
    handleAddToBulkUpdate,
    addToBulkLoading,
    handleDeleteItem,
    handleConfirmHandlePlayersInBulk,
    bulkUpdateLoading,
    filteredPlayers,
    searchQuerry,
    handleClearSearchField,
    handleSearchFieldChange,

    handleRefresh
  };
}

export default usePlayersHook;
