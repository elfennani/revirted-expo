import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Spacer from "@components/atoms/Spacer";
import useTheme from "hooks/useTheme";
import { marked } from "marked";
import toReact from "../toReact";

type Props = {
    token: marked.Tokens.Heading;
};

const Heading = ({ token }: Props) => {
    const theme = useTheme();
    const { tokens, depth } = token;

    const size = {
        1: "xxlarge",
        2: "xlarge",
        3: "large",
        4: "medium",
        5: "small",
        6: "small",
    } as const;

    type HeadingDepth = 1 | 2 | 3 | 4 | 5 | 6;

    return (
        <View key={Math.random()} style={{ marginTop: theme.spacing.medium }}>
            <Text
                style={{
                    fontFamily: theme.fonts.medium,
                    fontSize: theme.fontSizes[size[depth as HeadingDepth]],
                }}
            >
                {toReact(tokens)}
            </Text>
            <Spacer size="medium" />
            <View
                style={{
                    width: "100%",
                    height: 2,
                    backgroundColor: theme.colors.border,
                }}
            ></View>
            <Spacer size="medium" />
        </View>
    );
};

export default Heading;

const styles = StyleSheet.create({});
