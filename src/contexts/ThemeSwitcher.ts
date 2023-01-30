import { createContext } from "react";
import { Theme } from "types";

export default createContext<(theme?: Theme) => void>(() => {});
