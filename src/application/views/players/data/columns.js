const columns = [
  { field: "id", headerName: "No", width: 70, type: "number", sortable: false },
  { field: "player_id", headerName: "Player Id", width: 70, sortable: false, hide: true },
  { field: "name", headerName: "Player name", width: 150 },
  { field: "team", headerName: "Team", width: 160 },
  {
    field: "dob",
    headerName: "Age",
    width: 130,
    valueGetter: (params) =>
      `${new Date().getFullYear() - new Date(params.row.dob).getFullYear()}`,
  },
  { field: "nationality", headerName: "Nationality", width: 130 },
];

export default columns;
