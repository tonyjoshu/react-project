import { Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CountryList from "country-list-with-dial-code-and-flag";
import ReactCountryFlag from "react-country-flag";

function PlayerDataTable({ playersData, goToPlayerProfile }) {
  
  const handleRowClick = ({ row }) => goToPlayerProfile(row.id);
  return (
    <div className="h-[100vh] w-full">
      <DataGrid
        rows={rows(playersData)}
        columns={columns}
        pageSize={30}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        density={"standard"}
        disableColumnMenu
        editMode={"row"}
        className="px-2 cursor-pointer"
        onRowClick={handleRowClick}
      />
    </div>
  );
}

export default PlayerDataTable;

const columns = [
  { field: "no", headerName: "No", width: 80 },
  { field: "id", headerName: "ID", width: 80, hide: true },
  {
    field: "player",
    headerName: "Player",
    width: 200,
    valueFormatter: (params) => params.value.name,
    renderCell: (params) => (
      <div className="flex gap-2 items-center">
        {params.value.pic ? (
          <Avatar src={params.value.pic} className="border border-[tomato]" />
        ) : (
          <div className="w-[40px]" />
        )}
        <p className="font-bold whitespace-nowrap">{params.value.name}</p>
      </div>
    ),
    sortComparator: (a, b) => (a.name > b.name ? 1 : -1),
  },
  {
    field: "team",
    headerName: "Team",
    width: 200,
    valueFormatter: (params) => params.value.name,
    renderCell: (params) => (
      <div className="flex gap-2 items-center">
        {params.value.logo ? (
          <Avatar src={params.value.logo} className="border border-[tomato]" />
        ) : (
          <div className="w-[40px]" />
        )}
        <p className="font-bold whitespace-nowrap">{params.value.name}</p>
      </div>
    ),
    sortComparator: (a, b) => (a.name > b.name ? 1 : -1),
  },
  { field: "age", headerName: "Age", width: 120 },
  {
    field: "nationality",
    headerName: "Country",
    width: 200,
    valueFormatter: (params) => params.value.name,
    renderCell: (params) => (
      <div className="flex gap-2 items-center">
        {params.value.flag ? (
          <ReactCountryFlag
            className="text-[40px] aspect-square"
            countryCode={params.value.flag}
            svg
          />
        ) : (
          <div className="w-[40px]" />
        )}
        <p className="font-bold whitespace-nowrap">
          {params.value?.name?.split("," || " ")[0] ?? ""}
        </p>
      </div>
    ),
    sortComparator: (a, b) => (a.name > b.name ? 1 : -1),
  },
];

const rows = (playersData) => {
  const formattedRows = playersData.map((player, index) => {
    const country = CountryList.find(
      (cty) => cty.dial_code.replace("+", "") === player.country_code
    );
    return {
      no: index + 1,
      id: player._id,
      player: {
        name: player.name,
        pic: player.pic,
      },
      team: {
        name: player.current_club?.name,
        logo: player.current_club?.logo,
      },
      age: new Date().getFullYear() - new Date(player.dob).getFullYear(),
      nationality: {
        name: country?.name,
        flag: country?.code,
      },
    };
  });
  return formattedRows ?? [];
};
