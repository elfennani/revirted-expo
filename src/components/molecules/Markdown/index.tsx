import {
    ScrollView,
    StyleProp,
    StyleSheet,
    Text,
    TextProps,
    TextStyle,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import fi from "date-fns/esm/locale/fi/index.js";
import toReact from "./toReact";
import StylesContext from "contexts/StylesContext";
import useTheme from "hooks/useTheme";

type Props = {
    children: string;
};

const Markdown = ({ children }: Props) => {
    const output = toReact(marked.lexer(children), true);
    const theme = useTheme();

    return (
        <StylesContext.Provider value={{ color: theme.colors.text }}>
            {output}
        </StylesContext.Provider>
    );
};

export default Markdown;

const styles = StyleSheet.create({});
