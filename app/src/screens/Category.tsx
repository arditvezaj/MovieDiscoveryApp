import { useMemo, useState, useCallback, useEffect } from "react";
import {
  Text,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../hooks/useDebounce";
import { axiosInstance } from "../api/axios";
import { RootStackRouteProp } from "../types/RootStackTypes";
import { RootState } from "../redux/store";
import {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from "../redux/modules/movies/slice";

import Header from "../components/molecules/Header";
import MovieItem from "../components/organisms/MovieItem";
import SearchInput from "../components/molecules/SearchInput";

type CategoryScreenProps = {
  route: RootStackRouteProp;
};

type CategoryType = {
  id: string;
  title: string;
  path: string;
};

type ItemProps = {
  item: CategoryType;
};

const CategoryScreen = ({ route }: CategoryScreenProps) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  const { refetch, isRefetching } = useQuery({
    queryKey: ["movies", route.params.path],
    queryFn: async () => {
      dispatch(fetchMoviesStart());
      try {
        const { data } = await axiosInstance.get(route.params.path);
        dispatch(fetchMoviesSuccess(data.results));
        return data.results;
      } catch (error: any) {
        dispatch(fetchMoviesFailure(error.message));
        throw error;
      }
    },
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    refetch();
  }, []);

  const filteredData = useMemo(() => {
    return movies?.filter((item: CategoryType) =>
      item.title.toLowerCase().includes(debounceSearch.toLowerCase())
    );
  }, [debounceSearch, movies]);

  const renderItem = useCallback(
    ({ item }: ItemProps) => (
      <MovieItem id={item.id} name={item.title} path={item.title} />
    ),
    []
  );

  if (loading) return <Text style={styles.issueText}>Loading...</Text>;
  if (error)
    return <Text style={styles.issueText}>An error has occurred: {error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={route.params.name || "Category"} />
      <SearchInput
        text={search}
        setText={setSearch}
        placeholder="Search movies..."
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No movies found.</Text>
        }
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyText: {
    marginTop: 35,
    marginLeft: 20,
    fontSize: 17,
  },
  issueText: {
    marginTop: 100,
  },
});

export default CategoryScreen;
