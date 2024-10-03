import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: { id: string; name?: string; path: string };
  Category: { id: string; name?: string; path: string };
  MovieDetails: { id: string; name?: string; path: string };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type RootStackRouteProp = RouteProp<RootStackParamList>;
