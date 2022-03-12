import React from 'react'
import { Image, StyleSheet, Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@/Hooks'
import {
  HomeContainer,
  TrendContainer,
  FavoriteContainer,
  NotificationContainer,
  SwapContainer,
} from '@/Containers'

import TabComponent from './TabComponent'
import HeaderRightButton from '../Component/HeaderRightButtons'
import { navigate } from '../utils'

const Tab = createBottomTabNavigator()

const MainNavigator = () => {
  const { Images, Colors, Gutters } = useTheme()

  const navItems = [
    {
      image: Images.search,
      action: () => navigate('CoinSearch'),
    },
    {
      image: Images.scanner,
    },
    {
      image: Images.bell,
    },
  ]

  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: Colors.white,
        headerTitle: '',
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 0,
          paddingHorizontal: 6,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        },
        headerLeft: () => (
          <Image
            style={[Gutters.smallLMargin, styles.leftItem]}
            source={Images.die}
          />
        ),
        headerRight: () => <HeaderRightButton items={navItems} />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarButton: props => (
            <TabComponent label="Home" icon={Images.home} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Trend"
        component={TrendContainer}
        options={{
          tabBarButton: props => (
            <TabComponent label="Top" icon={Images.die} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavoriteContainer}
        options={{
          tabBarButton: props => (
            <TabComponent label="Favourite" icon={Images.favorite} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationContainer}
        options={{
          tabBarButton: props => (
            <TabComponent label="Alert" icon={Images.bell} {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Swap"
        component={SwapContainer}
        options={{
          tabBarButton: props => (
            <TabComponent label="Swap" icon={Images.exchange} {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  leftItem: {
    width: 26,
    height: 26,
  },
})

export default MainNavigator
