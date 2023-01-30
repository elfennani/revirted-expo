import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useTheme from "hooks/useTheme";
import toReact from "../toReact";
import { marked } from "marked";

type Props = {
    token: marked.Tokens.Paragraph;
};

const Paragraph = ({ token }: Props) => {
    const theme = useTheme();
    return (
        <Text
            style={{
                fontFamily: theme.fonts.regular,
            }}
        >
            {toReact(token.tokens)}
        </Text>
    );
};

export default Paragraph;

const styles = StyleSheet.create({});
