export const calcDate = (dateValueItem) => {
  const dateNow = new Date();
  const dateItem = new Date(dateValueItem);

  //   Time to one secor 1000 = 1second
  //   60 seconds + 60 minutes + 24hours + 7 days + 4 weeks
  const time = (dateItem.getTime() - dateNow.getTime()) / 1000;
  const year = Math.abs(Math.round(time / (60 * 60 * 24) / 365.25));
  const month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
  const days = Math.abs(Math.round(time / (3600 * 24)));
  return { year, month, days };
};
