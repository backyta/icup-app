export const generateYearOptions = (
  minYear: number
): Array<{
  label: string;
  value: string;
}> => {
  const currentYear = new Date().getFullYear();

  const years = [];
  for (let year = currentYear; year >= minYear; year--) {
    years.push({ label: year.toString(), value: year.toString() });
  }

  return years;
};
