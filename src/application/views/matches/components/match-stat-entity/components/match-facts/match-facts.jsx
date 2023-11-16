import { useEffect, useState } from "react";
import { BiFootball } from "react-icons/bi";
import { RiLoader3Line } from "react-icons/ri";
import Label from "src/application/shared/components/Label";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";

const { default: HalfTime } = require("../../../HalfTime");

function MatchFacts({ facts }) {
  const Container = ({ JSX }) => {
    return <div className="w-full py-2 border-b border-b-gray-400 ">{JSX}</div>;
  };
  return (
    <>
      <Label xBold color={"grey"} text={"Facts"} />
      {facts?.map((fact, index) => {
        if (fact.event === "goal") {
          return <Container JSX={<GoalEvent key={index} fact={fact} />} />;
        }
        if (
          fact.event === "sub" ||
          fact.event === "red" ||
          fact.event === "yellow"
        ) {
          return (
            <Container JSX={<SubstitutionEvent key={index} fact={fact} />} />
          );
        }
        if (fact.card_type === "red" || fact.card_type === "yellow") {
          return <Container JSX={<CardEvent key={index} fact={fact} />} />;
        }
        if (fact.event === "ht")
          return <Container JSX={<HalfTime key={index} time={fact?.time} />} />;
      })}
    </>
  );
}

export default MatchFacts;

const CardEvent = ({ fact }) => {
  const Minute = () => (
    <div className="h-[30px] aspect-square flex items-center justify-center">
      <Label small xBold color={"grey"} noWrap text={`${fact?.time ?? ""}"`} />
    </div>
  );
  return (
    <div
      className={`flex items-center w-full gap-2 ${
        fact?.isHome ? "justify-start" : "justify-end"
      }`}
    >
      {fact?.isHome ? (
        <>
          <Minute />
          <Card isRed={fact?.card_type === "red"} />
          <Label noWrap text={`${fact?.player?.name ?? ""}`} />
        </>
      ) : (
        <>
          <Label noWrap text={`${fact?.player?.name ?? ""}`} />
          <Card isRed={fact?.card_type === "red"} />
          <Minute />
        </>
      )}
    </div>
  );
};

const GoalEvent = ({ fact }) => {
  const Minute = () => (
    <div className="h-[30px] aspect-square flex items-center justify-center">
      <Label small xBold color={"grey"} noWrap text={`${fact?.time ?? ""}"`} />
    </div>
  );
  return (
    <div
      className={`flex items-center w-full gap-2 ${
        fact?.isHome ? "justify-start" : "justify-end"
      }`}
    >
      {fact?.isHome ? (
        <>
          <Minute />
          <BiFootball className="text-xl" />
          <Label noWrap text={`${fact?.player?.name ?? ""}`} />
        </>
      ) : (
        <>
          <Label noWrap text={`${fact?.player?.name ?? ""}`} />
          <BiFootball className="text-xl" />
          <Minute />
        </>
      )}
    </div>
  );
};

const SubstitutionEvent = ({ fact }) => {
  const Minute = () => (
    <div className="h-[30px] aspect-square flex items-center justify-center">
      <Label small xBold color={"grey"} noWrap text={`${fact?.time ?? ""}"`} />
    </div>
  );
  return (
    <div
      className={`flex items-center w-full gap-2 ${
        fact?.isHome ? "justify-start" : "justify-end"
      }`}
    >
      {fact?.isHome ? (
        <>
          <Minute />
          <RiLoader3Line className="text-xl" />
          <Label noWrap text={`${fact?.player?.name ?? ""}`} />
        </>
      ) : (
        <>
          <Label noWrap text={`${fact?.player?.name ?? ""}`} />
          <RiLoader3Line className="text-xl" />
          <Minute />
        </>
      )}
    </div>
  );
};

const Card = ({ isRed }) => (
  <div
    className={`${
      isRed ? "bg-[tomato]" : "bg-[orange]"
    } h-[30px] w-[20px] rounded-md`}
  ></div>
);

const useMatchFacts = (matchData) => {
  const [loading, setLoading] = useState(false);
  const [facts, setFacts] = useState();

  useEffect(() => {
    setLoading(true);
    apiCall({ url: `${URLS.getMatchFacts}/${matchData._id}` })
      .then((res) => {
        getMatchFactResponseAction(setFacts, res.data, setLoading, matchData);
      })
      .catch((error) => setLoading(false));
  }, []);
  return {
    loading,

    facts,
  };
};

const getMatchFactResponseAction = (setter, data, setLoading, matchData) => {
  let homeTeam;
  let awayTeam;

  let apiCalls = [
    apiCall({ url: `${URLS.teams}/${matchData.home_team._id}` }),
    apiCall({ url: `${URLS.teams}/${matchData.away_team._id}` }),
  ];
  Promise.allSettled(apiCalls)
    .then((results) => {
      homeTeam = results[0].value.data;
      awayTeam = results[1].value.data;
      console.log({ homeTeam, awayTeam, data });
    })
    .finally(() => {
      let newData = [];
      let sortedData = data.sort((a, b) => a.time - b.time);
      sortedData.forEach((datum) => {
        datum = {
          ...datum,
          isHome: datum.team === homeTeam._id,
        };
        newData.push(datum);
      });
      console.log("sortedData", sortedData);
      setter(newData);
      setLoading(false);
    });
};
