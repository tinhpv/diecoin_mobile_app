import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'

const ImageButton = ({ image, title, selected, onPress }) => {
  const { Fonts, Layout, Gutters } = useTheme()

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          Layout.rowHCenter,
          Gutters.smallVMargin,
          Gutters.tinyHMargin,
          styles(selected).container,
        ]}
      >
        <Image source={image} style={styles().image} />
        <Text style={[Fonts.textTiny, styles(selected).title]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = selected => {
  return StyleSheet.create({
    image: { width: 18, height: 18, marginRight: 4 },
    container: {
      backgroundColor: selected ? 'rgba(255, 255, 255, 0.4)' : null,
      borderWidth: selected ? 0 : 0.5,
      borderColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    title: {
      color: selected ? '#1D202E' : 'white',
    },
  })
}

export default ImageButton
