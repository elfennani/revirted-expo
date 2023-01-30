import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking,
} from "react-native";
import React from "react";
import useTheme from "hooks/useTheme";
import { marked } from "marked";
import toReact from "../toReact";
import StylesContext from "contexts/StylesContext";

type Props = {
    token: marked.Tokens.Link;
};

const Link = ({ token }: Props) => {
    const theme = useTheme();
    return (
        <StylesContext.Provider
            value={{
                color: theme.colors.link,
                fontFamily: theme.fonts.regular,
            }}
        >
            <TouchableOpacity onPress={() => Linking.openURL(token.href)}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 0,
                        marginBottom: -4, // <-- This one will take care of the pixels that RN add to TouchableOpacity when you wrap it within Text
                    }}
                >
                    {toReact(token.tokens)}
                </View>
            </TouchableOpacity>
        </StylesContext.Provider>
    );
};

export default Link;

const styles = StyleSheet.create({});
