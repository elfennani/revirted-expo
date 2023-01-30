import { View, Text, TextProps, StyleSheet } from "react-native";
import React from "react";
import useTheme from "hooks/useTheme";

interface Props extends TextProps {
    size?: "small" | "medium" | "large" | "xlarge" | "xxlarge" | "header";
    weight?: "regular" | "medium" | "bold";
    children: any | any[];
}

const StyledText = (props: Props) => {
    const theme = useTheme();
    let fontFamily = theme.fonts.regular;
    const weight = props.weight || "regular";

    if (weight != "regular")
        fontFamily = weight == "bold" ? theme.fonts.bold : theme.fonts.medium;

    return (
        <Text
            {...props}
            style={[
                {
                    fontFamily,
                    color: theme.colors.text,
                    fontSize: theme.fontSizes[props.size || "medium"],
                },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
};

export default StyledText;
