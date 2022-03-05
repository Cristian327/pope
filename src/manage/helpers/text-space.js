export const textLength = (text = "", length, addLastText = "...") => {
  return `${text.slice(0, length)}${addLastText}`;
};
