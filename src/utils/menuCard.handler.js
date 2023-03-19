export const menuCardChangeHandler = () => {
  document.body.classList.add("body-fixed");
};

export const closeMenuCard = (setShowCard) => {
  document.body.classList.remove("body-fixed");
};
