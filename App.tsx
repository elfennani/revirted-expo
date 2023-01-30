import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Home from "@screens/Home";
import {
    useFonts,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
} from "@expo-google-fonts/outfit";

import { FiraMono_400Regular } from "@expo-google-fonts/fira-mono";

import { lightTheme, darkTheme } from "@utils/theme";
import StyledText from "@components/atoms/StyledText";
import {
    SafeAreaProvider,
    useSafeAreaFrame,
} from "react-native-safe-area-context";
import Header from "@components/molecules/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import Login from "@screens/Login";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import TokenContext from "contexts/TokenContext";
import { makeRedirectUri } from "expo-auth-session";
import { encode } from "base-64";
import useAuth from "hooks/useAuth";
import PostScreen from "@screens/PostScreen";
import Image from "@screens/Image";
import { ImageMetadata, PostData } from "api/posts";
import { Theme } from "types";
import ThemeSwitcher from "contexts/ThemeSwitcher";
import ThemeContext from "contexts/ThemeContext";
import Test from "@screens/Test";
import Linking from "expo-linking";

export type RootStackParamList = {
    Test: undefined;
    Home: undefined;
    Post: { id: string };
    Login: undefined;
    Image: { images: { url: string; aspectRatio: number }[] };
};

const Stack = createStackNavigator<RootStackParamList>();

const client = new QueryClient();

export default function App() {
    const [fontIsLoaded] = useFonts({
        Outfit_R: Outfit_400Regular,
        Outfit_M: Outfit_500Medium,
        Outfit_B: Outfit_600SemiBold,
        Fira_Mono: FiraMono_400Regular,
    });

    // console.log(Linking.);

    const tokenState = useState<string | null>(null);
    const [token, setToken] = tokenState;
    const [isUserLoading, setIsUserLoading] = useState(true);
    const { refreshToken } = useAuth();
    const [theme, setTheme] = useState<Theme>("dark");
    const tokenStateContextValue = useMemo(() => tokenState, [token]);

    const switchTheme = useCallback(
        (newTheme?: Theme) =>
            setTheme((theme) =>
                newTheme || theme == "dark" ? "light" : "dark"
            ),
        []
    );

    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background:
                theme == "dark"
                    ? darkTheme.colors.background
                    : lightTheme.colors.background,
        },
    };

    useEffect(() => {
        retrieveToken();
        const interval = setInterval(() => {}, 3600 * 1000);

        return () => clearInterval(interval);
    }, []);

    const retrieveToken = async () => {
        const [token, expiresIn] = await Promise.all([
            getItemAsync("accessKey"),
            getItemAsync("expiresIn"),
        ]);
        const expiration = Number(expiresIn);
        if (expiration && !isNaN(expiration)) {
            const twoHoursPrior = Date.now() + 3600 * 2 * 1000;

            if (twoHoursPrior > expiration) {
                refreshToken();
            }
        }

        setIsUserLoading(false);
        setToken(token);
    };

    const transitionSpec = {
        open: {
            animation: "timing",
            config: { duration: 100 },
        } as TransitionSpec,
        close: {
            animation: "timing",
            config: { duration: 100 },
        } as TransitionSpec,
    };

    if (!fontIsLoaded || isUserLoading) return null;

    return (
        <QueryClientProvider client={client}>
            <TokenContext.Provider value={tokenStateContextValue}>
                <ThemeSwitcher.Provider value={switchTheme}>
                    <ThemeContext.Provider value={theme}>
                        <SafeAreaProvider>
                            <StatusBar
                                style={theme == "dark" ? "light" : "dark"}
                            />
                            <NavigationContainer theme={MyTheme}>
                                <Stack.Navigator
                                    screenOptions={{
                                        transitionSpec,
                                    }}
                                >
                                    {token ? (
                                        <>
                                            <Stack.Group
                                                screenOptions={{
                                                    header: (props) => (
                                                        <Header {...props} />
                                                    ),
                                                    headerMode: "screen",
                                                }}
                                            >
                                                {/* <Stack.Screen
                                                    name="Test"
                                                    component={Test}
                                                /> */}
                                                <Stack.Screen
                                                    name="Home"
                                                    component={Home}
                                                />
                                                <Stack.Screen
                                                    name="Post"
                                                    component={PostScreen}
                                                />
                                            </Stack.Group>
                                            <Stack.Group
                                                screenOptions={{
                                                    presentation:
                                                        "transparentModal",
                                                    headerShown: false,
                                                }}
                                            >
                                                <Stack.Screen
                                                    name="Image"
                                                    component={Image}
                                                />
                                            </Stack.Group>
                                        </>
                                    ) : (
                                        <Stack.Screen
                                            name="Login"
                                            component={Login}
                                        />
                                    )}
                                </Stack.Navigator>
                            </NavigationContainer>
                        </SafeAreaProvider>
                    </ThemeContext.Provider>
                </ThemeSwitcher.Provider>
            </TokenContext.Provider>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({});
