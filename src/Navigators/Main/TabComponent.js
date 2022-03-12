/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react'
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native'
import { Transition, Transitioning } from 'react-native-reanimated'

import { useTheme } from '@/Hooks'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const TabComponent = props => {
  const { label, icon, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const { Fonts, Gutters, Layout, NavigationColors } = useTheme()
  const ref = useRef()
  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={10} />
    </Transition.Sequence>
  )

  return (
    <TouchableOpacity
      onPress={() => {
        ref.current.animateNextTransition()
        onPress()
      }}
      activeOpacity={1}
      style={[Layout.center, { flex: focused ? 1 : 0.6 }]}
    >
      <Transitioning.View ref={ref} transition={transition}>
        <View
          style={[
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.tinyVPadding,
            {
              overflow: 'hidden',
              borderRadius: 100,
              backgroundColor: focused
                ? NavigationColors.barButtonBackground
                : Colors.transparent,
            },
          ]}
        >
          <Image
            source={icon}
            style={[
              {
                width: 19,
                height: 19,
                tintColor: focused
                  ? NavigationColors.primary
                  : NavigationColors.unselectedColor,
              },
            ]}
          />
          <View>
            {focused && (
              <Text
                style={[
                  Gutters.tinyLMargin,
                  Fonts.textSmall,
                  { color: NavigationColors.primary },
                ]}
              >
                {label}
              </Text>
            )}
          </View>
        </View>
      </Transitioning.View>
    </TouchableOpacity>
  )
}

export default TabComponent
