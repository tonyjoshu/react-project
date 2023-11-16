import axios from "axios";
import URLS from "src/config/urls/urls";
import { useEffect, useRef, useState } from "react";
import apiCall from "src/helper_functions/api_call";
import generateYearsList from "../../../helper_functions/generate-yers-list";
import { useAtomValue } from "jotai";
import { adminTokenConfig } from "src/config/jotai/atoms";
import { uploadImageToCloudinary } from "src/helper_functions/upload_to_cloudinary";

function useTeamsHook() {
  const { config } = useAtomValue(adminTokenConfig);

  const [color, setColor] = useState("#aabbcc");
  const [manualColor, setmanualColor] = useState("");
  const handleColorChange = (newColor) => setColor(newColor);
  const handleManualColorChange = (event) => {
    setmanualColor(event.target.value);
    if (event.target.value.length === 6) {
      setColor(`#${ event.target.value }`);
    }
  };

  const [seasons, setseasons] = useState([]);

  const seasonYears = generateYearsList();

  const getIndex = (seasonYears) => {
    return seasonYears.findIndex((season) =>
      (function (season, seasonYears) {
        return (
          season ===
          `${ new Date().getFullYear() }-${ new Date().getFullYear() + 1 }`
        );
      })(season, seasonYears)
    );
  };

  const checkMonth = (index) => {
    let seasonIndex = null;
    if (new Date().getMonth() >= 8) seasonIndex = index;
    else seasonIndex = index - 1;
    return seasonIndex;
  };

  const [selectedSeasonIndex, setselectedSeasonIndex] = useState(
    checkMonth(getIndex(seasonYears))
  );

  const handleSeasonSwitch = (_, newIndex) => setselectedSeasonIndex(newIndex);

  const [loading, setLoading] = useState(false);
  const [popUpOpen, setpopUpOpen] = useState(false);
  const [editPopUpOpen, seteditPopUpOpen] = useState(false);
  const [teamData, setteamData] = useState([]);
  const [filteredTeamData, setfilteredTeamData] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamUpdateName, setTeamUpdateName] = useState("");
  const [teamNockName, setTeamNockName] = useState("");
  const [teamUpdateNockName, setTeamUpdateNockName] = useState("");
  const [yearEstablished, setyearEstablished] = useState("");
  const [trophiesWon, settrophiesWon] = useState("");
  const [teamId, setteamId] = useState("");
  const [teamUpdateId, setteamUpdateId] = useState("");

  // search input value
  const [searchQuerry, setSearchQuerry] = useState("")
  const handleClearSearchField = () => {
    setSearchQuerry("")
    setfilteredTeamData(prev => { prev = teamData; return prev })
  }
  const handleSearchFieldChange = (event) => {
    setSearchQuerry(event.target.value)

    if (event.target.value === "") {
      setfilteredTeamData(prev => { prev = teamData; return prev })
    } else {
      const _filteredTeams = teamData.filter(team => team.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setfilteredTeamData(prev => { prev = _filteredTeams; return prev })
    }
  }

  const [selectedImage, setselectedImage] = useState("");
  const hiddenFileInput = useRef(null);
  const [uploadedImageFile, setuploadedImageFile] = useState();

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setselectedImage(URL.createObjectURL(fileUploaded));
    setuploadedImageFile(fileUploaded);
    console.log({ fileUploaded });
  };

  const handleTeamNameChange = (event) => setTeamName(event.target.value);
  const handleTrophiesWonChange = (event) => settrophiesWon(event.target.value);
  const handleTeamNockNameChange = (event) => {
    setTeamNockName(event.target.value);
  };
  const handleyearEstablishedChange = (event) => {
    setyearEstablished(event.target.value);
  };

  const [popUpLoading, setPopUpLoading] = useState(false);

  useEffect(() => {
    setfilteredTeamData(prev => { prev = teamData; return prev })
  }, [teamData])

  const [reRun, setRerun] = useState(0)
  const handleRefresh = () => setRerun(prev => prev + 1)
  useEffect(() => {
    setLoading(true);
    const promises = [
      apiCall({ url: URLS.teams, method: "get" }),
      apiCall({ url: URLS.players, method: "get" })
    ]

    Promise.allSettled(promises)
      .then(results => {
        let sortedData = sortByName(results[0].value.data)

        let newTeamData = []
        sortedData.forEach(team => {
          let teamPlayersCount = results[1].value?.data?.filter(player => player?.current_club?._id === team?._id).length
          newTeamData.push({ ...team, teamPlayersCount })
        });

        setteamData(newTeamData);
      }).catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [reRun]);

  const handlePopUpOpen = () => setpopUpOpen(true);
  const handlePopUpClose = () => setpopUpOpen(false);
  const handleEditPopUpOpen = ({
    team_id,
    name,
    nick_name,
    logo,
    team_color,
    no_trophy,
    seasons,
  }) => {
    setteamId(team_id);
    setTeamName(name);
    setTeamNockName(nick_name);
    setselectedImage(logo);
    setColor(team_color);
    settrophiesWon(no_trophy);
    setseasons(seasons);
    seteditPopUpOpen(true);
  };
  const handleEditPopUpClose = () => {
    setteamId("");
    setTeamName("");
    setTeamNockName("");
    setyearEstablished("");
    settrophiesWon("");
    setyearEstablished("");
    setselectedImage("");
    setuploadedImageFile(null);
    setseasons([]);
    seteditPopUpOpen(false);
  };

  const handleAddNewTeam = async () => {
    setPopUpLoading(true);
    let body = {
      name: teamName,
      nick_name: teamNockName,
      logo: selectedImage,
      team_color: color,
      founded: parseInt(yearEstablished),
      no_trophy: trophiesWon,
      seasons: seasons.map((season) => {
        return { year: season };
      }),
    };

    await addTeamApiRequest(body, uploadedImageFile, config).finally(() => {
      setTeamName("");
      setTeamNockName("");
      setyearEstablished("");
      settrophiesWon("");
      setyearEstablished("");
      setselectedImage("");
      setuploadedImageFile(null);
      setpopUpOpen(false);
      setseasons([]);
      setPopUpLoading(false);
      setRerun(prev => prev + 1)
    });
  };

  const handleEditTeam = async () => {
    setPopUpLoading(true);
    let body
    if (uploadedImageFile) {
      const secureUrl = await uploadImageToCloudinary(uploadedImageFile)
      body = {
        teamId,
        name: teamName,
        nick_name: teamNockName,
        logo: secureUrl,
        team_color: color,
        no_trophy: trophiesWon,
        seasons: seasons.map((season) => {
          return { year: season };
        }),
      };
    } else {
      body = {
        teamId,
        name: teamName,
        nick_name: teamNockName,
        logo: selectedImage,
        team_color: color,
        no_trophy: trophiesWon,
        seasons: seasons.map((season) => {
          return { year: season };
        }),
      };
    }
    console.log({ editBody: body });
    editTeamInfo(body, config)
      .then((response) => console.log({ response: response.data }))
      .catch((error) => console.log({ error }))
      .finally(() => {
        setteamId("");
        setTeamName("");
        setTeamNockName("");
        setyearEstablished("");
        settrophiesWon("");
        setyearEstablished("");
        setselectedImage("");
        setuploadedImageFile(null);
        setpopUpOpen(false);
        setseasons([]);
        setPopUpLoading(false);
        window.location.reload(false);
      });
  };

  return {
    loading,
    setLoading,
    teamData,
    filteredTeamData,
    popUpOpen,
    handlePopUpClose,
    handlePopUpOpen,
    teamName,
    teamNockName,
    yearEstablished,
    handleTeamNameChange,
    handleTeamNockNameChange,
    handleyearEstablishedChange,
    hiddenFileInput,
    selectedImage,
    handleChange,
    color,
    manualColor,
    handleColorChange,
    handleManualColorChange,
    seasonYears,
    trophiesWon,
    handleTrophiesWonChange,
    seasons,
    setseasons,
    handleAddNewTeam,
    editPopUpOpen,
    handleEditPopUpOpen,
    handleEditPopUpClose,
    handleEditTeam,
    selectedSeasonIndex,
    handleSeasonSwitch,
    uploadedImageFile,
    setuploadedImageFile,
    setselectedImage,
    popUpLoading,
    teamUpdateName, setTeamUpdateName,
    teamUpdateNockName, setTeamUpdateNockName,
    setRerun,
    //team search input field
    searchQuerry, handleSearchFieldChange, handleClearSearchField,
    handleRefresh
  };
}

export default useTeamsHook;

function sortByName(data) {
  let sortedData = data.sort(function (a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return sortedData;
}

async function addTeamApiRequest(body, imageFile, config) {
  try {
    const secureUrl = await uploadImageToCloudinary(imageFile)

    const res = await axios.post(
      URLS.add_team,
      { ...body, logo: secureUrl },
      config
    );
    console.log({ res });
  } catch (error) {
    console.error(error);
  }
}

async function editTeamInfo(body, config) {
  console.log({ config });
  return axios.put(URLS.editTeam, body, config);
}
