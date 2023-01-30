import { StyleSheet, Text, View } from "react-native";
import React from "react";
import toReact from "../toReact";
import { marked } from "marked";
import useTheme from "hooks/useTheme";

type Props = {
    token: marked.Tokens.Blockquote;
};

const Blockquote = ({ token }: Props) => {
    const theme = useTheme();
    return (
        <View
            style={{
                borderLeftColor: theme.colors.link,
                borderLeftWidth: 2,
                paddingHorizontal: theme.spacing.medium,
                paddingVertical: theme.spacing.small,
            }}
        >
            <Text>{toReact(token.tokens)}</Text>
        </View>
    );
};

export default Blockquote;

const styles = StyleSheet.create({});
