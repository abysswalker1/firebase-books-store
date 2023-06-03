export const years = (function() {
  const startYear = 2000;
  const endYear = 2023;
  const yearsArray = [];

  for (let year = startYear; year <= endYear; year++) {
    yearsArray.push(year);
  }

  return yearsArray;
})()