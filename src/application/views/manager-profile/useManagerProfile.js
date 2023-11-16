import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import CountryList from "country-list-with-dial-code-and-flag";
import dayMonthFormatter from "../../../helper_functions/day-month-formatter";
import { uploadImageToCloudinary } from "../../../helper_functions/upload_to_cloudinary";
import { useAtomValue } from "jotai";
import { adminTokenConfig } from "../../../config/jotai/atoms";
import findCountry from "src/helper_functions/find-country";
import toast from "react-hot-toast";

const useManagerProfile = () => {
  const { manager_id } = useParams();

  let navigate = useNavigate()

  // token ocnfig
  const { config: _config } = useAtomValue(adminTokenConfig);

  // country list
  const countries = CountryList;

  // loading screen
  const [loading, setLoading] = useState(false);

  // player details
  const [playerDetails, setPlayerDetails] = useState();

  // default height
  const def_height = 150;

  // manager
  const [manager, setManager] = useState();
  const [managerHistory, setManagerHistory] = useState({});
  const [name, setName] = useState("");
  const [managerClub, setManagerClub] = useState("");
  const [country, setCountry] = useState("");
  const [height, setHeight] = useState(def_height);
  const [dob, setDob] = useState(null);
  // image
  const picInputRef = useRef();
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();

  // team list
  const [teams, setTeams] = useState([]);

  // use effect re-run variable
  const [rerunner, setRerunner] = useState(0);

  useEffect(() => {
    setLoading(true);
    let requests = [
      apiCall({ url: `${ URLS.managers }/${ manager_id }` }),
      apiCall({ url: URLS.teams }),
      apiCall({ url: `${ URLS.managerHistory }/${ manager_id }` }),
    ];
    Promise.allSettled(requests)
      .then((results) => {
        // manager info
        let country = findCountry(results[0].value.data.country_code) ?? findCountry(results[0].value.data.country);
        let formattedData = {
          ...results[0].value.data,
          countryName: country.name.split(",")[0],
        };

        setManager(formattedData);
        setName(formattedData.name);
        setManagerClub(formattedData.current_club._id);
        setTeams((prev) => {
          prev = results[1].value.data;
          return prev;
        });
        if (results[2].status === "fulfilled") {
          setManagerHistory((prev) => {
            let sortedStats = results[2].value?.data?.stats?.sort(
              (a, b) => parseInt(b.from.year) - parseInt(a.from.year)
            );
            prev = { ...results[2].value.data, stats: sortedStats };
            return prev;
          });
        }
      })
      .finally(() => setLoading(false));
  }, [rerunner]);

  // popup
  const [popUpOpen, setPopUpOpen] = useState(false);

  function handlePopUpOpen() {
    setPopUpOpen(true);
    setLoading(true);
    let requests = [
      apiCall({ url: `${ URLS.managers }/${ manager_id }` }),
      apiCall({ url: URLS.teams }),
    ];
    Promise.allSettled(requests)
      .then((results) => {
        // manager info
        let ct = countries.find(
          (_country) =>
            _country.dial_code === `+${ results[0].value.data.country_code }`
        );
        let formattedData = {
          ...results[0].value.data,
          countryName: ct.name.split(",")[0],
        };
        setManager(formattedData);
        setName(formattedData.name);
        setManagerClub(formattedData.current_club._id);
        setCountry(ct.code.replace("+", ""));
        setHeight(formattedData.height_in_cm);
        setDob(formattedData.dob);
        setImage(formattedData.pic);
        // teams info
        setTeams((prev) => {
          prev = results[1].value.data;
          return prev;
        });
      })
      .finally(() => setLoading(false));
  }

  function handlePopUpClose() {
    setPopUpOpen(false);
    setName("");
    setManagerClub("");
    setCountry("");
    setHeight(def_height);
    setImage();
    setImageFile();
  }

  async function handleConfirm() {
    if (country === "") {
      toast.error("Country field should not be empty")
      return
    }

    if (managerClub === "") {
      toast.error("Manager's club field should not be selected")
      return
    }

    if (name === "") {
      toast.error("Name field should not be empty")
      return
    }

    setLoading(true);
    const selectedCountry = await countries.find(
      (_country) => _country.code === country
    );
    let _body = {
      name: name,
      current_club: managerClub,
      country: selectedCountry.code,
      country_code: selectedCountry.dial_code.replace("+", ""),
      height_in_cm: height,
      dob: (function (date) {
        return `${ date.getFullYear() }-${ dayMonthFormatter(
          date.getMonth() + 1
        ) }-${ dayMonthFormatter(date.getDate()) }`;
      })(new Date(dob ?? new Date())),
      pic: (await uploadImageToCloudinary(imageFile)) ?? image,
    };

    apiCall({
      url: `${ URLS.managerEdit }/${ manager_id }`,
      method: "put",
      tokenRequired: true,
      config: _config,
      body: _body,
    })
      .then((resp) => { })
      .finally(() => {
        setLoading(false);
        handlePopUpClose();
        setRerunner((prev) => prev + 1);
      });
  }

  const [addHostoryPopUp, setAddHistoryPopUp] = useState(false);

  const [addHistoryTeamName, setAddHistoryTeamName] = useState("");

  const [managerHistoryStartDate, setManagerHistoruStartDate] = useState(
    (prev) => {
      prev = new Date();
      return prev;
    }
  );

  const [managerHistoryEndDate, setManagerHistoruEndDate] = useState((prev) => {
    let x = new Date();
    x.setFullYear(x.getFullYear() + 1);
    prev = x;
    return prev;
  });

  function handleAddHistoryPopUpOpen() {
    setAddHistoryPopUp(true);
  }

  function handleAddHistoryPopUpClose() {
    setAddHistoryPopUp(false);
    setAddHistoryTeamName("");
    setManagerHistoruStartDate((prev) => {
      prev = new Date();
      return prev;
    });
    setManagerHistoruEndDate((prev) => {
      let x = new Date();
      x.setFullYear(x.getFullYear() + 1);
      prev = x;
      return prev;
    });
  }

  function handleConfirmAddManagerHistory() {
    if (Boolean(managerHistoryStartDate === managerHistoryEndDate)) {
      toast.error("Start and End date cannot be equal")
      return
    }

    if (Boolean(addHistoryTeamName === "")) {
      toast.error("Team field should not be empty")
      return
    }
    setLoading(true);

    let _body = {
      manager: manager._id,
      stats: [
        {
          team: addHistoryTeamName,
          from: {
            year: managerHistoryStartDate.getFullYear(),
            month: managerHistoryStartDate.getMonth() + 1,
          },
          to: {
            year: managerHistoryEndDate.getFullYear(),
            month: managerHistoryEndDate.getMonth() + 1,
          },
        },
      ],
    };

    apiCall({
      url: URLS.managerHistoryAdd,
      method: "post",
      tokenRequired: true,
      config: _config,
      body: _body,
    })
      .then((resp) => { })
      .finally(() => {
        setLoading(true);
        handleAddHistoryPopUpClose();
        setRerunner((prev) => prev + 1);
      });
  }

  // remove manager
  const [removeManagerLoading, setRemoveManagerLoading] = useState(false)
  const [removeManagerPopUp, setRemoveManagerPopUp] = useState(false)
  const handleOpenRemovePopUp = () => setRemoveManagerPopUp(true)
  const handleCancelRemovePopUp = () => setRemoveManagerPopUp(false)
  const handleConfirmRemovePopUp = async () => {
    setRemoveManagerLoading(true);
    try {
      const response = await apiCall({
        url: `${ URLS.managers }/delete/${ manager_id }`,
        config: _config,
        method: "delete",
        tokenRequired: true,
      });
      setRemoveManagerPopUp(false);
      setRemoveManagerLoading(false);
      navigate(-1);
    } catch (error) {
      setRemoveManagerPopUp(false);
      setRemoveManagerLoading(false);
      console.log("error", error);
      toast.error("Could not delete the manager");
    }
  }

  return {
    playerDetails,
    loading,
    manager,
    countries,
    popUpOpen,
    handlePopUpOpen,
    handlePopUpClose,
    name,
    setName,
    managerClub,
    setManagerClub,
    teams,
    country,
    setCountry,
    height,
    setHeight,
    dob,
    setDob,
    picInputRef,
    image,
    setImage,
    setImageFile,
    handleConfirm,
    addHostoryPopUp,
    handleAddHistoryPopUpOpen,
    handleAddHistoryPopUpClose,
    managerHistoryStartDate,
    setManagerHistoruStartDate,
    managerHistoryEndDate,
    setManagerHistoruEndDate,
    handleConfirmAddManagerHistory,
    addHistoryTeamName,
    setAddHistoryTeamName,
    managerHistory,
    removeManagerLoading, removeManagerPopUp, handleOpenRemovePopUp, handleCancelRemovePopUp, handleConfirmRemovePopUp
  };
};

export default useManagerProfile;
