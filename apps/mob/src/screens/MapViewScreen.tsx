import MapView, { Callout, Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { createRatingStars, useCurrentLocation, useFutsalsStore } from "core";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

const MapViewScreen = () => {
  const { setGeoLocation } = useCurrentLocation();
  const [initialRegion, setInitialRegion] = useState<any>({
    latitude: 28.208218948316958,
    longitude: 84.00158931591984,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [refreshed, setRefreshed] = useState(false);
  const { geoLocation } = useCurrentLocation();

  const handleRefresh = () => {
    // Toggle the refreshed state to trigger a re-render.
    setRefreshed(!refreshed);
    initialLocationSetup();
  };

  const initialLocationSetup = async () => {
    // Get the current location
    setInitialRegion({
      latitude: geoLocation.lat ?? 28.208218948316958,
      longitude: geoLocation.lng ?? 84.00158931591984,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then((res) => {
      if (res.status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Location permission not granted",
          text2: "Please enable location permission to use the app",
        });
      }
      Location.getCurrentPositionAsync({}).then((location) => {
        setGeoLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      });
    });
    initialLocationSetup();
  }, [geoLocation]);

  if (!geoLocation) return <Loading />;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <IconButton
        className="absolute bottom-7 right-[40%] z-10 bg-primary/80 rounded-full h-16 w-16 flex items-center justify-center shadow-md"
        onPress={handleRefresh}
      >
        <Feather name="refresh-ccw" size={24} color={color.white} />
      </IconButton>
      <View className="h-screen w-full relative">
        {/* <View className="absolute top-0 z-10 px-2 mt-4 w-full">
          <SearchInput setSearchText={setSearchText} />
        </View> */}
        <MapView
          className="h-screen w-full"
          initialRegion={initialRegion}
          key={refreshed ? "refreshed" : "not-refreshed"}
        >
          {geoLocation ? (
            <Marker
              coordinate={{
                latitude: geoLocation.lat ?? 28.208218948316958,
                longitude: geoLocation.lng ?? 84.00158931591984,
              }}
              title="Your Location"
              description="You are here"
            />
          ) : null}
          <PinLocations />
        </MapView>
      </View>
    </View>
  );
};

export default MapViewScreen;

import color from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/ui/IconButton";
import Empty from "../components/ui/Empty";
import Loading from "../components/ui/Loading";
import Toast from "react-native-toast-message";

const PinLocations = () => {
  const Logo = require("../assets/images/futsal.png");
  const { futsals } = useFutsalsStore();
  if (!futsals) return <Empty />;
  const navigator = useNavigation();
  return (
    <>
      {futsals.length > 0 &&
        futsals.map((futsal, index) => {
          if (futsal.geoLocation?.lat && futsal.geoLocation?.lng) {
            return (
              <Marker
                key={`futsal_${index}`}
                coordinate={{
                  latitude: +futsal?.geoLocation?.lat,
                  longitude: +futsal?.geoLocation?.lng,
                }}
                title={futsal.futsalName}
                description={createRatingStars(futsal.ratings)}
              >
                <View className="w-40 flex-row justify-center">
                  {/* <Entypo name="location" size={24} color="black" /> */}
                  {/* <Ionicons name="location" size={42} color={color.primary} /> */}
                  <Image source={Logo} className="h-12 w-12" />
                </View>
                <Callout
                  onPress={() => {
                    // @ts-ignore
                    navigator.navigate("Futsal-Detail", {
                      futsalId: futsal.id.toString(),
                    });
                  }}
                >
                  <Text className="font-bold text-gray-700 text-sm">
                    {futsal.futsalName}
                  </Text>
                  <Text className=" text-primary text-xs">
                    Rs. {futsal.price}
                  </Text>
                  <Text className="text-yellow">
                    {createRatingStars(futsal.ratings)}
                  </Text>
                  <Text className="text-xs ">{futsal.phonenumber}</Text>
                </Callout>
              </Marker>
            );
          }
        })}
    </>
  );
};
