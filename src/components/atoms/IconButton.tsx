import { lightTheme } from "@utils/theme";
import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

interface Props extends TouchableOpacityProps {}

const IconButton = (props: Props) => {
    return (
        <TouchableOpacity
            {...props}
            style={{ ...styles.button, ...(props.style as any) }}
            activeOpacity={0.75}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
            {props.children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: lightTheme.spacing.small,
    },
});

export default IconButton;
