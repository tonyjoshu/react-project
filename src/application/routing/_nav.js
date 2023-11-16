import { CNavItem } from "@coreui/react";
import { AiOutlineRead, AiOutlineSolution, AiOutlineTeam } from "react-icons/ai";
import { BiFootball } from "react-icons/bi";
import { BsCameraReels } from "react-icons/bs";
import { FaHandshake, FaUserCircle } from "react-icons/fa";
import { RiTrophyLine } from "react-icons/ri";
import { TbDeviceAnalytics } from 'react-icons/tb';
import { VscJersey } from 'react-icons/vsc';
import { routeStrings } from "./routes";
const _nav = [
  {
    component: CNavItem,
    name: "Analytics",
    to: routeStrings.analytics,
    icon: <TbDeviceAnalytics />,
  },
  {
    component: CNavItem,
    name: "Matches",
    to: "/matches",
    icon: <BiFootball />,
  },
  {
    component: CNavItem,
    name: "Teams",
    to: "/teams",
    icon: <AiOutlineTeam />,
  },
  {
    component: CNavItem,
    name: "Players",
    to: "/players",
    icon: <VscJersey />,
  },
  {
    component: CNavItem,
    name: "Team Managers",
    to: routeStrings.managers,
    icon: <AiOutlineSolution />,
  },
  {
    component: CNavItem,
    name: "News",
    to: routeStrings.news,
    icon: <AiOutlineRead />,
  },
  {
    component: CNavItem,
    name: "Awards",
    to: routeStrings.awards,
    icon: <RiTrophyLine />,
  },
  {
    component: CNavItem,
    name: "Partners",
    to: routeStrings.partners,
    icon: <FaHandshake />,
  },
  {
    component: CNavItem,
    name: "Broadcasters",
    to: routeStrings.broadcasters,
    icon: <BsCameraReels />,
  },
  {
    component: CNavItem,
    name: "Users",
    to: routeStrings.users,
    icon: <FaUserCircle />,
  },
];

export default _nav;
