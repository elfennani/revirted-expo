import {
    Button,
    FlatList,
    ListRenderItem,
    StyleSheet,
    View,
    ViewToken,
} from "react-native";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import SectionTitle from "@components/molecules/SectionTitle";
import Profile from "@components/organisms/Profile";
import Spacer from "@components/atoms/Spacer";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPosts, PostData, postsSelector } from "api/posts";
import Post from "@components/organisms/Post";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import StyledButton from "@components/atoms/StyledButton";

type Props = {};

type ScreenNavigationProp = NavigationProp<RootStackParamList>;

const HomeTemplate = (props: Props) => {
    const [firstVisibleItem, setFirstVisibleItem] = useState<number | null>(0);
    const [inFocus, setInFocus] = useState(true);
    const navigation = useNavigation<ScreenNavigationProp>();

    useEffect(() => {
        function onFocus() {
            setInFocus(true);
        }
        const onBlur = () => {
            setInFocus(false);
        };
        navigation.addListener("focus", onFocus);
        navigation.addListener("blur", onBlur);

        return () => {
            console.log("removed event listeners");
            navigation.removeListener("focus", onFocus);
            navigation.removeListener("blur", onBlur);
        };
    }, []);

    const { data, isLoading, isError, fetchNextPage, refetch, isRefetching } =
        useInfiniteQuery<any[], unknown, PostData[]>(
            ["posts"],
            (context) => getPosts(context.pageParam),
            {
                select(data) {
                    return {
                        pages: data.pages.map((page) => postsSelector(page)),
                        pageParams: data.pageParams,
                    };
                },
                getNextPageParam: (lastPage, allPages) => {
                    return lastPage[lastPage.length - 1].data.name;
                },
                refetchOnMount: false,
                refetchOnReconnect: false,
                refetchOnWindowFocus: false,
            }
        );

    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig: {
                itemVisiblePercentThreshold: 50,
            },
            onViewableItemsChanged: (info: {
                viewableItems: ViewToken[];
                changed: ViewToken[];
            }) => {
                const videoPosts = info.viewableItems.filter((item) =>
                    Boolean(item.item.redditVideo)
                );

                setFirstVisibleItem(videoPosts[0]?.index || null);
            },
        },
    ]);

    const renderItems: ListRenderItem<PostData> = useCallback(
        ({ item, index }) => (
            <Post
                inFocus={inFocus}
                post={item}
                inView={firstVisibleItem == index}
            />
        ),
        []
    );

    const loadMore = () => fetchNextPage();

    const dataMemo = useMemo(() => data?.pages.flat(), [data]);

    return (
        <View>
            <FlatList
                data={dataMemo}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ padding: 16 }}
                removeClippedSubviews
                maxToRenderPerBatch={4}
                initialNumToRender={4}
                refreshing={isRefetching}
                onRefresh={async () => await refetch()}
                ListHeaderComponent={
                    <>
                        <SectionTitle title="My profile" />
                        <Profile />
                        <Spacer size="large" />
                        <SectionTitle title="Posts" />
                    </>
                }
                renderItem={renderItems}
                ItemSeparatorComponent={() => <Spacer />}
                viewabilityConfigCallbackPairs={
                    viewabilityConfigCallbackPairs.current
                }
                onEndReachedThreshold={5}
                onEndReached={loadMore}
            />
        </View>
    );
};

export default HomeTemplate;

const styles = StyleSheet.create({});
