import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/Hooks'

const LabelContentView = ({ label, content, leftAlign = true }) => {
  const { Fonts } = useTheme()
  const align = leftAlign ? Fonts.textLeft : Fonts.textRight

  return (
    <View>
      <Text style={[Fonts.subtitleTinyGray, align]}>{label}</Text>
      <Text style={[Fonts.textSmallBold, align]}>{content}</Text>
    </View>
  )
}

export default LabelContentView
