import moment from "moment-timezone";

export const DateFormate = (isoDate) => {
  const humanReadableDate = moment(isoDate)
    .tz("Asia/Dubai")
    .format("DD MMM YYYY, h:mmA");
  return humanReadableDate;
};
