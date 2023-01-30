import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerView from "@components/atoms/ContainerView";
import useTheme from "hooks/useTheme";
import { marked } from "marked";

type Props = {
    token: marked.Tokens.Code;
};

const CodeBlock = ({ token }: Props) => {
    const theme = useTheme();
    return (
        <ContainerView
            style={{
                backgroundColor: theme.colors.headerBackground,
            }}
        >
            <Text
                style={{
                    color: theme.colors.text,
                    fontFamily: theme.fonts.code,
                    fontSize: theme.fontSizes.small,
                }}
            >
                {token.text}
            </Text>
        </ContainerView>
    );
};

export default CodeBlock;

const styles = StyleSheet.create({});
