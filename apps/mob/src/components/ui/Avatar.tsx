import { Image, View, Text } from "react-native";
import React from "react";
import color from "../../assets/colors";

const Avatar = ({ size = 65, label }: { size?: number; label?: string }) => {
  return (
    <>
      {label ? (
        <View
          style={{
            width: size,
            height: size,
          }}
          className={`rounded-full flex-row items-center justify-center bg-primaryLight border-2 border-white`}
        >
          <Text className="uppercase font-bold ">{label.slice(0, 2)}</Text>
        </View>
      ) : (
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/55552872?v=4",
          }}
          className={`rounded-full mt-4`}
          style={{
            borderWidth: 2,
            borderColor: color.background,
            width: size,
            height: size,
          }}
        />
      )}
    </>
  );
};

export default Avatar;
