// const BASEURL = "https://nbc-api.herokuapp.com";
// const NBC_BASEURL = "https://nbc-api.ellipsis-dev.com/v1"
const COUNTRY_LIST_API_BASE = "https://api.first.org";

//export const BASEURL = 'http://51.195.254.183:4422';
export const BASEURL = "http://nbcleague1.zesha.net:4422";


const URLS = {
  matches: `${ BASEURL }/match`,
  editMatch: `${ BASEURL }/match/edit`,
  startMatch: `${ BASEURL }/match/makeItLive`,
  endMatch: `${ BASEURL }/match/end_match`,
  addMatch: `${ BASEURL }/match/add`,
  teams: `${ BASEURL }/team`,
  teamsBySeason: `${ BASEURL }/team/seasons`,
  editTeam: `${ BASEURL }/team/edit`,
  add_team: `${ BASEURL }/team/add`,
  stats: `${ BASEURL }/stat/match`,
  editStats: `${ BASEURL }/stat/edit`,
  countryListApi: `${ COUNTRY_LIST_API_BASE }/data/v1/countries`,
  addPlayer: `${ BASEURL }/player/add`,
  players: `${ BASEURL }/player`,
  rounds: `${ BASEURL }/round`,
  roundsBySeason: `${ BASEURL }/round/season`,
  roundAdd: `${ BASEURL }/round/add`,
  addMatchFact: `${ BASEURL }/moment/add`,
  getMatchFacts: `${ BASEURL }/moment/match`,
  playerHistory: `${ BASEURL }/player_team/player`,
  addPlayerHistory: `${ BASEURL }/player_team/add`,
  editPlayerHistoryStats: `${ BASEURL }/player_team/edit_stats`,
  managers: `${ BASEURL }/manager`,
  managerAdd: `${ BASEURL }/manager/add`,
  managerEdit: `${ BASEURL }/manager/edit`,
  managerHistory: `${ BASEURL }/manager_history/manager`,
  managerHistoryAdd: `${ BASEURL }/manager_history/add`,
  adminLogin: `${ BASEURL }/admin/login`,
  broadcasters: `${ BASEURL }/broadcasters`,
  addBroadcaster: `${ BASEURL }/broadcasters/add`,
  stadiums: `${ BASEURL }/stadiums`,
  partners: `${ BASEURL }/partners`,
  addPartner: `${ BASEURL }/partners/add`,
  news: `${ BASEURL }/news`,
  createNewsPost: `${ BASEURL }/news/create`,
  getAwards: `${ BASEURL }/awards`,
  addAward: `${ BASEURL }/awards/add`,
};

export default URLS;
