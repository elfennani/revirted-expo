import {
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    ViewProps,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

interface Props extends ViewProps {
    disabled?: boolean;
    delay?: number;
    onChange?: (change: boolean) => void;
}

const InView = ({ disabled, delay, onChange, ...props }: Props) => {
    const myview = useRef<View>(null);
    const [rectTop, setRectTop] = useState(0);
    const [rectBottom, setRectBottom] = useState(0);
    const [rectWidth, setRectWidth] = useState(0);
    const window = useWindowDimensions();
    const interval = useRef<NodeJS.Timer>();
    const lastValue = useRef<boolean>();

    useEffect(() => {
        if (!disabled) startWatching();

        return () => stopWatching();
    }, []);

    const startWatching = () => {
        if (interval.current) {
            return;
        }
        interval.current = setInterval(() => {
            if (!myview.current) {
                return;
            }

            myview.current.measure((x, y, width, height, pageX, pageY) => {
                setRectTop(pageY);
                setRectBottom(pageY + height);
                setRectWidth(pageX + width);
            });

            isInViewPort();
        }, delay || 100);
    };
    const stopWatching = () => {
        clearInterval(interval.current);
        interval.current = undefined;
    };

    const isInViewPort = () => {
        const isVisible =
            rectBottom != 0 &&
            rectTop >= 0 &&
            rectBottom <= window.height &&
            rectWidth > 0 &&
            rectWidth <= window.width;

        if (lastValue.current !== isVisible) {
            lastValue.current = isVisible;
            onChange && onChange(isVisible);
        }
    };

    return (
        <View collapsable={false} ref={myview} {...props}>
            {props.children}
        </View>
    );
};

export default InView;

const styles = StyleSheet.create({});
