import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IRequest, REQUEST_STATUS, formatBookingDate, timeAgo } from "core";
import TextLabel from "../../components/ui/TextLabel";

export const RequestCard = ({ request }: { request: IRequest }) => {
  const {
    title,
    description,
    createdAt,
    budget,
    id,
    status,
    location,
    deadline,
    createdBy,
  } = request;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate("Request-Detail", { requestId: id });
      }}
    >
      <View
        className={`py-3 border-[1px]  border-gray-300 mx-2 my-2 rounded-sm ${
          status === REQUEST_STATUS.ACCEPTED
            ? "bg-primary/10"
            : "bg-gray-200/50"
        }`}
      >
        <View className="mx-5">
          <Text className="font-bold text-md">{title}</Text>

          <View className="flex-row items-center mt-2 mx-0">
            <TextLabel label="Budget" value={`Rs. ${budget}`} />
            <TextLabel label="Location" value={location} />
            <TextLabel
              label="Deadline"
              value={formatBookingDate(deadline).split(",")[0]}
            />
          </View>
          <Text className=" text-gray-800">
            {description.replace(/\s+/g, " ").slice(0, 98)} ...
          </Text>

          <View className="flex-row justify-between items-center mt-1">
            <Text className=" text-gray-400 text-left">
              {createdBy?.name} : {timeAgo(createdAt)}
            </Text>
            <Text className=" mt-1 text-left font-bold text-primaryLight">
              View more
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
