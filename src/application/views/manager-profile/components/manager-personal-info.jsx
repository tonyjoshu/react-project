import Column from "src/application/shared/components/Column";
import ManagerProfileBullet from "./manager-profile-bullet";

function ManagerPersonalInformation({ managerProfileHook }) {
  return (
    <Column a_start j_center gap={10} style={{ width: "fit-content" }}>
      {data(managerProfileHook)?.map((datum, index) => (
        <ManagerProfileBullet
          key={index}
          label={datum.label}
          value={datum.value}
        />
      ))}
    </Column>
  );
}

export default ManagerPersonalInformation;

const data = (dataSource) => {
  const dateOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    weekday: "long",
  };
  return [
    { label: "Country", value: dataSource.manager?.countryName ?? "" },
    {
      label: "Date of birth",
      value: `${new Date(dataSource.manager?.dob).toLocaleDateString(
        "en-US",
        dateOptions
      )}`,
    },
    {
      label: "Age",
      value: `${
        new Date().getFullYear() -
        new Date(dataSource.manager?.dob).getFullYear()
      }`,
    },
  ];
};
