import ContainerView from "@components/atoms/ContainerView";
import Spacer from "@components/atoms/Spacer";
import StyledButton from "@components/atoms/StyledButton";
import StyledText from "@components/atoms/StyledText";
import { lightTheme } from "@utils/theme";
import { CommentData } from "api/posts";
import { formatDistance } from "@utils/functions";
import React, { useState } from "react";
import {
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";
import useTheme from "hooks/useTheme";
import useLoadMore from "hooks/useLoadMore";
import FormatedText from "@components/molecules/FormatedText";
import Markdown from "@components/molecules/Markdown";
import { decode } from "entities";
import { marked } from "marked";

type Props = {
    comment: CommentData;
    postId: string;
    asReply?: boolean;
};

const Comment: React.FC<Props> = ({
    comment,
    postId,
    asReply = false,
}: Props) => {
    const theme = useTheme();
    const [collapsed, setCollapsed] = useState(false);
    const { active, loadMoreComments, moreComments } = useLoadMore(
        comment.name,
        postId,
        comment.more as string[]
    );

    const containerStyle: StyleProp<ViewStyle> =
        comment.depth > 0
            ? [
                  !asReply ? styles.reply : { padding: 0 },
                  { borderColor: theme.colors.border },
              ]
            : [
                  styles.comment,
                  {
                      backgroundColor: theme.colors.card,
                      borderColor: theme.colors.border,
                  },
              ];

    if (comment.more) {
        if (active) {
            if (comment.depth == 0 && moreComments.data) {
                return (
                    <>
                        {moreComments.data.map((c) => (
                            <>
                                <Comment
                                    comment={c}
                                    postId={postId}
                                    key={c.name}
                                />
                                <Spacer size="medium" />
                            </>
                        ))}
                    </>
                );
            }
            return (
                <ContainerView style={containerStyle}>
                    {moreComments.data ? (
                        moreComments.data.map((c) => (
                            <Comment
                                comment={c}
                                postId={postId}
                                asReply
                                key={c.name}
                            />
                        ))
                    ) : (
                        <View
                            style={{
                                alignItems: "flex-start",
                                paddingVertical: 8,
                            }}
                        >
                            <StyledButton
                                secondary
                                title="Loading..."
                                disabled={true}
                            />
                        </View>
                    )}
                </ContainerView>
            );
        } else
            return (
                <ContainerView
                    style={[
                        containerStyle,
                        { alignItems: "flex-start", paddingVertical: 8 },
                    ]}
                >
                    <StyledButton
                        secondary
                        title="Load more"
                        onPress={() => loadMoreComments()}
                        style={{ backgroundColor: "red" }}
                    />
                </ContainerView>
            );
    }

    const onPress = () => {
        setCollapsed((collapsed) => !collapsed);
        // console.log(marked.lexer("^hello"));
    };

    return (
        <TouchableWithoutFeedback
            // onPress={() => setCollapsed(false)}
            onPress={() => onPress()}
            delayLongPress={750}
        >
            <ContainerView style={containerStyle}>
                {collapsed ? (
                    <StyledText
                        numberOfLines={1}
                        size="small"
                        style={{ color: theme.colors.grey }}
                    >
                        u/{comment.author} •{" "}
                        {formatDistance(comment.created * 1000)} •{" "}
                        {comment.text}
                    </StyledText>
                ) : (
                    <>
                        <StyledText
                            style={[styles.info, { color: theme.colors.grey }]}
                        >
                            u/{comment.author} •{" "}
                            {formatDistance(comment.created * 1000)} ago
                        </StyledText>
                        <Spacer />
                        <Markdown>{comment.text}</Markdown>
                        <Spacer size="medium" />

                        {comment.replies && comment.depth < 8 && (
                            <>
                                <Spacer />
                                {comment.replies.map((c) => (
                                    <Comment
                                        key={c.name}
                                        comment={c}
                                        postId={comment.postId}
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </ContainerView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    comment: {
        backgroundColor: "white",
        borderColor: lightTheme.colors.border,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingBottom: 12,
    },
    reply: {
        borderLeftWidth: 1,
        borderColor: lightTheme.colors.border,
        paddingVertical: 0,
        paddingRight: 0,
    },
    info: {
        fontSize: lightTheme.fontSizes.small,
        color: lightTheme.colors.grey,
    },
});

export default Comment;
