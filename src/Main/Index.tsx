import { View, StyleSheet } from "react-native";
import SlideShow from "../SlideShow/Index";
import styles from "./styles";

export default (): JSX.Element => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header} />
        <SlideShow />
      </View>
    </>
  );
};
