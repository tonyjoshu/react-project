import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import navigateBack from "src/helper_functions/navigate_back";

const useTeamProfile = () => {
  const { team_id } = useParams();

  let navigate = useNavigate();
  const goBack = () => navigateBack(navigate);

  const [teamInfo, setTeamInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiCall({ url: `${URLS.teams}/${team_id}` })
      .then((response) => {
        console.log(response.data);
        const { name, nick_name, seasons, team_color, logo, no_trophy } =
          response.data;
        let _teamData = {
          name,
          nick_name,
          seasons,
          team_color,
          logo,
          no_trophy,
        };
        setTeamInfo(_teamData);
      })
      .finally(() => setLoading(false));
  }, []);

  return { goBack, team_id, teamInfo, loading };
};

export default useTeamProfile;
