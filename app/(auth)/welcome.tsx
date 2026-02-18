import { View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";

export default function Welcome() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cyan-400">

      {/* Image hero + cercles décoratifs */}
      <View className="flex-1 items-center justify-center relative">
        {/* Cercles */}
        <View className="absolute top-8 left-6 w-20 h-20 rounded-full bg-cyan-600 opacity-60" />
        <View className="absolute top-4 right-8 w-14 h-14 rounded-full bg-cyan-600 opacity-60" />
        <View className="absolute top-32 right-4 w-10 h-10 rounded-full bg-cyan-600 opacity-60" />

        {/* Image fille */}
        <Image
          source={require("@/assets/images/logo.png")}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Bottom card */}
      <View className="bg-black rounded-t-3xl px-8 pt-10 pb-10 items-center">

        {/* Texte */}
        <ThemedText variant="body" className="text-white text-center text-xl font-semibold leading-8 mb-6">
          From the{" "}
          <ThemedText variant="body" className="text-cyan-400">latest</ThemedText>
          {" "}to the{" "}
          <ThemedText variant="body" className="text-cyan-400">greatest</ThemedText>
          {" "}hits, play your favorite tracks on{" "}
          <ThemedText variant="body" className="text-cyan-400">musium</ThemedText>
          {" "}now!
        </ThemedText>

        {/* Indicateur pagination */}
        <View className="flex-row gap-2 mb-8">
          <View className="w-8 h-1.5 rounded-full bg-cyan-400" />
          <View className="w-4 h-1.5 rounded-full bg-gray-600" />
        </View>

        {/* Bouton */}
        <TouchableOpacity
          onPress={() => router.push("/(auth)/signin")}
          className="w-full bg-cyan-400 rounded-full py-4 items-center"
        >
          <ThemedText variant="body" className="text-black font-bold text-lg">
            Get Started
          </ThemedText>
        </TouchableOpacity>

      </View>
    </View>
  );
}