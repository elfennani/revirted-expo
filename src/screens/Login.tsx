import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import StyledButton from "@components/atoms/StyledButton";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import base64 from "base-64";
import * as SecureStore from "expo-secure-store";
import useAuth from "hooks/useAuth";

type Props = {};

const Login = (props: Props) => {
    const { signIn, request } = useAuth();

    return (
        <View>
            <StyledButton
                disabled={!request}
                title="login with reddit"
                onPress={() => signIn()}
            />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({});
