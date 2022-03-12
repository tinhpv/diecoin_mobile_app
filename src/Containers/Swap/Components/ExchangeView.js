import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const ExchangeView = ({ exchange, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={exchange.image} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: width / 2.2,
    height: width / 2.2,
  },
})

export default ExchangeView
