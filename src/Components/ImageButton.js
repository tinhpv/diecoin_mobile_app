import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const ImageButton = ({ image, onPress }) => (
  <TouchableOpacity style={styles.imageButton} onPress={onPress}>
    <Image source={image} style={styles.imageInImageButton} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  imageInImageButton: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  imageButton: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
  },
})

export default ImageButton
