import React from 'react'
import { View, StyleSheet } from 'react-native'

const ItemDivider = () => {
  return <View style={styles.divider} />
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#1c1c1c',
  },
})

export default ItemDivider
