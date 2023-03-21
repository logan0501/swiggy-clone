import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import Checkout from "./pages/Checkout/Checkout";
import CartProvider from "./store/CartProvider";
import RestaurantsProvider from "./store/RestaurantsProvider";
import LocationProvider from "./store/LocationProvider";
import UserProvider from "./store/UserProvider";
import PaymentSuccessful from "./pages/PaymentSuccessful/PaymentSuccessful";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App val="temp" />,
  },
  {
    path: "/restaurant-menu/:id",
    element: <RestaurantPage />,
  },
  {
    path: "/check-out",
    element: <Checkout />,
  },
  {
    path: "/payment-successful",
    element: <PaymentSuccessful />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <UserProvider>
        <LocationProvider>
          <RestaurantsProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </RestaurantsProvider>
        </LocationProvider>
      </UserProvider>
    </DevSupport>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
