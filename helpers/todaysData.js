export function getTodaysData(objArray) {
  const today = new Date().toLocaleDateString();
  return objArray.filter((obj) => obj.date.toLocaleDateString() === today);
}
