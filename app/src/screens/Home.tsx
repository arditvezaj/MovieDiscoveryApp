import { Text, SafeAreaView, FlatList, StyleSheet } from "react-native";

import { ItemProps } from "../types/ItemProps";
import CategoryItem from "../components/organisms/CategoryItem";
import Header from "../components/molecules/Header";
import { categories } from "../constants/categories";

const HomeScreen = () => {
  const renderItem = ({ item }: ItemProps) => {
    return <CategoryItem id={item.id} name={item.name} path={item.path} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Movie Categories" isHomePage />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No movie categories founded.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    marginTop: 35,
    marginLeft: 20,
    fontSize: 17,
  },
});

export default HomeScreen;
