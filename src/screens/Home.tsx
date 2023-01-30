import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeTemplate from "@components/templates/HomeTemplate";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: Props) => {
    return <HomeTemplate />;
};

export default Home;
