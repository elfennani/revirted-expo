import { encode } from "base-64";
import TokenContext from "contexts/TokenContext";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { useContext, useEffect } from "react";

const endpoints = {
    authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
    tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
};

export default () => {
    const [token, setToken] = useContext(TokenContext);

    const redirectUri = makeRedirectUri({
        native: "exp://localhost:19000/--/*",
    });

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: "q0iGQg8zyWsUZXILJljX9w",
            scopes: [
                "identity",
                "edit",
                "flair",
                "history",
                "modconfig",
                "modflair",
                "modlog",
                "modposts",
                "modwiki",
                "mysubreddits",
                "privatemessages",
                "read",
                "report",
                "save",
                "submit",
                "subscribe",
                "vote",
                "wikiedit",
                "wikiread",
            ],
            redirectUri,
            extraParams: {
                duration: "permanent",
            },
        },
        endpoints
    );

    useEffect(() => {
        exchangeToken();
    }, [response]);

    const exchangeToken = async () => {
        if (response?.type == "success") {
            const { code } = response.params;

            if (code) {
                const res = await fetch(endpoints.tokenEndpoint, {
                    method: "POST",
                    body: new URLSearchParams({
                        grant_type: "authorization_code",
                        redirect_uri: redirectUri,
                        code,
                    }).toString(),
                    headers: {
                        Authorization: `Basic ${encode(
                            "q0iGQg8zyWsUZXILJljX9w:"
                        )}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });

                const data = await res.json();

                await setData(data);
            }
        }
    };

    const refreshToken = async () => {
        const refreshToken = await getItemAsync("refreshKey");

        if (!refreshToken) throw new Error("Can't get refresh token");

        const res = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: "POST",
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }).toString(),
            headers: {
                Authorization: `Basic ${encode("q0iGQg8zyWsUZXILJljX9w:")}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = await res.json();
        await setData(data);
    };

    const setData = async (data: any) => {
        if (!data.access_token) throw new Error("auth error");

        await Promise.all([
            setItemAsync("refreshKey", data.refresh_token),
            setItemAsync("accessKey", data.access_token),
            setItemAsync(
                "expiresIn",
                (Date.now() + data.expires_in * 1000).toString()
            ),
        ]);

        setToken(data.access_token);
    };

    const signOut = async () => {
        await Promise.all([
            deleteItemAsync("accessKey"),
            deleteItemAsync("refreshKey"),
            deleteItemAsync("expiresIn"),
        ]);

        setToken(null);
    };

    return {
        request,
        signIn: promptAsync,
        signOut,
        token,
        refreshToken,
    };
};
