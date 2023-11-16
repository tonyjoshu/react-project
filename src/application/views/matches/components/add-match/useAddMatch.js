import { useEffect, useState } from "react";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import getSeason from "src/helper_functions/get_season";


const useAddMatch = (setUpdateIndex) =>
{

  const [popUpValue, setPopUpValue] = useState(false);
  const [popUpLoading, setPopUpLoading] = useState(false);

  // lookup values
  const [teams, setTeams] = useState();
  const [homeTeams, setHomeTeams] = useState();
  const [awayTeams, setAwayTeams] = useState();
  const [rounds, setRounds] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [broadcasters, setBroadcasters] = useState([]);
  const [stadiums, setStadiums] = useState([]);

  // values to be submitted
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [playingTime, setPlayingTime] = useState(null);
  const [playing_date, setPlaying_date] = useState(null);
  const [season, setSeason] = useState(() => getSeason(new Date()));
  const [ground, setGround] = useState("");
  const [round, setRound] = useState("");
  const [broadcaster, setRBroadcaster] = useState("");
  const [stadium, setStadium] = useState("");

  const onChangeGround = (event) => setGround(event.target.value);

  const onChangePlayingTime = (newValue) =>
  {
    setPlayingTime(newValue);
  };

  const onChangePlayingDate = (newValue) =>
  {
    setPlaying_date(newValue);
  };

  const handleHomeSelectChange = (event) =>
  {
    setHomeTeam(event.target.value);
  };

  const handleAwaySelectChange = (event) =>
  {
    setAwayTeam(event.target.value);
  };

  const handleRoundSelectChange = (event) =>
  {
    setRound(event.target.value);
  };

  const handlePopUpOpen = () =>
  {
    setPopUpValue(true);
    setPopUpLoading(true);

    console.log("season", getSeason(new Date()));

    let _apiCalls = [
      apiCall({ url: URLS.teams }),
      apiCall({ url: `${ URLS.roundsBySeason }/${ getSeason(new Date()) }` }),
      apiCall({ url: URLS.broadcasters }),
      apiCall({ url: URLS.stadiums }),
    ];

    Promise.allSettled(_apiCalls)
      .then((result) =>
      {
        let _teams = result[0].value.data;
        let _rounds = result[1]?.value?.data ?? [];

        // broadcsters
        setBroadcasters(prev => { prev = result[2]?.value?.data ?? []; return prev })
        // stadiums
        setStadiums(prev => { prev = result[3]?.value?.data ?? []; return prev })

        return { _teams, _rounds };
      })
      .then(({ _teams, _rounds }) =>
      {
        let sortedTeams = sortArray({ array: _teams, sortingKey: "name" });

        let _grounds = [
          { _id: 1, name: "Azam Complex Chamanzi" },
          { _id: 2, name: "Manungu Complex" },
          { _id: 3, name: "Uhuru Stadium" },
        ];

        setGrounds(prev => { prev = _grounds; return prev });

        setGround(_grounds[0].name);

        setTeams(sortedTeams);

        setSeason(getSeason(new Date()));

        let sortedRounds = _rounds ? _rounds.sort((a, b) => a.num - b.num) : [];

        setRound(sortedRounds[0]?._id ?? {});
        setRounds(prev => { prev = sortedRounds ?? []; return prev });

        setHomeTeam(sortedTeams[0]._id);
        setHomeTeams(sortedTeams?.filter((x) => x._id !== sortedTeams[0]._id));

        setAwayTeam(sortedTeams[1]._id);
        setAwayTeams(sortedTeams?.filter((x) => x._id !== sortedTeams[1]._id));
      })
      .finally(() => setPopUpLoading(false));
  };

  const handlePopUpClose = () =>
  {
    setPopUpValue(false);
    setTeams();
    setRounds([]);
    setHomeTeam("");
    setAwayTeam("");
    setPlayingTime(null);
    setSeason("");
    setPlaying_date(null);
    setGround("");
    setRound("");
  };

  const [addMatchLoading, setAddMatch] = useState(false)
  const handleConfirmAddMatch = () =>
  {
    setAddMatch(true)
    let body = {
      home_team: homeTeam,
      away_team: awayTeam,
      playing_time: `${ new Date(playingTime).getHours() }:${ ((minute) =>
      {
        if (parseInt(minute) < 10) return `0${ minute }`
        return minute
      })(new Date(
        playingTime
      ).getMinutes()) }`,
      season: season,
      playing_date: {
        year: new Date(playing_date).getFullYear(),
        month: new Date(playing_date).getMonth() + 1,
        day: new Date(playing_date).getDate(),
      },
      ground: stadium,
      round: round,
      broadcaster: broadcaster,
    };

    apiCall({
      url: URLS.addMatch,
      tokenRequired: true,
      method: "post",
      body,
      config: adminConfigValue.config,
    })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error))
      .finally(() =>
      {
        setAddMatch(false)
        handlePopUpClose()
        setUpdateIndex(prev => prev + 1)
      });
  };

  useEffect(() =>
  {
    let _homeTeamList = teams?.filter((x) => x._id !== awayTeam);
    let _awayTeamList = teams?.filter((x) => x._id !== homeTeam);

    setHomeTeams(_homeTeamList);
    setAwayTeams(_awayTeamList);
  }, [homeTeam, awayTeam]);

  useEffect(() =>
  {
    setSeason(getSeason(playing_date));
  }, [playing_date]);

  return {
    popUpValue,
    handlePopUpOpen,
    handlePopUpClose,
    popUpLoading,

    teams,

    homeTeam,
    homeTeams,
    handleHomeSelectChange,
    setHomeTeam,

    awayTeam,
    awayTeams,
    handleAwaySelectChange,
    setAwayTeam,

    playing_date,
    onChangePlayingDate,

    playingTime,
    onChangePlayingTime,

    round,
    rounds,
    handleRoundSelectChange,
    setRound,

    season,

    grounds,
    ground,
    onChangeGround,
    setGround,

    broadcaster, setRBroadcaster, broadcasters,

    stadium, setStadium, stadiums,

    handleConfirmAddMatch,
    addMatchLoading
  };
};

export default useAddMatch;

const sortArray = ({
  array,
  sortingKey,
  dataType = "string",
  ascending = true,
}) =>
{
  let sortedArray;
  if (ascending)
  {
    if (dataType === "string")
    {
      sortedArray = array.sort((a, b) =>
        a[sortingKey] > b[sortingKey] ? 1 : -1
      );
    }

    if (dataType === "number")
    {
      sortedArray = array.sort((a, b) =>
        a[sortingKey] - b[sortingKey] ? 1 : -1
      );
    }
  }

  if (!ascending)
  {
    if (dataType === "string")
    {
      sortedArray = array.sort((a, b) =>
        a[sortingKey] < b[sortingKey] ? 1 : -1
      );
    }

    if (dataType === "number")
    {
      sortedArray = array.sort((a, b) =>
        b[sortingKey] - a[sortingKey] ? 1 : -1
      );
    }
  }

  return sortedArray;
};
