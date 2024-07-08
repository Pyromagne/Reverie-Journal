import { useContext } from "react";

import StateContext from "../providers/ContextProvider";

const useLocalContext = () => {
    return useContext(StateContext);
}

export default useLocalContext;
