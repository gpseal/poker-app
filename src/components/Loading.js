import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const ScreenLoading = () => {
  return (
    <div className="h-screen w-screen z-10 flex items-center justify-center">
      <h2 className="mr-2">Loading</h2>
      <FontAwesomeIcon icon={faSpinner} spin size="2xl" color="white" />
    </div>
  );
};

export const InlineLoading = () => {
  return (
    <div className="h-full w-full z-10 flex items-center justify-center">
      <p className="mr-2 text-white">Loading</p>
      <FontAwesomeIcon icon={faSpinner} spin size="2xl" color="white" />
    </div>
  );
};
