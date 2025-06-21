import {  PuffLoader } from "react-spinners";


export default function LoaderCircle() {
  return (
    <div className="flex w-full justify-center">
      <PuffLoader
        className="absolute top-2"
        color={"#000000"}
        loading={true}
        cssOverride={{}}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
