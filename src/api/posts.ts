import { getItemAsync } from "expo-secure-store";
import * as entities from "entities";

export interface ImageMetadata {
    url: string;
    title: string | null;
    id: string;
    width: number;
    height: number;
}

export interface CommentData {
    name: string;
    content: string;
    replies?: CommentData[];
    more?: string[];
    moreId?: string;
    depth: number;
    author: string;
    json?: any;
    text: string;
    created: number;
    isOP: boolean;
    postId: string;
}

export interface PostData {
    title: string;
    votes: number;
    name: string;
    commentsCount: number;
    subreddit: string;
    author: string;
    permalink: string;
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    images?: ImageMetadata[];
    created: number;
    devJson?: Object;
    nsfw: boolean;
    voteState: boolean | null;
    text?: string;
    text_html?: string;
    link?: string;
    // poll?: PollData;
    saved: boolean;
    youtubeIframe?: {
        src: string;
        width: number;
        height: number;
        allow: string;
        title: string;
    };
    redditVideo?: RedditVideoData;
    crosspost?: PostData;
}

export interface RedditVideoData {
    fallbackUrl: string;
    width: number;
    height: number;
    hlsUrl: string;
    duration: number;
    isGif: boolean;
    thumbnail?: ImageMetadata;
}

export const getPosts = async (after?: string) => {
    const token = await getItemAsync("accessKey");

    const res = await fetch(
        `https://oauth.reddit.com/best?${after ? `after=${after}` : ""}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await res.json();
    return data.data.children;
};

export const getPost = async (id: string) => {
    const token = await getItemAsync("accessKey");

    const res = await fetch(
        `https://oauth.reddit.com/comments/${id.replace("t3_", "")}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await res.json();

    return {
        post: data[0].data.children[0],
        comments: data[1].data.children,
    };
};

export const getMoreComments = async (
    postId: string,
    commentIdsList: string[]
) => {
    const token = await getItemAsync("accessKey");

    const res = await fetch(
        `https://oauth.reddit.com/api/morechildren?api_type=json&link_id=${postId}&children=${commentIdsList.join(
            ","
        )}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await res.json();

    return data;
};

export const readMoreCommentsSelector = (
    data: any,
    commentIdsList: string[]
) => {
    return parseCommentReplies(data, commentIdsList);
};

export const postSelector = (data: { post: any; comments: any[] }) => {
    return {
        post: postsSelector([data.post])[0],
        comments: parseComment(data.comments),
    };
};

export const postsSelector = (data: any[]): PostData[] => {
    return data.map(({ data: post }: any): PostData => {
        let post_maped: PostData = {
            title: post.title,
            votes: post.score,
            name: post.name,
            commentsCount: post.num_comments,
            subreddit: post.subreddit_name_prefixed,
            author: post.author,
            permalink: "https://www.reddit.com" + post.permalink,
            created: post.created,
            nsfw: post.over_18,
            voteState: post.likes,
            text: post.selftext,
            text_html: post.selftext_html,
            saved: post.saved,
        };

        if (post.url_overridden_by_dest) {
            post_maped.link = post.url_overridden_by_dest;
        }

        if (post.secure_media?.reddit_video) {
            const redditVideo = post.secure_media.reddit_video;
            post_maped.redditVideo = {
                fallbackUrl: entities.decode(redditVideo.fallback_url),
                height: redditVideo.height,
                width: redditVideo.width,
                duration: redditVideo.duration,
                hlsUrl: entities.decode(redditVideo.hls_url),
                isGif: redditVideo.is_gif,
            };

            if (post.preview?.images[0].source) {
                const source = post.preview.images[0].source;
                post_maped.redditVideo.thumbnail = {
                    width: source.width,
                    height: source.height,
                    id: post_maped.title,
                    title: post_maped.title,
                    url: source.url,
                };
            }
        }

        if (post.post_hint == "image") {
            post_maped.image = entities.decode(
                post.preview.images[0].source.url
            );
            post_maped.imageWidth = post.preview.images[0].source.width;
            post_maped.imageHeight = post.preview.images[0].source.height;
        } else if (post.media_metadata) {
            let notAnImage = false;
            try {
                const images: (ImageMetadata | undefined)[] = Object.keys(
                    post.media_metadata
                ).map((key) => {
                    if (notAnImage) return;
                    if (post.media_metadata[key].e != "Image") {
                        notAnImage = true;
                        return;
                    }
                    return <ImageMetadata>{
                        id: key,
                        url: entities.decode(post.media_metadata[key].s.u),
                        width: post.media_metadata[key].s.x,
                        height: post.media_metadata[key].s.y,
                        title:
                            post.gallery_data && post.gallery_data.items
                                ? post.gallery_data.items.filter(
                                      (item: any) => item.media_id == key
                                  )[0].caption || null
                                : null,
                    };
                });

                post_maped.images = images.filter(
                    (image) => image != undefined
                ) as ImageMetadata[];
            } catch (error) {
                console.error("Failed Loading Post: ", post);
            }

            if (notAnImage) {
                post_maped.images = undefined;
            }
        }

        return post_maped;
    });
};

const parseComment = (data: any, isReadMore = false): CommentData[] => {
    return data.map((comment: any): CommentData | string => {
        const data = isReadMore ? comment : comment.data;

        let replies: CommentData[] | undefined;
        if (!isReadMore) {
            replies =
                data.replies && comment.kind != "more"
                    ? parseComment(data.replies.data.children)
                    : undefined;
        } else {
            replies =
                data.replies && data.replies.length != 0
                    ? parseComment(data.replies, true)
                    : undefined;
        }

        return {
            name: data.name,
            content: data.body_html,
            depth: data.depth,
            replies,
            more: data.children ? data.children : undefined,
            author: data.author,
            // json: data,
            text: data.body,
            created: data.created,
            isOP: data.is_submitter,
            postId: data.link_id,
        };
    }) as CommentData[];
};

export const parseCommentReplies = (
    data: any,
    topLevelCommentsIds: string[]
): CommentData[] => {
    if (!topLevelCommentsIds) return [];
    const things = data.json.data.things as any[];

    const topLevelComments = things.filter((comment: any) =>
        topLevelCommentsIds.includes(comment.data.id)
    );

    const comments = topLevelComments.map((comment) => {
        return {
            ...comment.data,
            replies: getReplies(comment.data.id, things),
        };
    });

    return parseComment(comments, true);
};

const getReplies = (parent: string, allChildren: any[]): any[] => {
    const replies = [];

    for (let i = 0; i < allChildren.length; i++) {
        const comment = allChildren[i].data;
        if (comment.parent_id == `t1_${parent}`)
            replies.push({
                ...comment,
                replies: getReplies(comment.id, allChildren),
            });
    }

    return replies;
};

export const votePost = async (id: string, voteState: -1 | 1 | 0) => {
    console.log("voting");
    const token = await getItemAsync("accessKey");

    const res = await fetch("https://oauth.reddit.com/api/vote", {
        method: "post",
        body: `id=${id}&dir=${voteState}&rank=1`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const data = await res.json();
    console.log(res.status, data);
};
