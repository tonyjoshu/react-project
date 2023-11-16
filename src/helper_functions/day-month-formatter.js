export default function dayMonthFormatter(dateValue) {
  if(dateValue < 10) return `0${dateValue}`
  return dateValue
}
