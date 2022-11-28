import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native"
import React, { useLayoutEffect, useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline"
import { Ionicons } from "@expo/vector-icons"
import Categories from "../components/Categories"
import FeaturedRow from "../components/FeaturedRow"
import sanityClient from "../sanity"

const HomeScreen = () => {
  const navigation = useNavigation()
  const [featuredCategories, setFeaturedCategories] = useState([])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    return () => {}
  }, [])
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
            ...,
            restaurants[]->{
              ...,
              dishes[]->
            }
          } 
        `
      )
      .then((data) => {
        setFeaturedCategories(data)
      })
  }, [])
  console.log(featuredCategories)
  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-grey-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <Ionicons name="search-outline" size={24} color="black" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <Ionicons name="menu-outline" size={24} color="black" />
      </View>
      {/* Body */}
      <ScrollView>
        {/* Categories */}
        <Categories />
        {/* Featured */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
