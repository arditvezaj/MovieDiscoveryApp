import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../types/RootStackTypes";

type CategoryItemProps = {
  id: string;
  name: string;
  path: string;
};

const CategoryItem = ({ id, name, path }: CategoryItemProps) => {
  const navigation: RootStackNavigationProp = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Category", { id, name, path })}
    >
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  name: {
    color: "black",
    fontSize: 17,
    fontWeight: "700",
  },
});

export default CategoryItem;
