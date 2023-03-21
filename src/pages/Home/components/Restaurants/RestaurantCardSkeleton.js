import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function RestaurantCardSkeleton() {
  return (
    <div style={{ margin: "10px", marginBottom: "50px" }}>
      <Skeleton width="254px" height="160px" />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton width="254px" height="20px" />
        <Skeleton width="254px" height="20px" />
        <Skeleton width="254px" height="20px" />
      </div>
    </div>
  );
}
