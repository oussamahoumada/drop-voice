export function getCurrentDate() {
  let currentDate = new Date();
  let result = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  ].join('-');

  return result;
}
