import CountryList from "country-list-with-dial-code-and-flag";

function findCountry(callCode)
{
  let country
  try
  {
    country = CountryList.find(
      (cty) => cty.dial_code.replace("+", "") === callCode
    ) ?? CountryList.find(
      (cty) => cty.code === callCode
    );

  } catch (error)
  {
    sonsole.log(error)
  }
  return country;
}

export default findCountry;
