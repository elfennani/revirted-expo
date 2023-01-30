import { useQuery } from "@tanstack/react-query";
import { getMoreComments, readMoreCommentsSelector } from "api/posts";
import { useState } from "react";

export default (parentId: string, postId: string, commentIdsList: string[]) => {
    const [loadMore, setLoadMore] = useState(false);

    const moreComments = useQuery(
        ["comment", parentId],
        () => getMoreComments(postId, commentIdsList),
        {
            enabled: loadMore,
            select: (data) => readMoreCommentsSelector(data, commentIdsList),

            onError: (err) => {
                console.error(err);
                setLoadMore(false);
            },
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

    return {
        active: loadMore,
        loadMoreComments: () => setLoadMore(true),
        moreComments,
    };
};
