export const generateYearOptions = (): Array<{
  label: string;
  value: string;
}> => {
   const currentYear = new Date().getFullYear();

   const minYear = 2024;
 
   const years = [];
   for (let year = currentYear; year >= minYear; year--) {
     years.push({ label: year.toString(), value: year.toString() });
   }
 
   return years; 
};