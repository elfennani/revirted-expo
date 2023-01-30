import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React, { useRef, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import InView from "@components/atoms/InView";
import StyledText from "@components/atoms/StyledText";
import useTheme from "hooks/useTheme";
import IconButton from "@components/atoms/IconButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Spacer from "@components/atoms/Spacer";
import Slider from "@react-native-community/slider";
import { lightTheme } from "@utils/theme";
import { RedditVideoData } from "api/posts";
import { formatDuration } from "@utils/functions";

type Props = { videoData: RedditVideoData };

const VideoPlayer = ({
    videoData: { hlsUrl: videoSrc, height, width, duration },
}: Props) => {
    const video = useRef<Video>(null);
    const dimensions = useWindowDimensions();
    const theme = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [finished, setFinished] = useState(false);

    const togglePlayback = () => {
        console.log(finished);
        if (!video.current) return;

        if (finished) video.current.replayAsync();
        else if (isPlaying) video.current.pauseAsync();
        else video.current.playAsync();

        setFinished(false);
    };

    return (
        <View>
            <View
                style={{
                    flexDirection: "column",
                    backgroundColor: "black",
                    flex: 1,
                }}
            >
                <Video
                    ref={video}
                    style={{
                        aspectRatio: width / height,
                        width: "100%",
                        alignSelf: "center",
                        maxHeight: dimensions.height / 2,
                        backgroundColor: "black",
                    }}
                    source={{
                        uri: videoSrc,
                    }}
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={isPlaying}
                    // isLooping
                    isMuted={isMuted}
                    onPlaybackStatusUpdate={(status) => {
                        if (status.isLoaded) {
                            setProgress(status.positionMillis);
                            if (status.didJustFinish) {
                                setFinished(true);
                            }
                            if (isPlaying != status.isPlaying)
                                setIsPlaying(status.isPlaying);
                        }
                    }}
                />
            </View>
            <View
                style={[
                    styles.controls,
                    {
                        backgroundColor: theme.colors.background,
                    },
                ]}
            >
                <IconButton onPress={togglePlayback}>
                    <Ionicons
                        name={
                            !finished
                                ? isPlaying
                                    ? "pause"
                                    : "play"
                                : "reload"
                        }
                        color={theme.colors.grey}
                        size={18}
                    />
                </IconButton>
                <Slider
                    style={{ flex: 1 }}
                    maximumTrackTintColor={theme.colors.text}
                    upperLimit={100}
                    lowerLimit={0}
                    thumbTintColor={theme.colors.primary}
                    minimumTrackTintColor={theme.colors.primary}
                    value={progress / (duration * 1000)}
                />
                <StyledText style={styles.text} size="small">
                    {formatDuration(progress / 1000)} /{" "}
                    {formatDuration(duration)}
                </StyledText>
                <Spacer horizontal size="smaller" />
                <IconButton onPress={() => setIsMuted((muted) => !muted)}>
                    <Ionicons
                        name={isMuted ? "volume-mute" : "volume-high"}
                        color={theme.colors.grey}
                        size={18}
                    />
                </IconButton>
            </View>
        </View>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    controls: {
        margin: lightTheme.spacing.small,
        borderRadius: lightTheme.borderRadius.medium,
        padding: lightTheme.spacing.smaller,
        flexDirection: "row",
        marginBottom: 0,
        alignItems: "center",
    },
    text: {},
});
