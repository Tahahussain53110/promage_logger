export const isDatePassed = (endDate: string) => {
  const currentDate = new Date();
  const endDateTime = new Date(endDate);

  return endDateTime < currentDate;
};
