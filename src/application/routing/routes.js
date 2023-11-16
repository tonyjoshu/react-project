import Users from "src/application/views/users/Users";
import { AdminProfile } from "../views/admin-profile/AdminProfile";
import Analytics from "../views/analytics/Analytics";
import Awards from "../views/awards/Awards";
import Broadcasters from "../views/broadcasters/Broadcasters";

import Dashboard from "../views/dashboard/Dashboard";
import ManagerProfile from "../views/manager-profile/ManagerProfile";
import Managers from "../views/managers/Managers";
import Matches from "../views/matches/Matches";
import News from "../views/news/News";
import Partners from "../views/partners/Partners";
import PlayerProfile from "../views/player-profile/PlayerProfile";
import Players from "../views/players/Players";
import Settings from "../views/settings/Settings";
import TeamProfile from "../views/team-profile/TeamProfile";
import Teams from "../views/teams/Teams";
import UploadManagerCSV from "../views/uploadManagerCSV/UploadPlayerCSV";
import UploadPlayerCSV from "../views/uploadPlayerCSV/UploadPlayerCSV";

export const routeStrings = {
  home: "/",
  analytics: "/analytics",
  matches: "/matches",
  allTeams: "/teams",
  teamProfile: "/team-profile",
  players: "/players",
  playerProfile: "/players/player-profile",
  managers: "/managers",
  managerProfile: "/managers/manager-profile",
  news: "/news",
  adminProfile: "/profile",
  settings: "/settings",
  uploadPlayerCSV: "/players/uploadPlayerCSV",
  uploadManagerCSV: "/managers/uploadManagerCSV",
  partners: "/partners",
  broadcasters: "/broadcasters",
  awards: "/awards",
  users: "/users",
};

const routes = [
  {
    path: routeStrings.home,
    exact: true,
    name: "Dashboard",
    element: Dashboard,
  },
  {
    path: routeStrings.analytics,
    exact: true,
    name: "analytics",
    element: Analytics,
  },
  {
    path: routeStrings.matches,
    exact: true,
    name: "matches",
    element: Matches,
  },
  { path: routeStrings.allTeams, exact: true, name: "teams", element: Teams },
  {
    path: `${ routeStrings.teamProfile }/:team_id`,
    exact: true,
    name: "team-profile",
    element: TeamProfile,
  },
  {
    path: routeStrings.players,
    exact: true,
    name: "players",
    element: Players,
  },
  {
    path: `${ routeStrings.playerProfile }/:player_id`,
    exact: true,
    name: "player_profile",
    element: PlayerProfile,
  },
  {
    path: `${ routeStrings.managerProfile }/:manager_id`,
    exact: true,
    name: "manager_profile",
    element: ManagerProfile,
  },
  {
    path: routeStrings.managers,
    exact: true,
    name: "managers",
    element: Managers,
  },
  {
    path: routeStrings.news,
    exact: true,
    name: "news",
    element: News,
  },
  {
    path: routeStrings.adminProfile,
    exact: true,
    name: "admin-profile",
    element: AdminProfile,
  },
  {
    path: routeStrings.settings,
    exact: true,
    name: "settings",
    element: Settings,
  },
  {
    path: routeStrings.uploadPlayerCSV,
    exact: true,
    name: "upload to csv",
    element: UploadPlayerCSV,
  },
  {
    path: routeStrings.uploadManagerCSV,
    exact: true,
    name: "upload to csv",
    element: UploadManagerCSV,
  },
  {
    path: routeStrings.partners,
    exact: true,
    name: "partners",
    element: Partners,
  },
  {
    path: routeStrings.broadcasters,
    exact: true,
    name: "Broadcasters",
    element: Broadcasters,
  },
  {
    path: routeStrings.awards,
    exact: true,
    name: "Awards",
    element: Awards,
  },
  {
    path: routeStrings.users,
    exact: true,
    name: "Users",
    element: Users,
  },
];

export default routes;
