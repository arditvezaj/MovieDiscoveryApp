import {
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../api/axios";
import {
  RootStackRouteProp,
  RootStackNavigationProp,
} from "../types/RootStackTypes";

import Header from "../components/molecules/Header";

type MovieDetailsScreenProps = {
  navigation: RootStackNavigationProp;
  route: RootStackRouteProp;
};

type GenreProps = {
  id: string;
  name: string;
};

const MovieDetails = ({ navigation, route }: MovieDetailsScreenProps) => {
  const { isPending, error, data, isFetching, refetch, isRefetching } =
    useQuery({
      queryKey: ["movieDetails", route.params.id],
      queryFn: async () => {
        const { data } = await axiosInstance.get(`${route.params.id}`);

        return data;
      },
    });

  if (isPending) return <Text style={styles.issueText}>Loading...</Text>;

  if (error)
    return (
      <Text style={styles.issueText}>
        An error has occurred: {error.message}
      </Text>
    );

  const fields = [
    { label: "Title", value: data.title },
    { label: "Overview", value: data.overview },
    { label: "Release Date", value: data.release_date },
    { label: "Link", value: data.homepage },
    { label: "Rating", value: data.vote_average?.toFixed(1) },
    {
      label: "Genres",
      value: data.genres?.map((genre: GenreProps) => genre.name).join(", "),
    },
    { label: "Duration", value: data.runtime + " min" },
    { label: "Country Origin", value: data.origin_country },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title={route.params.name || "Movie Details"} />
      <ScrollView
        style={styles.innerContainer}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {fields.map((field) => (
          <View key={field.label} style={styles.field}>
            <Text style={styles.label}>{field.label}:</Text>
            {field.value?.includes("http") ? (
              <Text
                style={[styles.value, { color: "#0047AB" }]}
                onPress={() => Linking.openURL(field.value)}
              >
                {field.value}
              </Text>
            ) : (
              <Text style={styles.value}>{field.value}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  field: {
    marginTop: 20,
    gap: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
  },
  issueText: {
    marginTop: 100,
  },
});

export default MovieDetails;
