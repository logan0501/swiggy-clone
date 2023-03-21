import React, { Fragment, useState } from "react";
import Header from "./components/Header/Header";
import OfferCorousel from "./components/OfferCorousel/OfferCorousel";
import Restaurants from "./components/Restaurants/Restaurants";
import {
  closeMenuCard,
  menuCardChangeHandler,
} from "../../utils/menuCard.handler";
import AuthMenuCard from "../../components/AuthMenuCard/AuthMenuCard";

export default function Home() {
  const [showCard, setShowCard] = useState(false);
  const [menuStatus, setMenuStatus] = useState("login");

  const menuChangeHandler = (newchange) => {
    setMenuStatus(newchange);
    setShowCard(true);
    menuCardChangeHandler();
  };

  const closeMenuHandler = () => {
    setShowCard(false);
    closeMenuCard(setShowCard);
  };
  return (
    <Fragment>
      <Header onMenuChange={menuChangeHandler} />
      <AuthMenuCard
        showCard={showCard}
        menuStatus={menuStatus}
        onMenuChange={menuChangeHandler}
        onCloseMenu={closeMenuHandler}
      />
      <OfferCorousel />
      <Restaurants />
    </Fragment>
  );
}
