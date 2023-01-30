import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Markdown from "react-native-markdown-display";
import useTheme from "hooks/useTheme";

type Props = {
    children: string;
    style?: StyleSheet.NamedStyles<any>;
};

const FormatedText = ({ children, style }: Props) => {
    const theme = useTheme();

    return (
        <Markdown
            style={{
                ...style,
                body: {
                    padding: 0,
                    fontFamily: theme.fonts.regular,
                    lineHeight: 18,
                    color: theme.colors.text,
                    ...style?.body,
                },
                link: {
                    color: theme.colors.link,
                    textDecorationLine: "none",
                    ...style?.link,
                },
            }}
        >
            {children}
        </Markdown>
    );
};

export default FormatedText;

const styles = StyleSheet.create({});
