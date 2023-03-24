import { useState } from "react";
import classes from "./OfferCorousel.module.css";
import { OFFERCARD } from "../../../../constants/OfferCards";
import { map } from "lodash";

let count = 0;
let currentIdx = 0;
export default function OfferCorousel() {
  const [corouselVal, setCorousel] = useState(0);
  const moveRightHandler = () => {
    if (currentIdx >= 3) return;
    count = 1;
    currentIdx++;
    setCorousel((prev) => prev - 320);
  };
  const moveLeftHandler = () => {
    if (currentIdx <= 0) return;
    count = -1;
    currentIdx--;
    setCorousel((prev) => prev + 320);
  };
  return (
    <section className={classes["food-offers-corousel-container"]}>
      <div className={classes["food-offers-div"]}>
        {map(OFFERCARD, (offer) => (
          <div
            key={offer.id}
            className={classes["offer-card"]}
            style={{
              transform: `translateX(${
                count === 1 ? corouselVal : count === -1 ? corouselVal : 0
              }px)`,
            }}
          >
            <img src={offer.url} width="260" height="260" alt="" />
          </div>
        ))}
      </div>
      <div
        className={
          classes["corousel-btn"] +
          " " +
          classes["c-right-btn"] +
          ` ${currentIdx < 3 ? "" : classes["disabled-btn"]}`
        }
        onClick={moveRightHandler}
      >
        <p
          className={`${
            currentIdx < 3 ? classes["enabled-p"] : classes["disabled-p"]
          }`}
        >
          &rarr;
        </p>
      </div>
      <div
        className={
          classes["corousel-btn"] +
          " " +
          classes["c-left-btn"] +
          ` ${currentIdx > 0 ? "" : classes["disabled-btn"]}`
        }
        onClick={moveLeftHandler}
      >
        <p
          className={`${
            currentIdx > 0 ? classes["enabled-p"] : classes["disabled-p"]
          }`}
        >
          &larr;
        </p>
      </div>
    </section>
  );
}
