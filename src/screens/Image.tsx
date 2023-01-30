import {
    Image,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import ImageViewer from "react-native-image-zoom-viewer";

type Props = NativeStackScreenProps<RootStackParamList, "Image">;

const ImageScreen = ({
    route: {
        params: { images },
    },
    navigation,
}: Props) => {
    const { width } = useWindowDimensions();
    return (
        <View style={styles.view}>
            <ImageViewer
                imageUrls={images.map(({ url }) => ({ url }))}
                enableSwipeDown
                onCancel={navigation.goBack}
                saveToLocalByLongPress={false}
                style={{ width }}
                show={false}
            />
        </View>
    );
};

export default ImageScreen;

const styles = StyleSheet.create({
    view: {
        backgroundColor: "black",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
});
