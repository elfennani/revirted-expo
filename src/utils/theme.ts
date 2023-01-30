export const lightTheme = {
    dark: false,
    colors: {
        primary: "#f97316",
        background: "#F5F7FB",
        text: "#000C1A",
        border: "#e7eaf0",
        grey: "#8798AB",
        darkGrey: "#3F4C5A",
        ripple: "hsla(100, 0%, 0%, 0.1)",
        headerBackground: "white",
        card: "white",
        link: "#3b82f6",
    },
    spacing: {
        smaller: 4,
        small: 8,
        medium: 16,
        large: 24,
    },
    fontSizes: {
        small: 12,
        medium: 14,
        large: 16,
        xlarge: 18,
        xxlarge: 24,
        header: 32,
    },
    borderRadius: {
        small: 4,
        medium: 8,
        large: 12,
    },
    fonts: {
        regular: "Outfit_R",
        medium: "Outfit_M",
        bold: "Outfit_B",
        code: "Fira_Mono",
    },
};

export const darkTheme = {
    ...lightTheme,
    dark: true,
    colors: {
        ...lightTheme.colors,
        headerBackground: "#171717",
        text: "#d1d5db",
        border: "#262626",
        grey: "#4b5563",
        darkGrey: "#d1d5db",
        ripple: "hsla(100, 0%, 100%, 0.1)",
        background: "black",
        card: "#171717",
    },
};
