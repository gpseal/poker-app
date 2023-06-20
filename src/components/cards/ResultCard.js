import { useState } from "react";
import { InlineLoading } from "../misc/Loading";

const ResultCard = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {!isLoaded && <InlineLoading />}
      <img
        onLoad={() => setIsLoaded(true)}
        key={props.key}
        className={`sm:w-20 lg:w-40 w-[20%] px-1 sm:px-2 ${
          !isLoaded ? "hidden" : "visible"
        }`}
        src={props.src}
        alt={props.alt}
      />
    </>
  );
}

export default ResultCard