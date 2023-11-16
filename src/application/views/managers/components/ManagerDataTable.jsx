import { Avatar } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import CountryList from "country-list-with-dial-code-and-flag"
import ReactCountryFlag from "react-country-flag"
const {  differenceInYears } = require("date-fns")

function ManagerDataTable({ data, goToManagersProfile }) {
  const handleRowClick = ({ row }) => goToManagersProfile(row.id);
  return (
    <div className="h-[50vh] w-full">
      <DataGrid
        rows={rows(data)}
        columns={columns}
        pageSize={5}
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

export default ManagerDataTable;

const columns = [
  { field: "no", headerName: "No", width: 80 },
  { field: "id", headerName: "ID", width: 80, hide: true },
  {
    field: "manager",
    headerName: "Manager",
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
          {params.value.name.split("," || " ")[0]}
        </p>
      </div>
    ),
    sortComparator: (a, b) => (a.name > b.name ? 1 : -1),
  },
];

const rows = (data) => {
  const formattedRows = data.map((manager, index) => {
    /* const country = CountryList.find(
      (cty) => cty.dial_code.replace("+", "") === manager.country_code
    );*/
    return {
      no: index + 1,
      id: manager._id,
      manager: {
        name: manager.name,
        pic: manager.pic,
      },
      team: {
        name: manager.current_club.name,
        logo: manager.current_club.logo,
      },
      //age: new Date().getFullYear() - new Date(manager.dob).getFullYear(),
      age: differenceInYears(new Date(), manager.dob),
      nationality: {
        name:'null',// undefined country.name ,
        flag:'null' // undefined country.code ,
      },
    };
  });

  return formattedRows ?? [];
};
