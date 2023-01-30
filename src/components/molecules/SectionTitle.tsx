import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StyledText from "@components/atoms/StyledText";
import { lightTheme } from "@utils/theme";
import Spacer from "@components/atoms/Spacer";
import useTheme from "hooks/useTheme";

type Props = {
    title: string;
    secondary?: string;
};

const SectionTitle = (props: Props) => {
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <StyledText
                style={[styles.text, { color: theme.colors.darkGrey }]}
                size="small"
                weight="bold"
            >
                {props.title}
            </StyledText>
            {props.secondary && (
                <>
                    <Spacer size="small" horizontal />
                    <StyledText
                        style={{ ...styles.text, ...styles.secondary }}
                        size="small"
                        weight="regular"
                    >
                        {props.secondary}
                    </StyledText>
                </>
            )}
        </View>
    );
};

export default SectionTitle;

const styles = StyleSheet.create({
    container: {
        paddingVertical: lightTheme.spacing.small,
        paddingHorizontal: lightTheme.spacing.medium,
        flexDirection: "row",
    },
    text: {
        textTransform: "uppercase",
        color: lightTheme.colors.darkGrey,
        letterSpacing: 1,
    },
    secondary: {
        color: lightTheme.colors.grey,
    },
});
