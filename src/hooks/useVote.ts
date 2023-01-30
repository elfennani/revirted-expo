import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentData, PostData, votePost } from "api/posts";
import { useState } from "react";

export default (postId: string) => {
    const client = useQueryClient();

    type Vote = -1 | 1 | 0;

    const vote = useMutation(
        ["post", postId],
        async (vote: Vote) => votePost(postId, vote),
        {
            onMutate: (vote) => {
                client.setQueryData<{ comment: any[]; post: any }>(
                    ["post", postId],
                    (prev) => {
                        console.log(prev);
                        return prev
                            ? {
                                  ...prev,
                                  post: {
                                      ...prev.post,
                                      data: {
                                          ...prev.post.data,
                                          likes: reverseVote(vote),
                                      },
                                  },
                              }
                            : undefined;
                    }
                );
                client.setQueryData<{ pages: any[][] }>(["posts"], (prev) =>
                    prev
                        ? {
                              ...prev,
                              pages: prev.pages.map((page) =>
                                  page.map((post) =>
                                      post.data.name == postId
                                          ? {
                                                ...post,
                                                data: {
                                                    ...post.data,
                                                    likes: reverseVote(vote),
                                                },
                                            }
                                          : post
                                  )
                              ),
                          }
                        : undefined
                );
            },
            onSuccess() {
                return Promise.all([
                    client.invalidateQueries(["post", postId]),
                ]);
            },
            onError(error, variables, context) {
                return Promise.all([
                    client.invalidateQueries(["post", postId]),
                    client.invalidateQueries(["posts"]),
                ]);
            },
        }
    );

    const reverseVote = (newVote: Vote): boolean | null => {
        if (newVote == -1) return false;
        return newVote ? true : null;
    };

    return vote;
};
