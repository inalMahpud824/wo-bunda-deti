export const truncateText = (text, charLimit = 155) => {
  return text.length > charLimit
    ? text.slice(0, charLimit).trimEnd() + "..."
    : text;
};
