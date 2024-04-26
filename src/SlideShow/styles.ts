import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { width: "100%" },
    item:{
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    dots:{
      alignSelf: "center",
      height:35,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
    },
    dot:{
      height:12,
      borderRadius:6,
      backgroundColor:"#05f",      
    }
  });