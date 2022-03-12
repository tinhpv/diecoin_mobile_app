import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { useTheme } from '@/Hooks'

const ResultItem = ({ item, onPress }) => {
  const { Fonts, Layout, Images, Gutters } = useTheme()

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[Layout.rowHCenter, Gutters.smallVPadding]}>
        <Image
          defaultSource={Images.coin}
          source={{ uri: item.imageUrl }}
          style={styles.image}
        />
        <View style={[Layout.colHCenter, Gutters.smallLMargin]}>
          <Text style={[Fonts.textRegular]}>{item.name}</Text>
          <Text style={[Fonts.subtitleSmallGray]}>{item.symbol}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({ image: { width: 22, height: 22 } })

export default ResultItem
