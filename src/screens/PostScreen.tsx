import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import React, { Profiler, useMemo } from "react";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost, postSelector } from "api/posts";
import Post from "@components/organisms/Post";
import StyledText from "@components/atoms/StyledText";
import Spacer from "@components/atoms/Spacer";
import SectionTitle from "@components/molecules/SectionTitle";
import Comment from "@components/organisms/Comment";
import { Interaction } from "scheduler/tracing";

type Props = NativeStackScreenProps<RootStackParamList, "Post">;

const PostScreen = ({
    route: {
        params: { id },
    },
}: Props) => {
    const client = useQueryClient();
    const { width } = useWindowDimensions();

    const getPlaceholderData = () => {
        const postsCache = client.getQueryData<any>(["posts"]);

        if (!postsCache) return undefined;

        const post = postsCache.pages
            .flat()
            .filter((post: any) => post.data.name == id);

        return {
            post: post[0],
            comments: [],
        };
    };

    const { data, isLoading, isError } = useQuery(
        ["post", id],
        () => getPost(id),
        {
            select: (data) => postSelector(data),
            placeholderData: getPlaceholderData(),
        }
    );

    const dataMemo = useMemo(() => data?.comments, [data]);

    return (
        <FlatList
            removeClippedSubviews
            ListHeaderComponent={
                <>
                    {data ? (
                        <Post
                            disableTap
                            containerStyle={styles.container}
                            post={data.post}
                            inFocus={true}
                            inView={true}
                            compact={false}
                        />
                    ) : (
                        <StyledText>Loading...</StyledText>
                    )}
                    <Spacer size="medium" />
                    <SectionTitle title="Comments" />
                </>
            }
            data={dataMemo}
            keyExtractor={(item) => item.name}
            renderItem={({ item: comment }) => (
                <Comment comment={comment} postId={data?.post.name as string} />
            )}
            ItemSeparatorComponent={() => <Spacer size="medium" />}
        />
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 1,
    },
});
