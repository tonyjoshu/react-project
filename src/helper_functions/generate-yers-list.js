const generateYearsList = () => {
  let currentYear = new Date().getFullYear();
  let years = new Set();
  let startYear = 2000;
  while (startYear <= currentYear + 1) {
    years.add(`${startYear}-${startYear + 1}`);
    startYear = startYear + 1;
  }

  return [...years];
};

export default generateYearsList
