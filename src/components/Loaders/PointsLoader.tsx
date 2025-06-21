import { SyncLoader } from "react-spinners";


export default function PointsLoader() {
  return (
    <div className="flex w-full justify-center">
      <SyncLoader
        color={"#000000"}
        loading={true}
        cssOverride={{}}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
