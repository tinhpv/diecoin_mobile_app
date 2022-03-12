import React from 'react'
import { StatusBar, LogBox } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'

import { navigationRef } from './utils'
import MainNavigator from './Main'
import StartUp from './Splash'
import SearchStack from './Search'
import SwapStack from './Swap'

const Stack = createStackNavigator()

const ApplicationNavigator = () => {
  LogBox.ignoreAllLogs()
  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef}>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartUp" component={StartUp} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="CoinSearch" component={SearchStack} />
        <Stack.Screen name="OpenSwap" component={SwapStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ApplicationNavigator
