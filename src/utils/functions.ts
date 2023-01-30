import { formatDistanceToNowStrict } from "date-fns";

export const formatDistance = (numberInMs: number) =>
    formatDistanceToNowStrict(numberInMs, {
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
export const formatDuration = (durationInSeconds: number) => {
    return new Date(durationInSeconds * 1000).toISOString().slice(14, 19);
};
