import ReactECharts from "echarts-for-react";
import { BsArrowLeft, BsArrowRight, BsArrowUpShort } from "react-icons/bs";
import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import lineSvg from "src/assets/vectors/Graph.svg";
import format from 'date-fns/format'
import ReactPlayer from 'react-player'

import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import URLS, { BASEURL } from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import useStateSetter from "src/helper_functions/useStateSetter";


import {
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi"
import styled from "styled-components"
import getSeason from "src/helper_functions/get_season"
import './analytics.css'

export default function Analytics() {
  const analyticsHook = useAnalytics()
  const { analytics, allRounds, matches, selectRound } = useAnalytics()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(matches)

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //console.log(analytics,"analytics")

  if (Boolean(analyticsHook.loading && analyticsHook.fixturesLoading)) {
    return (
      <Column a_center j_center style={{ padding: 50 }}>

      </Column>
    );
  }

  return (
    <Column>
      <Label a_s_left xLarge xBold text={"Analytics"} color={"grey"} />
      <Row a_start gap={20}>
        <Column style={{ flexGrow: 1 }}>
          {analytics === null ? (<div className="box-wrapper">

            <div className="box-1">
              <h2>Total visitors </h2>
              <div><h3>0</h3></div>
            </div>

            <div className="box-1">
              <h2>Total Accounts</h2>
              <div><h3>0</h3></div>
            </div>

            <div className="box-1">
              <h2>Active accounts</h2>
              <div style={{ marginTop: -50 }}><h3>0</h3></div>
            </div>
          </div> ): (
            <div className="box-wrapper">

              <div className="box-1">
                <h2>Total visitors </h2>
                <div><h3>{analytics.today_visits}</h3></div>
              </div>

              <div className="box-1">
                <h2>Total Accounts</h2>
                <div><h3>{analytics.total_accounts}</h3></div>
              </div>

              <div className="box-1">
                <h2>Active accounts</h2>
                <div style={{ marginTop: -50 }}><h3>{analytics.active_accounts}</h3></div>
              </div>
            </div>
            )
          }

          {/* match fixtures */}
          {analyticsHook.fixturesLoading ? (
            <Column a_center j_center style={{ padding: 50 }}>
              <Label text={"loading ..."} />
            </Column>
          ) : (
            <MatchFixtures
              allRounds={allRounds}
              rounds={analyticsHook.rounds}
              roundSetter={analyticsHook.setRoundValue}
              roundValue={analyticsHook.roundValue}
              data={analyticsHook.data}
              seasonQuerry={analyticsHook.seasonQuerry}
              handlePrevMatchDay={analyticsHook.handlePrevMatchDay}
              handleNextMatchDay={analyticsHook.handleNextMatchDay}
              handleMatchDayDropDownChange={
                analyticsHook.handleMatchDayDropDownChange
              }
            />
          )}
        </Column>
      </Row>

      <Row a_start gap={20}>
        {/* <Column> */}
        <Column>
          <div
            style={{
              width: "100%",
              backgroundColor: "#fff",
              padding: 10,
              flexGrow: 1,
              borderRadius: 10,
              overflow: "clip",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              position: "relative",
            }}>

            <div style={{ padding: 20 }}>
              <Label xBold color={"grey"} text={"Match highlights"} />
            </div>

            <Column
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 10,
                border: "2px solid #EDEFF2",
              }}
            >
              <Row
                j_between
                a_center
                gap={10}
                style={{ borderBottom: "2px solid #EDEFF2", paddingBlock: 5 }}>

                <Row
                  aria-describedby={id}
                  onClick={handleClick}
                  gap={10}
                  style={{ cursor: "pointer", width: "fit-content" }}>

                  <Label noWrap xBold text={`Round`} />
                  <HiOutlineChevronDown />
                </Row>


                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Column
                    style={{
                      width: 300,
                      padding: 20,
                      borderRadius: 10,
                    }}>
                    {allRounds.length <= 1 ? null : allRounds.map(round => (

                      <PopOverItem
                        key={round._id} onClick={() => selectRound(round)}>
                        {`Round ${round.num === undefined ? " " : round.num}`}
                      </PopOverItem>
                    ))}

                  </Column>
                </Popover>
              </Row>

            </Column>

            <div className="match-highlights-wrapper">
              {matches.lenght <= 0 ? null : matches.map(match => (
                <div>
                  {match.highlights_url === undefined || match.highlights_url === null ? "No highlights yet" :
                    <div className="match-box" key={match._id}>
                      <ReactPlayer url={match.highlights_url} width="100%" height="100%" controls />
                    </div>}
                </div>
              ))}
            </div>

          </div>
        </Column>


        <Column>
          <Row
            style={{
              padding: 20,
              backgroundColor: "#fff",
              borderRadius: 10,
              border: "1px solid #85F4FF",
            }}
          >
            <Label xBold color={"grey"} text={"Table"} />
          </Row>
          {analyticsHook.loading ? (
            <Column a_center j_center style={{ padding: 50 }}>
              <Label text={"loading ..."} />
            </Column>
          ) : (
            <LeagueTable tableData={analyticsHook.tableData} />
          )}
          {/* </Column> */}
        </Column>


      </Row>
    </Column>
  );
}

function MatchFixtures({
  allRounds
}) {

}

const PopOverItem = styled.div`
  background-color: white;
  padding: 10px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
  width: 100%;
  border-radius: 10px;

  &:hover {
    background-color: #edeeef;
  }
`;

function MatchStatus({ label, backgroundColor, color = "#212121" }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
        color,
        height: 40,
        aspectRatio: 1,
        borderRadius: "50%",
      }}
    >
      <Label bold text={label} />
    </div>
  );
}

function CircleIconButton({ icon, hide, onClick }) {
  return (
    <div
      onClick={!hide && onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        aspectRatio: 1,
        borderRadius: "50%",
        fontSize: "large",
        backgroundColor: "#EDEEF1",
        border: "1px solid #85F4FF",
        opacity: hide ? 0 : 1,
        cursor: "pointer",
      }}
    >
      {icon}
    </div>
  );
}

const option = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    bottom: 0,
    data: ["Website 35%", "Mobile 45%"],
  },
  grid: {
    left: 0,
    right: "5%",
    bottom: "10%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  yAxis: {
    type: "value",
    show: false,
  },
  series: [
    {
      name: "Website 35%",
      type: "line",
      data: [120, 250, 101, 134, 90, 230, 210],
    },
    {
      name: "Mobile 45%",
      type: "line",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
  ],
};

function LeagueTable({ tableData }) {
  const columns = ["#", "Team", "Pl", "W", "D", "L", "+/-", "GD", "Pts"];

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        border: "1px solid #85F4FF",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#F8F8F8" }}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={index === 0 ? "center" : "left"}
                style={{ fontWeight: 800 }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData.map((team, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="left">
                <Row a_center gap={10} style={{ width: "fit-content" }}>
                  <img
                    src={team.logo}
                    alt=""
                    style={{ height: 40, aspectRatio: 1 }}
                  />
                  <Label small noWrap text={team.name} />
                </Row>
              </TableCell>
              <TableCell>{team.season.plays}</TableCell>
              <TableCell>{team.season.wins}</TableCell>
              <TableCell>{team.season.draw}</TableCell>
              <TableCell>{team.season.lost}</TableCell>
              <TableCell>{team.season.lost}</TableCell>
              <TableCell>{team.season.lost}</TableCell>
              <TableCell>{team.season.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useAnalytics = () => {
  const [loading, setLoading] = useState(false)
  const [analytics, setAnalytics] = useState(null)
  const [allRounds, setAllRounds] = useState([])
  const [activeRound, setActiveRound] = useState(null)
  const [matches, setMatches] = useState([])

  const seasonQuerry = getSeason(new Date())
  const [tableData, setTableData] = useState([])

  const getAnalytics = async () => {
    try {
      const response = await apiCall({ url: `${BASEURL}/analytics` })
      if (response.statusText === "OK") {
        setAnalytics(response.data)
      }

      if (response.statusText !== "OK") {
        toast.error('Failed to list analytics')
      }
    } catch (err) {
      toast.error('Error during listing analytics')
    }
  }

  const getFinishedMatch = async () => {
    try {
      const { _id: roundId } = allRounds[0]
      const response = await apiCall({ url: `${BASEURL}/match?round=${roundId}&status=fin` })
      if (response.statusText === "OK") {
        setMatches(response.data)
      }

      if (response.statusText !== "OK") {
        toast.error('Failed to list analytics')
      }
    } catch (err) {
      toast.error('Error during listing analytics')
    }
  }

  const selectRound = async (roundPicked) => {
    try {
      const { _id: roundId } = roundPicked
      const response = await apiCall({ url: `${BASEURL}/match?round=${roundId}&status=fin` })
      if (response.statusText === "OK") {
        setMatches(response.data)
      }

      if (response.statusText !== "OK") {
        toast.error('Failed to list analytics')
      }
    } catch (err) {
      toast.error('Error during listing analytics')
    }
  }

  useEffect(() => {
    if (allRounds.length <= 0) { } else {
      getFinishedMatch()
    }
  }, [allRounds, activeRound])

  useEffect(() => {
    setLoading(true)
    getAnalytics()
    apiCall({ url: URLS.teams })
      .then((resp) => {
        let data = [];
        resp.data.forEach((team) => {
          let _season = team.seasons.find(
            (season) => season.year === seasonQuerry
          );
          if (_season) {
            data.push({
              ...team,
              season: _season,
            });
          }
        });
        let sortedData = data.sort((a, b) => b.season.points - a.season.points);
        setTableData((prev) => {
          prev = sortedData;
          return prev;
        });
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const [fixturesLoading, setFixturesLoading] = useState(false)
  const [seasons, setSeasons] = useState()
  const [seasonValue, setSeasonValue] = useState(0)
  const [roundValue, setRoundValue] = useState(0)
  const [rounds, setRounds] = useState([])
  const [data, setData] = useState([])


  const handleMatchDayDropDownChange = (roundNumber) => {
    setRoundValue((prev) => {
      prev = roundNumber;
      return prev;
    });
  };

  const handleNextMatchDay = () => {
    const index = rounds.indexOf(roundValue);
    if (Boolean(index === rounds.length - 1)) return;
    setRoundValue((prev) => {
      prev = rounds[index + 1];
      return prev;
    });
  };

  const handlePrevMatchDay = () => {
    const index = rounds.indexOf(roundValue);
    if (Boolean(index === 0)) return;
    setRoundValue((prev) => {
      prev = rounds[index - 1];
      return prev;
    });
  };

  const getAllRounds = async () => {
    try {
      const response = await apiCall({ url: URLS.rounds })
      if (response.statusText === "OK") {
        setAllRounds(response.data)
        setActiveRound(response.data[0])
      }

      if (response.statusText !== "OK") {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

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
          if (match.date !== null) {
            return {
              ...match,
              date: format(new Date(match.playing_date), 'dd/MMM/yyyy')
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

    call()
  }, [])


  return {
    loading,
    tableData,
    rounds,
    allRounds,
    roundValue,
    setRoundValue,
    data,
    seasonQuerry,
    handleMatchDayDropDownChange,
    handleNextMatchDay,
    handlePrevMatchDay,
    fixturesLoading,
    analytics,
    matches,
    selectRound
  };
};
