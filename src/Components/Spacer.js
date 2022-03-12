import React from 'react'
import { View, StyleSheet } from 'react-native'

const Spacer = ({ size = 6 }) => {
  return <View style={styles(size).space} />
}

const styles = size =>
  StyleSheet.create({
    space: {
      marginRight: size,
    },
  })

export default Spacer
