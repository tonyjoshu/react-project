const rows = (players) => {
  return players.map((player, index) => {
    return {
      id: index + 1,
      player_id: player._id,
      name: player.name,
      team: player.current_club?.name,
      dob: player.dob,
      nationality: player.country.split(",")[0],
    };
  });
};

export default rows;
