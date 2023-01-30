import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useTheme from "hooks/useTheme";

type Props = {};

const Hr = (props: Props) => {
    const theme = useTheme();
    return (
        <View
            style={{
                width: "100%",
                height: 2,
                backgroundColor: theme.colors.border,
                marginBottom: 8,
            }}
        ></View>
    );
};

export default Hr;

const styles = StyleSheet.create({});
