import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import matchStataValuesAtom, {
  defaultValues,
} from "./components/match-stat-entity/state/match-stats-values-atom";
import useStateSetter from "../../../helper_functions/useStateSetter"
import format from 'date-fns/format'

const useMatchHook = () => {
  const tabs = ["Live", "Full time", "Upcoming"];
  const matchStatsAtomValuesSet = useSetAtom(matchStataValuesAtom);

  const adminTokenConfigValue = useAtomValue(adminTokenConfig);

  const [value, setValue] = useState(0);

  const [seasonValue, setSeasonValue] = useState(0);
  const [seasons, setSeasons] = useState();
  // const handleSeasonValueChange = (_, newIndex) => setSeasonValue(newIndex);
  const handleSeasonValueChange = (event) => setSeasonValue(event.target.value);

  const [roundValue, setRoundValue] = useState(0);
  const [rounds, setRounds] = useState([]);
  // const handleRoundValueChange = (_, newIndex) => setRoundValue(newIndex);
  const handleRoundValueChange = (event) => setRoundValue(event.target.value);

  const [addDetailsPopUpValue, setaddDetailsPopUpValue] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalLoading, setmodalLoading] = useState(false);
  const [popUpHomeData, setpopUpHomeData] = useState({});
  const [popUpAawayData, setpopUpAawayData] = useState({});

  const [matchEntityIndex, setmatchEntityIndex] = useState();

  const [endMatchLoading, setendMatchLoading] = useState(false);
  const [editStatsLoading, seteditStatsLoading] = useState(false);
  const [startMatchLoading, setstartMatchLoading] = useState(false);

  const [home_shots, set_home_shots] = useState(0);
  const [home_chances, set_home_chances] = useState(0);
  const [home_shots_on_target, set_home_shots_on_target] = useState(0);
  const [home_passes, set_home_passes] = useState(0);
  const [home_fouls, set_home_fouls] = useState(0);
  const [home_offsides, set_home_offsides] = useState(0);
  const [home_corner, set_home_corner] = useState(0);
  const [home_accurate_pass, set_home_accurate_pass] = useState(0);
  const [home_posession, set_home_posession] = useState(0);
  const [home_yellow_cards, set_home_yellow_cards] = useState(0);
  const [home_red_cards, set_home_red_cards] = useState(0);
  const [home_goals, set_home_goals] = useState(0);

  const [away_shots, set_away_shots] = useState(0);
  const [away_chances, set_away_chances] = useState(0);
  const [away_shots_on_target, set_away_shots_on_target] = useState(0);
  const [away_passes, set_away_passes] = useState(0);
  const [away_fouls, set_away_fouls] = useState(0);
  const [away_offsides, set_away_offsides] = useState(0);
  const [away_corner, set_away_corner] = useState(0);
  const [away_accurate_pass, set_away_accurate_pass] = useState(0);
  const [away_posession, set_away_posession] = useState(0);
  const [away_yellow_cards, set_away_yellow_cards] = useState(0);
  const [away_red_cards, set_away_red_cards] = useState(0);
  const [away_goals, set_away_goals] = useState(0);
  const [ allRounds, setAllRounds] = useState([])

  const [popUp2SelectedTabIndex, setPopUp2SelectedTabIndex] = useState(0);
  const handlePopUp2TabChange = (_, newIndex) => {
    setPopUp2SelectedTabIndex(newIndex);
  };

  const [select_value, set_select_value] = useState();
  const handleSelectChange = (e) => {
    set_select_value(e.target.value);
  };

  const [matchData, setMatchData] = useState();

  const [matchId, setMatchId] = useState();

  /**
   * for controlling opening and closing of modal pop up
   */
  const [open, setOpen] = useState(false);
  const handleOpen = async (index, match_id) => {
    setmodalLoading(true);
    setOpen(true);
    setmatchEntityIndex(index);
    setMatchId(match_id);
    axios
      .get(`${URLS.stats}/${match_id}`)
      .then((res) => {
        let promiseArray = res.data.map((dt) =>
          axios.get(`${URLS.teams}/${dt.team}`)
        );
        Promise.allSettled(promiseArray)
          .then((result) => {
            const homeTeam = result[0].value.data;
            const awayTeam = result[1].value.data;
            const homeTeamInfo = {
              ...res.data[0],
              team_id: res.data[0].team,
              team: homeTeam,
            };
            const awayTeamInfo = {
              ...res.data[1],
              team_id: res.data[1].team,
              team: awayTeam,
            };
            set_select_value(homeTeamInfo.team.name);

            setpopUpHomeData(homeTeamInfo);
            set_home_shots(homeTeamInfo.shots);
            set_home_chances(homeTeamInfo.chances);
            set_home_shots_on_target(homeTeamInfo.shots_on_target);
            set_home_passes(homeTeamInfo.passes);
            set_home_fouls(homeTeamInfo.fouls);
            set_home_offsides(homeTeamInfo.offsides);
            set_home_corner(homeTeamInfo.corner);
            set_home_accurate_pass(homeTeamInfo.accurate_pass);
            set_home_posession(homeTeamInfo.posession);
            set_home_yellow_cards(homeTeamInfo.yellow_cards);
            set_home_red_cards(homeTeamInfo.red_cards);
            set_home_goals(homeTeamInfo.goals);

            setpopUpAawayData(awayTeamInfo);
            set_away_shots(awayTeamInfo.shots);
            set_away_chances(awayTeamInfo.chances);
            set_away_shots_on_target(awayTeamInfo.shots_on_target);
            set_away_passes(awayTeamInfo.passes);
            set_away_fouls(awayTeamInfo.fouls);
            set_away_offsides(awayTeamInfo.offsides);
            set_away_corner(awayTeamInfo.corner);
            set_away_accurate_pass(awayTeamInfo.accurate_pass);
            set_away_posession(awayTeamInfo.posession);
            set_away_yellow_cards(awayTeamInfo.yellow_cards);
            set_away_red_cards(awayTeamInfo.red_cards);
            set_away_goals(awayTeamInfo.goals);

            setMatchData({ homeTeam: homeTeamInfo.team.name, awayTeamInfo });
          })
          .finally(() => setmodalLoading(false));
      })
      .finally(() => {});
  };
  const handleClose = () => {
    setOpen(false);

    matchStatsAtomValuesSet((prev) => {
      return {
        ...prev,
        home: { ...defaultValues },
        away: { ...defaultValues },
      };
    });

    setpopUpHomeData({});
    set_home_shots("");
    set_home_chances("");
    set_home_shots_on_target("");
    set_home_passes("");
    set_home_fouls("");
    set_home_offsides("");
    set_home_corner("");
    set_home_accurate_pass("");
    set_home_posession("");
    set_home_yellow_cards("");
    set_home_red_cards("");
    set_home_goals("");

    setpopUpAawayData({});
    set_away_shots("");
    set_away_chances("");
    set_away_shots_on_target("");
    set_away_passes("");
    set_away_fouls("");
    set_away_offsides("");
    set_away_corner("");
    set_away_accurate_pass("");
    set_away_posession("");
    set_away_yellow_cards("");
    set_away_red_cards("");
    set_away_goals("");
  };

  const handleConfirmEditStats = () => {
    seteditStatsLoading(true);
    let homeStats = {
      _id: popUpHomeData._id,
      body: {
        shots: home_shots,
        chances: home_chances,
        shots_on_target: home_shots_on_target,
        passes: home_passes,
        fouls: home_fouls,
        offsides: home_offsides,
        corner: home_corner,
        accurate_pass: home_accurate_pass,
        posession: home_posession,
        yellow_cards: home_yellow_cards,
        red_cards: home_red_cards,
        goals: home_goals,
      },
    };

    let awayStats = {
      _id: popUpAawayData._id,
      body: {
        shots: away_shots,
        chances: away_chances,
        shots_on_target: away_shots_on_target,
        passes: away_passes,
        fouls: away_fouls,
        offsides: away_offsides,
        corner: away_corner,
        accurate_pass: away_accurate_pass,
        posession: away_posession,
        yellow_cards: away_yellow_cards,
        red_cards: away_red_cards,
        goals: away_goals,
      },
    };

    Promise.allSettled([
      axios.put(
        `${URLS.editStats}/${homeStats._id}`,
        homeStats.body,
        adminTokenConfigValue["config"]
      ),
      axios.put(
        `${URLS.editStats}/${awayStats._id}`,
        awayStats.body,
        adminTokenConfigValue["config"]
      ),
    ])
      .then((result) => {})
      .finally(() => {
        seteditStatsLoading(false);
        window.location.reload();
      });
  };

  /**
   * for controlling switching of tabs in the matches option in the sidebar
   */
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  /**
   * for controlling switching of tabs when editing match stats
   */
  const handleAddDetailsPopUpTabValue = (_, newIndex) => {
    setaddDetailsPopUpValue(newIndex);
  };

  /**
   * this is just to tell useeffect to re-run
   */
  const [updateIndex, setUpdateIndex] = useState(0);
  const handleRefresh = () => setUpdateIndex(updateIndex + 1);

  useEffect(() => {
    const call = async () => {
      setLoading(true);
      let _dt_array = [];
      getAllRounds()
      try {

        const response = await apiCall({ url: `${URLS.matches}` }); 
        const matches = response.data;
        const matchesWithStats = matches.filter(
          (match) => match.status !== "nor"
        );

        const apiPromises = matchesWithStats.map((match) => {
          if (match.status !== "nor")
            return apiCall({ url: `${URLS.stats}/${match._id}` });
        });

        if (apiPromises.length > 0) {
          const results = await Promise.allSettled(apiPromises);
          results.forEach((result) => {
            if (result.status === "fulfilled") {
              matches.map((match) => {
                if (match._id === result.value.data[0].match) {
                  return {
                      ...match,
                      stats: result.value.data[0],
                      stats: result.value.data[1]
                  }
                }
                return match
              });
            }
          });
        }

        matches.forEach((match) => {
           if(match.date !== null) {
             return {
              ...match,
              date: format(new Date(match.playing_date),'dd/MMM/yyyy')
             }
           }
           return match
        });

        // sorting matches by date
        matches.sort((a, b) => new Date(a.date) - new Date(b.date));
        _dt_array.push(...matches);

        // getting all available seasons from api response
        let _seasonSet = new Set();
        matches.forEach((match) => _seasonSet.add(match.season));
        let seasons = [..._seasonSet];
        seasons.sort((a, b) => (a > b ? 1 : -1));
        setSeasons(seasons);
        setSeasonValue(seasons.length - 1);

        // getting all available rounds
        let _roundSet = new Set();
        matches.forEach((match) => _roundSet.add(match.round.num));
        let rounds = [..._roundSet];
        rounds.sort((a, b) => a - b);
        setRounds((prev) => useStateSetter(prev, rounds));
        setRoundValue((prev) => useStateSetter(prev, 0));
        setData((prev) => useStateSetter(prev, _dt_array));
        setLoading(false);
      } catch (error) {
        console.log("error getting matches", error);
        setLoading(false);
      }
    };
    call();
  }, [updateIndex])



  const getAllRounds = async() => {
    try { 
      const response = await apiCall({ url: URLS.rounds })
      setAllRounds(response.data)
    }  catch (err) {
      console.log(err)
    }
  }

  const handleSubmitMatchStats = ({
    homeDetailsHookData,
    awayDetailsHookData,
  }) => {};

  const handleEndMatch = (match_id) => {
    setendMatchLoading(true);
    apiCall({
      url: `${URLS.endMatch}/${match_id}`,
      method: "put",
      tokenRequired: true,
      config: adminTokenConfigValue.config,
    })
      .then((res) => console.log({ res: res.data }))
      .finally(() => {
        setendMatchLoading(false);
        setUpdateIndex((prev) => prev + 1);
      });
  };

  const handleStartMatch = (match_id) => {
    setstartMatchLoading(true);
    apiCall({
      url: `${URLS.startMatch}/${match_id}`,
      method: "put",
      tokenRequired: true,
      config: adminTokenConfigValue.config,
    })
      .then(() => {})
      .finally(() => {
        setstartMatchLoading(false);
        setUpdateIndex((prev) => prev + 1);
      });
  };

  return {
    value,
    handleChange,
    tabs,
    loading,
    open,
    handleOpen,
    handleClose,
    matchEntityIndex,
    data,
    addDetailsPopUpValue,
    handleAddDetailsPopUpTabValue,
    handleSubmitMatchStats,
    handleEndMatch,
    endMatchLoading,
    startMatchLoading,
    handleStartMatch,
    modalLoading,

    popUpHomeData,
    popUpAawayData,

    home_shots,
    home_chances,
    home_shots_on_target,
    home_passes,
    home_fouls,
    home_offsides,
    home_corner,
    home_accurate_pass,
    home_posession,
    home_yellow_cards,
    home_red_cards,
    home_goals,

    set_home_shots,
    set_home_chances,
    set_home_shots_on_target,
    set_home_passes,
    set_home_fouls,
    set_home_offsides,
    set_home_corner,
    set_home_accurate_pass,
    set_home_posession,
    set_home_yellow_cards,
    set_home_red_cards,
    set_home_goals,

    away_shots,
    away_chances,
    away_shots_on_target,
    away_passes,
    away_fouls,
    away_offsides,
    away_corner,
    away_accurate_pass,
    away_posession,
    away_yellow_cards,
    away_red_cards,
    away_goals,

    set_away_shots,
    set_away_chances,
    set_away_shots_on_target,
    set_away_passes,
    set_away_fouls,
    set_away_offsides,
    set_away_corner,
    set_away_accurate_pass,
    set_away_posession,
    set_away_yellow_cards,
    set_away_red_cards,
    set_away_goals,

    select_value,
    handleSelectChange,

    handleConfirmEditStats,
    editStatsLoading,

    seasonValue,
    seasons,
    handleSeasonValueChange,

    roundValue,
    rounds,
    allRounds,
    handleRoundValueChange,

    popUp2SelectedTabIndex,
    handlePopUp2TabChange,

    matchData,

    matchId,

    setUpdateIndex,
    handleRefresh,
  };
};

export default useMatchHook;

const getAllMatches = async () => axios.get(URLS.matches);
const getMatchStatistics = async (match_id) => {
  return axios.get(`${URLS.stats}/${match_id}`);
};

const endMatchRequest = async (match_id, config) =>
  axios.put(`${URLS.endMatch}/${match_id}`, {}, config);

const startMatchRequest = async (match_id, config) =>
  axios.put(`${URLS.startMatch}/${match_id}`, {}, config);
