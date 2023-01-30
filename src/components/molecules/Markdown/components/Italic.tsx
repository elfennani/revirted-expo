import { StyleSheet, Text, View } from "react-native";
import React from "react";
import toReact from "../toReact";
import { marked } from "marked";

type Props = {
    token: marked.Tokens.Em;
};

const Italic = ({ token }: Props) => {
    return (
        <Text
            style={{
                fontStyle: "italic",
            }}
        >
            {toReact(token.tokens)}
        </Text>
    );
};

export default Italic;

const styles = StyleSheet.create({});
