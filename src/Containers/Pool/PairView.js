import React from 'react'
import { View, Text } from 'react-native'

import { useTheme } from '@/Hooks'

const PairView = ({ leftToken, rightToken, exchange }) => {
  const { Fonts, Layout } = useTheme()

  return (
    <View style={Layout.fill}>
      <View style={Layout.rowBaseline}>
        <Text style={[Fonts.textRegular]}>{leftToken}</Text>
        <Text style={[Fonts.subtitleSmallGray]}>/{rightToken}</Text>
      </View>
      <Text style={[Fonts.subtitleSmallBlue]}>{exchange}</Text>
    </View>
  )
}

export default PairView
