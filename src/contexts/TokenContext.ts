import { createContext } from "react";

type TokenContext = [
    token: string | null,
    setToken: (val: string | null) => void
];

export default createContext<TokenContext>([null, () => {}]);
