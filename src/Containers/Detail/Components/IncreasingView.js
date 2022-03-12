import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'

const IncreasingView = ({ percent }) => {
  const { Layout, Gutters, Fonts, Common } = useTheme()
  const isIncreasing = percent > 0

  return (
    <View
      style={[Layout.rowHCenter, Common.roundedContainer, styles.percentage]}
    >
      <Text style={[Fonts.subtitleTinyGray, Gutters.tinyRMargin]}>
        24 hours
      </Text>
      <Text
        style={isIncreasing ? Fonts.textSmallSuccess : Fonts.textSmallError}
      >
        {isIncreasing ? '+' : ''}
        {(percent * 100).toFixed(2)}%
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  percentage: {
    height: 35,
  },
})

export default IncreasingView
