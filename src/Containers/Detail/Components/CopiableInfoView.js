import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useTheme } from '@/Hooks'

const CopiableInfoView = ({ label, content }) => {
  const { Images, Layout, Gutters, Fonts } = useTheme()

  return (
    <View style={[Layout.row, Gutters.smallRMargin]}>
      <Text
        style={[Fonts.subtitleTinyGray, styles.label]}
        numberOfLines={1}
        ellipsizeMode="middle"
      >
        {label}: {content}
      </Text>
      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(content)
          // TODO: Show toast
        }}
      >
        <Image source={Images.copy} style={styles.image} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  label: { width: 120, marginRight: 4 },
  image: { width: 12, height: 12, tintColor: 'gray', bottom: -2 },
})

export default CopiableInfoView
