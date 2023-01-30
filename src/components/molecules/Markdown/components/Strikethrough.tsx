import { StyleSheet, Text, View } from "react-native";
import React from "react";
import toReact from "../toReact";
import { marked } from "marked";

type Props = {
    token: marked.Tokens.Del;
};

const Strikethrough = ({ token }: Props) => {
    return (
        <Text
            style={{
                // textDecorationStyle: "dashed",
                textDecorationLine: "line-through",
                textDecorationColor: "black",
                textDecorationStyle: "solid",
            }}
        >
            {toReact(token.tokens)}
        </Text>
    );
};

export default Strikethrough;

const styles = StyleSheet.create({});
