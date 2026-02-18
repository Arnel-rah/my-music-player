import { Text, View } from "react-native";
import colors from "./constant/Color";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.turquoise }}>Edit app/index.tsx to edit this screen</Text>
    </View>
  );
}
