import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'

import { goBack } from '../utils'
import { useTheme } from '@/Hooks'
import OpenSwapContainer from '@/Containers/OpenSwap'

const Stack = createStackNavigator()

const SwapStack = () => {
  const { Colors, Gutters, Images } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: Colors.white,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Image
              style={[Gutters.smallLMargin, styles.leftItem]}
              source={Images.back}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="OpenSwapScreen"
        component={OpenSwapContainer}
        options={{
          gestureEnabled: true,
          // headerShown: false,
          presentation: 'modal',
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
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

export default SwapStack
