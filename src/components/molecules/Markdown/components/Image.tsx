import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { marked } from "marked";
import StyledText from "@components/atoms/StyledText";
import { lightTheme } from "@utils/theme";
import Spacer from "@components/atoms/Spacer";

type Props = {
    token: marked.Tokens.Image;
};

const ImageMD = ({ token }: Props) => {
    return (
        <View>
            <Image
                source={{
                    uri: token.href,
                }}
                style={{
                    // width: "100%",
                    width: 300,
                    maxWidth: "100%",
                    aspectRatio: 16 / 9,
                    borderRadius: lightTheme.borderRadius.medium,
                    backgroundColor: "black",
                }}
                resizeMode="contain"
            />
            <Spacer />
            <StyledText style={{ textAlign: "center" }}>
                {token.text}
            </StyledText>
        </View>
    );
};

export default ImageMD;
