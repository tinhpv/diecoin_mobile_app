import React from 'react'
import { View, StyleSheet } from 'react-native'

const Separator = ({ color = 'rgba(255, 255, 255, 0.1)' }) => {
  return <View style={styles(color).line} />
}
const styles = color =>
  StyleSheet.create({
    line: {
      backgroundColor: color,
      width: '100%',
      height: 0.5,
    },
  })

export default Separator
