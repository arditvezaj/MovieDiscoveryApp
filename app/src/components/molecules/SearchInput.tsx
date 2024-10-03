import { View, TextInput, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  text: string;
  setText: (text: string) => void;
  placeholder: string;
};

const SearchInput = ({ text, setText, placeholder }: Props) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="#B3B3B3" />
      <TextInput
        value={text}
        onChangeText={(e: string) => setText(e)}
        placeholder={placeholder}
        placeholderTextColor="#808080"
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    borderWidth: 2,
    borderColor: "#E6E8EC",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default SearchInput;
