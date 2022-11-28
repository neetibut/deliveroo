import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import React, { useLayoutEffect, useEffect, useState } from "react"
import { useRoute, useNavigation } from "@react-navigation/native"
import { urlFor } from "../sanity"
import { Ionicons } from "@expo/vector-icons"
import DishRow from "../components/DishRow"

const RestaurantScreen = () => {
  const navigation = useNavigation()
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <ScrollView>
      <View className="relative">
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <Ionicons name="arrow-back" size={22} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
              <Ionicons name="star" size={22} color="#00CCBB" />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> - {genre}
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <Ionicons name="location-outline" size={22} color="#00CCBB" />
              <Text className="text-xs text-gray-500">Nearby • {address}</Text>
            </View>
          </View>
          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y">
          <Ionicons name="help-circle-outline" size={22} color="black" />
          <Text className="pl-2 flex-1 text-md font-bold">
            Have a food allergy?
          </Text>
          <Ionicons name="chevron-forward" size={22} color="#00CCBB" />
        </TouchableOpacity>
        <View>
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* Dish rows */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default RestaurantScreen