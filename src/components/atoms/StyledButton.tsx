import {
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React from "react";
import { lightTheme } from "@utils/theme";
import StyledText from "./StyledText";
import useTheme from "hooks/useTheme";

interface Props extends PressableProps {
    title: string;
    secondary?: boolean;
    children?: any | any[];
}

const StyledButton = (props: Props) => {
    const theme = useTheme();
    return (
        <View
            style={{
                ...styles.buttonContainer,
                ...(props.secondary && styles.secondaryButtonContainer),
                ...(props.disabled && styles.diabledButtonContainer),
            }}
        >
            <Pressable
                android_ripple={{
                    color: theme.colors.ripple,
                    borderless: true,
                }}
                {...props}
                style={[
                    {
                        ...styles.button,
                        ...(props.secondary && styles.secondaryButton),
                    },
                ]}
            >
                {props.children}
                <StyledText
                    size="medium"
                    style={{
                        ...styles.buttonText,
                        ...(props.secondary && styles.secondaryButtonText),
                    }}
                    // weight="medium"
                >
                    {props.title}
                </StyledText>
            </Pressable>
        </View>
    );
};

export default StyledButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: lightTheme.borderRadius.small,
        backgroundColor: lightTheme.colors.primary,
        alignItems: "stretch",
        justifyContent: "center",
    },
    button: {
        paddingHorizontal: lightTheme.spacing.medium,
        paddingVertical: lightTheme.spacing.small,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    diabledButtonContainer: {
        backgroundColor: lightTheme.colors.border,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    secondaryButtonContainer: {
        // elevation: 0,
        backgroundColor: "transparent",
    },
    secondaryButton: {},
    secondaryButtonText: {
        color: lightTheme.colors.primary,
    },
});
