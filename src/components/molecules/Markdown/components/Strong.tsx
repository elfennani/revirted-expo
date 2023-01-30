import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useTheme from "hooks/useTheme";
import toReact from "../toReact";
import { marked } from "marked";

type Props = {
    token: marked.Tokens.Strong;
};

const Strong = ({ token }: Props) => {
    const theme = useTheme();
    return (
        <Text
            style={{
                fontFamily: theme.fonts.bold,
            }}
        >
            {toReact(token.tokens)}
        </Text>
    );
};

export default Strong;

const styles = StyleSheet.create({});
