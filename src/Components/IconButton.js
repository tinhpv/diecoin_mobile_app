import React from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'

const IconButton = ({ unSelectedIcon, selectedIcon, onPress, selected }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image
      source={selected ? selectedIcon : unSelectedIcon}
      style={styles.image}
    />
  </TouchableOpacity>
)
const styles = StyleSheet.create({
  image: { width: 11, height: 11, tintColor: 'white' },
  button: {
    borderRadius: 22,
    borderWidth: 1.1,
    borderColor: 'white',
    padding: 5,
  },
})

export default IconButton
