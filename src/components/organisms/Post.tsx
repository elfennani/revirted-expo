import {
    Image,
    Linking,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    ViewProps,
    ViewStyle,
} from "react-native";
import React, { useRef, memo } from "react";
import ContainerView from "@components/atoms/ContainerView";
import { lightTheme } from "@utils/theme";
import StyledText from "@components/atoms/StyledText";
import { formatDistance } from "@utils/functions";
import Spacer from "@components/atoms/Spacer";
import { ImageMetadata, PostData } from "api/posts";
import { Video, ResizeMode } from "expo-av";
import numeral from "numeral";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import IconButton from "@components/atoms/IconButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import useTheme from "hooks/useTheme";
import ImageViewer from "react-native-image-zoom-viewer";
import { decode } from "entities";
import FormatedText from "@components/molecules/FormatedText";
import useVote from "hooks/useVote";
import VideoPlayer from "@components/molecules/VideoPlayer";
import Markdown from "@components/molecules/Markdown";

type Props = {
    post: PostData;
    inView: boolean;
    inFocus: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    disableTap?: boolean;
    compact?: boolean;
};

type ProfileScreenNavigationProp = NavigationProp<RootStackParamList>;

const Post = ({
    post,
    inView,
    inFocus,
    containerStyle = {},
    disableTap = false,
    compact = true,
}: Props) => {
    const video = useRef<Video | null>(null);
    const dimentions = useWindowDimensions();
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const theme = useTheme();
    const vote = useVote(post.name);

    const openImage = (url: string, width: number, height: number) => {
        navigation.navigate("Image", {
            images: [{ url, aspectRatio: width / height }],
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.66}
            disabled={disableTap}
            onPress={() => navigation.navigate("Post", { id: post.name })}
        >
            <ContainerView
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.colors.card,
                        borderColor: theme.colors.border,
                    },
                    containerStyle,
                ]}
            >
                <ContainerView>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <StyledText>{post.subreddit}</StyledText>
                            <Spacer size="smaller" />
                            <StyledText
                                style={{
                                    color: theme.colors.grey,
                                }}
                                size="small"
                            >
                                by u/{post.author} •{" "}
                                {formatDistance(post.created * 1000)} ago
                            </StyledText>
                        </View>
                        <Spacer size="full" />
                        <IconButton
                            onPress={() => Linking.openURL(post.permalink)}
                        >
                            <Ionicons
                                name="open-outline"
                                size={16}
                                color={theme.colors.text}
                            />
                        </IconButton>
                    </View>
                    <Spacer size="medium" />
                    {/* TODO: title should be decoded from entities */}
                    <StyledText size="large" weight="medium">
                        {post.title}
                    </StyledText>
                </ContainerView>
                {post.images && (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                navigation.navigate("Image", {
                                    images: (
                                        post.images as ImageMetadata[]
                                    ).map(({ url, width, height }) => ({
                                        url,
                                        aspectRatio: width / height,
                                    })),
                                })
                            }
                        >
                            <Image
                                source={{
                                    uri: post.images[0].url,
                                }}
                                style={[
                                    {
                                        aspectRatio:
                                            post.images[0].width /
                                            post.images[0].height,
                                    },
                                    styles.image,
                                ]}
                            />
                        </TouchableOpacity>
                    </>
                )}
                {post.image && (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                openImage(
                                    post.image as string,
                                    post.imageWidth as number,
                                    post.imageHeight as number
                                )
                            }
                        >
                            <Image
                                source={{
                                    uri: post.image,
                                }}
                                style={[
                                    {
                                        aspectRatio:
                                            (post.imageWidth as number) /
                                            (post.imageHeight as number),
                                    },
                                    styles.image,
                                ]}
                            />
                        </TouchableOpacity>
                    </>
                )}
                {post.redditVideo && (
                    <VideoPlayer videoData={post.redditVideo} />
                )}
                {post.text &&
                    (compact ? (
                        <ContainerView style={{ paddingVertical: 0 }}>
                            <StyledText
                                numberOfLines={3}
                                size="small"
                                style={{ color: theme.colors.grey }}
                            >
                                {post.text}
                            </StyledText>
                        </ContainerView>
                    ) : (
                        <ContainerView style={{ paddingVertical: 0 }}>
                            <Markdown>{post.text}</Markdown>
                        </ContainerView>
                    ))}
                <View style={styles.footer}>
                    <ContainerView>
                        <StyledText
                            weight="medium"
                            size="small"
                            style={{ color: theme.colors.grey }}
                        >
                            <Text>
                                {numeral(post.votes).format("0.a")} votes
                            </Text>{" "}
                            • {numeral(post.commentsCount).format("0.a")}{" "}
                            comments
                        </StyledText>
                    </ContainerView>
                    <View style={styles.actionsContainer}>
                        <IconButton
                            onPress={() => vote.mutate(!post.voteState ? 1 : 0)}
                        >
                            <AntDesign
                                color={
                                    !post.voteState
                                        ? theme.colors.grey
                                        : theme.colors.primary
                                }
                                name="arrowup"
                                size={16}
                            />
                        </IconButton>
                        <Spacer horizontal size="medium" />
                        <IconButton
                            onPress={() =>
                                vote.mutate(
                                    post.voteState || post.voteState == null
                                        ? -1
                                        : 0
                                )
                            }
                        >
                            <AntDesign
                                color={
                                    post.voteState || post.voteState == null
                                        ? theme.colors.grey
                                        : theme.colors.link
                                }
                                name="arrowdown"
                                size={16}
                            />
                        </IconButton>
                    </View>
                </View>
            </ContainerView>
        </TouchableOpacity>
    );
};

export default memo(Post);

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: lightTheme.borderRadius.medium,
        flexDirection: "column",
        padding: 0,
        overflow: "hidden",
    },
    image: {},
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 16,
    },
    actionsContainer: {
        flexDirection: "row",
    },
});
