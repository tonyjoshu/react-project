import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";

const usePlayerProfile = () => {
  const { player_id } = useParams();

  // simply to initialize data refetch
  const [a, setA] = useState(0);

  // loading screen
  const [loading, setLoading] = useState(false);

  // player details
  const [playerDetails, setPlayerDetails] = useState();

  // player history
  const [playerHistory, setPlayerHistory] = useState();

  // pop up
  const [popUpValue, setPopUpValue] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    setLoading(true);
    const getPlayerInfo = apiCall({ url: URLS.players });
    const getPlayerHistory = apiCall({
      url: `${URLS.playerHistory}/${player_id}`,
    });

    Promise.allSettled([getPlayerInfo, getPlayerHistory])
      .then((result) => {
        let _player_info = result[0].value.data.find(
          (player) => player._id === player_id
        );
        let _player_history = result[1].value.data;
        setPlayerDetails(_player_info);
        setPlayerHistory(_player_history);
      })
      .finally(() => setLoading(false));
  }, [a]);

  const handlePopUpOpen = () => {
    setPlayerName(playerDetails["name"]);
    setPopUpValue(true);
  };
  const handlePopUpClose = () => setPopUpValue(false);

  return {
    playerDetails,
    loading,
    popUpValue,
    handlePopUpOpen,
    handlePopUpClose,

    playerName,
    setPlayerName,

    playerHistory,
    player_id,

    setA,
  };
};

export default usePlayerProfile;
