const getSeason = (date) => {
  if (!date) return "";
  const _date = () => {
    let y = date.getFullYear();
    let m = date.getMonth();
    m = m + 1;

    if (m < 7) y = y - 1;

    return `${y}-${y + 1}`;
  };

  return _date();
};

export default getSeason;
