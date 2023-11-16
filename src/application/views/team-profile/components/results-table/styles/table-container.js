const tableContainer = (teamInfo) => {
  return {
    marginTop: 20,
    borderRadius: 10,
    border: `1px solid ${teamInfo?.team_color}`,
  };
};

export default tableContainer;
