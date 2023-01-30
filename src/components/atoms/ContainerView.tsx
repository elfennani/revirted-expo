import { StyleSheet, Text, View, ViewProps } from "react-native";
import React from "react";

type Props = ViewProps;

const ContainerView = (props: Props) => {
    return (
        <View {...props} style={[{ padding: 16 }, props.style]}>
            {props.children}
        </View>
    );
};

export default ContainerView;

const styles = StyleSheet.create({});
