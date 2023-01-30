import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { lightTheme } from "@utils/theme";

type Props = {
    size?: "smaller" | "small" | "medium" | "large" | "full";
    horizontal?: boolean;
};

const Spacer = ({ size = "small", horizontal }: Props) => {
    return (
        <View
            style={
                size == "full"
                    ? { flex: 1 }
                    : horizontal
                    ? { width: lightTheme.spacing[size] }
                    : { height: lightTheme.spacing[size] }
            }
        ></View>
    );
};

export default Spacer;
