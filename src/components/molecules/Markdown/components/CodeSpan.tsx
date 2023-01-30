import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import useTheme from "hooks/useTheme";
import { marked } from "marked";
import StylesContext from "contexts/StylesContext";

type Props = {
    token: marked.Tokens.Codespan;
};

const CodeSpan = ({ token }: Props) => {
    const theme = useTheme();
    const styles = useContext(StylesContext);

    return (
        <Text
            style={[
                styles,
                {
                    backgroundColor: theme.colors.border,
                    fontFamily: theme.fonts.code,
                },
            ]}
        >
            {` ${token.text} `}
        </Text>
    );
};

export default CodeSpan;

const styles = StyleSheet.create({});
