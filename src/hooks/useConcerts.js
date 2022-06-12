import { useContext } from "react";
import ConcertsContext from "../context/ConcertsProvider";

const useConcerts = () => {
  return useContext(ConcertsContext);
};

export default useConcerts;
