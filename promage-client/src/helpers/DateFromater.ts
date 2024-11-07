export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-GB');
};
