import { StyleSheet, Text, View } from "react-native";
import React from "react";
import toReact from "../toReact";
import useTheme from "hooks/useTheme";
import { marked } from "marked";
import StyledText from "@components/atoms/StyledText";

type Props = {
    token: marked.Tokens.List;
};

const List = ({ token }: Props) => {
    const theme = useTheme();

    return (
        <View>
            {token.items.map((item, index) => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginBottom: theme.spacing.small,
                    }}
                    key={index}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: theme.fontSizes.medium,
                                lineHeight: 16,
                                color: theme.colors.text,
                            }}
                        >
                            •{" "}
                        </Text>
                    </View>
                    <View>
                        <StyledText style={{ fontFamily: theme.fonts.regular }}>
                            {item.checked != undefined &&
                                `[${item.checked ? "x" : " "}] `}
                            {toReact(item.tokens)}
                        </StyledText>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default List;

const styles = StyleSheet.create({});
