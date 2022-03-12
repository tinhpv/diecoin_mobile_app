import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'

const AlertView = ({ image, title, message }) => {
  const { Fonts, Layout } = useTheme()
  return (
    <View style={Layout.colVCenter}>
      <Image source={image} style={styles.image} />
      <Text style={Fonts.textLargeBold}>{title}</Text>
      <Text style={Fonts.textRegular}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
  },
})

export default AlertView
