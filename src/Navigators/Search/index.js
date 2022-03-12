import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, StyleSheet } from 'react-native'
import {
  SearchContainer,
  DetailContainer,
  PoolListContainer,
} from '@/Containers'

import { useTheme } from '@/Hooks'
import { goBack, navigateAndSimpleReset } from '../utils'
import HeaderRightButton from '../Component/HeaderRightButtons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import OpenSwapContainer from '@/Containers/OpenSwap'

const Stack = createStackNavigator()

const SearchStack = () => {
  const { Images, Colors, Gutters } = useTheme()

  const navItems = [
    {
      image: Images.search,
      action: () => navigateAndSimpleReset('CoinSearch'),
    },
    {
      image: Images.scanner,
    },
    {
      image: Images.bell,
    },
  ]

  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: Colors.white,
        headerTitle: '',
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 0,
          paddingHorizontal: 6,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Image
              style={[Gutters.smallLMargin, styles.leftItem]}
              source={Images.back}
            />
          </TouchableOpacity>
        ),
        headerRight: () => <HeaderRightButton items={navItems} />,
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Pool"
        component={PoolListContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Detail" component={DetailContainer} />
      <Stack.Screen
        name="OpenSwap"
        component={OpenSwapContainer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  leftItem: {
    width: 23,
    height: 23,
    tintColor: 'white',
  },
})

export default SearchStack
