import { getItemAsync } from "expo-secure-store";
import * as entities from "entities";
import { formatDistanceToNowStrict } from "date-fns";

export const getUser = async () => {
    const token = await getItemAsync("accessKey");

    const res = await fetch("https://oauth.reddit.com/api/v1/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    return data;
};

interface User {
    name: string;
    fullName: string;
    icon: string;
    createdSince: string;
    karma: number;
}

export const userSelector = (data: any): User => {
    const { subreddit, icon_img, created, total_karma } = data;

    let distance = formatDistanceToNowStrict(created * 1000, {
        addSuffix: false,
        locale: {
            formatDistance(...args) {
                const [unit, count] = args;
                if (unit == "xYears") return `${count}y`;
                if (unit == "xMonths") return `${count}mo`;
                if (unit == "xDays") return `${count}d`;
                if (unit == "xHours") return `${count}h`;
                if (unit == "xMinutes") return `${count}min`;

                return `${count}s`;
            },
        },
    });

    return {
        name: data.name,
        fullName: subreddit.title,
        icon: entities.decode(icon_img),
        createdSince: distance,
        karma: total_karma,
    };
};
