import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'

const FeatureButton = ({ image, label }) => {
  const { Layout, Fonts } = useTheme()

  return (
    <TouchableOpacity>
      <View style={[Layout.colVCenter, styles.container]}>
        <Image source={image} style={styles.image} />
        <Text style={Fonts.textTiny}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#162B3F',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginBottom: 2,
  },
})

export default FeatureButton
