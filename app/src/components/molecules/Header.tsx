import { View, Text, StyleSheet } from "react-native";

import BackButton from "../atoms/BackButton";

type Props = {
  title: string;
  isHomePage?: boolean;
};

const Header = ({ title, isHomePage = false }: Props) => {
  return (
    <View style={styles.container}>
      {!isHomePage ? (
        <BackButton />
      ) : (
        <View style={{ width: 35, height: 35 }} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 35, height: 35 }} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  button: {
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 5,
    gap: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "grey",
  },
});
