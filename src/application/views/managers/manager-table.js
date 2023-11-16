const columns = [
  { field: "id", headerName: "No", width: 70, type: "number", sortable: false },
  { field: "manager_id", headerName: "ID", width: 70, hide: true },
  { field: "name", headerName: "Coach name", width: 200 },
  { field: "team", headerName: "Team", width: 200 },
  {
    field: "dob",
    headerName: "Age",
    width: 200,
    valueGetter: (params) =>
      `${new Date().getFullYear() - new Date(params.row.dob).getFullYear()}`,
  },
  { field: "nationality", headerName: "Nationality", width: 200 },
];

const rows = (managersHookData) => {
  return managersHookData.managers.map((manager, index) => {
    return {
      id: index + 1,
      manager_id: manager._id,
      name: manager.name,
      team: manager.current_club?.name,
      dob: manager.dob,
      nationality: managersHookData.countries.find(country => country.dial_code === `+${manager.country_code}`).name.split(",")[0] ?? '',
    };
  });
};

export { columns, rows };
