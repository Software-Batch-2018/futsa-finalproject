import { ScrollView, View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import color from "../../assets/colors";
import OptionsCard from "../../components/OptionCard";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Avatar from "../../components/ui/Avatar";
import { useLogout } from "core/src/db/hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { mutate: logout } = useLogout();
  const { user } = useCurrentUser();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Profile",
      headerTitleStyle: {
        fontSize: 20,
        color: "white",
      },
      headerLeft: () => {
        return (
          <MaterialCommunityIcons
            name="account-circle"
            size={24}
            color="white"
            style={{ marginLeft: 12 }}
          />
        );
      },
      headerStyle: {
        backgroundColor: color.primary,
      },
    });
  }, []);
  return (
    <View className="h-[100%]">
      <View className="w-full bg-primary flex-col items-center justify-center py-3">
        <Avatar label={user.fullname.slice(0, 2)} />
        <Text className="text-white font-bold text-xl mt-2">
          {user?.fullname}
        </Text>
        <Text className="text-white  text-sm">{user?.phonenumber}</Text>
        <Text className="text-white text-sm">{user?.email}</Text>
      </View>
      <ScrollView className="px-4 h-[77%]">
        {/* <OptionsCard label="Saved">
          <Ionicons name="heart-circle" size={36} color={color.primary} />
        </OptionsCard> */}
        <OptionsCard
          label="My team"
          onPress={() =>
            // @ts-ignore
            navigation.navigate("My-Teams")
          }
        >
          <Ionicons name="person-sharp" size={36} color={color.primary} />
        </OptionsCard>
        <OptionsCard
          label="My Bookings"
          onPress={() =>
            // @ts-ignore
            navigation.navigate("My-Bookings")
          }
        >
          <Ionicons name="book" size={36} color={color.primary} />
        </OptionsCard>

        <OptionsCard
          label="My Requests"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("My-requests");
          }}
        >
          <MaterialCommunityIcons
            name="post-outline"
            size={36}
            color={color.primary}
          />
        </OptionsCard>
        <OptionsCard
          label="My Events"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("My-events");
          }}
        >
          <MaterialIcons name="event" size={36} color={color.primary} />
        </OptionsCard>
        <OptionsCard
          label="My Payments"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("My-payments");
          }}
        >
          <MaterialIcons name="receipt" size={36} color={color.primary} />
        </OptionsCard>

        <OptionsCard
          label="Logout"
          onPress={() => {
            logout();
          }}
        >
          <MaterialIcons name="logout" size={36} color={color.primary} />
        </OptionsCard>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
