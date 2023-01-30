import { darkTheme, lightTheme } from "@utils/theme";
import ThemeContext from "contexts/ThemeContext";
import { useContext } from "react";

export default () => {
    const theme = useContext(ThemeContext);

    return theme == "light" ? lightTheme : darkTheme;
};
