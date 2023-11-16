import axios from "axios";
import { useEffect, useState } from "react";
import URLS from "src/config/urls/urls";

export default function useTeamsBySeason(season) {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const getTeamsBySeason = async () => {
    return axios.get(`${URLS.teamsBySeason}/${season}`);
  };
  useEffect(() => {
    setloading(true);
    getTeamsBySeason()
      .then((res) => {
        let sortedData = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
        return sortedData;
      })
      .then((sortedData) => setData(sortedData))
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  }, [season]);

  return { loading, data };
}
