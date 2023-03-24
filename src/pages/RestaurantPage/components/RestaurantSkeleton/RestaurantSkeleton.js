import React from "react";
import Skeleton from "react-loading-skeleton";

function RestaurantSkeleton() {
  return (
    <div>
      <Skeleton width="100%" height="150px" />
      <Skeleton width="100%" height="100px" style={{ marginTop: "20px" }} />
      <Skeleton width="100%" height="50px" style={{ marginTop: "20px" }} />
      <Skeleton width="100%" height="50px" style={{ marginTop: "20px" }} />
      <Skeleton width="100%" height="50px" style={{ marginTop: "20px" }} />
      <Skeleton width="100%" height="50px" style={{ marginTop: "20px" }} />
      <Skeleton width="100%" height="50px" style={{ marginTop: "20px" }} />
      <Skeleton width="100%" height="50px" style={{ marginTop: "20px" }} />
    </div>
  );
}

export default RestaurantSkeleton;
