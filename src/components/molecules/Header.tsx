import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { lightTheme } from "@utils/theme";
import StyledText from "@components/atoms/StyledText";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StackHeaderProps } from "@react-navigation/stack";
import IconButton from "@components/atoms/IconButton";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "hooks/useTheme";
import ThemeSwitcher from "contexts/ThemeSwitcher";
import ContainerView from "@components/atoms/ContainerView";

interface Props extends StackHeaderProps {}

const Header = (props: Props) => {
    const { top } = useSafeAreaInsets();
    const theme = useTheme();
    const switchTheme = useContext(ThemeSwitcher);

    return (
        <View
            style={{
                ...styles.container,
                paddingTop: top + theme.spacing.medium,
                backgroundColor: theme.colors.headerBackground,
                borderBottomColor: theme.colors.border,
            }}
        >
            <View style={styles.title}>
                <StyledText
                    weight="bold"
                    size="xxlarge"
                    style={{ color: theme.colors.primary }}
                >
                    Re
                </StyledText>
                <StyledText
                    weight="bold"
                    size="xxlarge"
                    style={{
                        color: theme.colors.text,
                    }}
                >
                    Virted
                </StyledText>
            </View>
            <ContainerView style={{ paddingVertical: 0 }}>
                <TouchableOpacity
                    hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
                    onPress={() => switchTheme()}
                >
                    <Ionicons
                        name={theme.dark ? "sunny" : "moon"}
                        size={18}
                        color={theme.colors.darkGrey}
                    />
                </TouchableOpacity>
            </ContainerView>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
    },
    container: {
        padding: lightTheme.spacing.medium,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // borderBottomColor: theme.colors.border,
        borderBottomWidth: 1,
    },
    goBackButton: {},
});
