import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import numeral from "numeral";
import React from "react";
import ContainerView from "@components/atoms/ContainerView";
import StyledText from "@components/atoms/StyledText";
import { lightTheme } from "@utils/theme";
import { useQuery } from "@tanstack/react-query";
import { getUser, userSelector } from "api/users";
import Spacer from "@components/atoms/Spacer";
import IconButton from "@components/atoms/IconButton";
import { Entypo } from "@expo/vector-icons";
import useTheme from "hooks/useTheme";
const Profile = () => {
    const theme = useTheme();
    const { data, isError, isLoading } = useQuery(
        ["profile"],
        () => getUser(),
        {
            select: userSelector,
        }
    );

    return (
        <ContainerView
            style={[
                styles.card,
                {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                },
            ]}
        >
            {isError ? (
                <StyledText style={{ color: "red" }}>Error Occured</StyledText>
            ) : isLoading || !data ? (
                <StyledText>Loading...</StyledText>
            ) : (
                <TouchableOpacity activeOpacity={0.66}>
                    <View style={styles.profile}>
                        <Image
                            source={{ uri: data.icon, width: 64, height: 64 }}
                            style={[
                                styles.image,
                                {
                                    backgroundColor: "transparent",
                                },
                            ]}
                        />
                        <Spacer horizontal size="medium" />
                        <View style={styles.info}>
                            <StyledText
                                style={{ color: theme.colors.grey }}
                                size="small"
                            >
                                u/{data.name}
                            </StyledText>
                            <StyledText style={styles.title} weight="medium">
                                {data.fullName}
                            </StyledText>
                            <Spacer size="full" />
                            <StyledText size="small">
                                {data.createdSince} ago •{" "}
                                {numeral(data.karma).format("0.0a")} karma
                            </StyledText>
                        </View>
                        <IconButton style={styles.arrow}>
                            <Entypo
                                name="chevron-small-right"
                                size={24}
                                color={theme.colors.grey}
                            />
                        </IconButton>
                    </View>
                </TouchableOpacity>
            )}
        </ContainerView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: lightTheme.colors.border,
        borderRadius: lightTheme.borderRadius.medium,
        flexDirection: "column",
    },
    arrow: {
        alignSelf: "center",
    },
    profile: {
        flexDirection: "row",
    },
    image: {
        borderRadius: lightTheme.borderRadius.medium,
    },
    username: {
        color: lightTheme.colors.grey,
    },
    title: {
        fontSize: lightTheme.fontSizes.xlarge,
    },
    info: {
        flex: 1,
    },
});
