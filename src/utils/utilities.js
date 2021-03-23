export const sort = (list, property) => {
  return list.sort((a, b) => (a[property] > b[property] ? 1 : -1));
};
