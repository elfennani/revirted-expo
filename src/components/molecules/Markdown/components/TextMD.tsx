import StylesContext from "contexts/StylesContext";
import { decode } from "entities";
import { marked } from "marked";
import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import toReact from "../toReact";

type Props = {
    token: marked.Tokens.Text | marked.Tokens.Tag;
};

const TextMD = ({ token }: Props) => {
    const styles = useContext(StylesContext);

    if ((token as any).tokens) return <>{toReact((token as any).tokens)}</>;

    return <Text style={[styles]}>{decode(token.text)}</Text>;
};

export default TextMD;

const styles = StyleSheet.create({});
