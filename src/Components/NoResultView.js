import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'

const NoResultView = ({ image, title = '', description }) => {
  const { Fonts, Layout, Gutters } = useTheme()

  return (
    <View style={[Layout.fill, Layout.center, Gutters.extremelyLargeVPadding]}>
      <Image source={image} style={styles.image} />
      <Text style={[Fonts.textRegular, Gutters.tinyVMargin]}>{title}</Text>
      <Text
        style={[Fonts.textRegular, Fonts.textCenter, Fonts.subtitleRegularGray]}
      >
        {description}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
})

export default NoResultView
