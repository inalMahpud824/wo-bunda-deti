export const formatPrice = (price) => {
  if (typeof price !== "number" && typeof price !== "string") return "";

  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
