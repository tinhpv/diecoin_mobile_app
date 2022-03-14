import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

import { useTheme } from '@/Hooks'
import { displayPrice } from '@/Utils'

const TokenItemView = ({ token }) => {
  const { Fonts, Layout, Gutters } = useTheme()
  const isIncreasing = token.price24hPercent > 0

  return (
    <View style={[Layout.rowHCenter, Gutters.smallVPadding]}>
      {/* TOKEN NAME */}
      <View style={[Layout.fill, Layout.row]}>
        <Image source={{ uri: token.logo }} style={styles.image} />
        <Text style={Gutters.tinyLMargin}>
          <Text style={[Fonts.textRegular]}>{token.symbol} </Text>
          <Text style={Fonts.subtitleSmallGray}>{token.name}</Text>
        </Text>
      </View>

      {/* PRICE / CHANGE */}
      <View style={[Layout.col]}>
        <Text style={[Fonts.textSmall, Fonts.textRight]}>
          ${displayPrice(token.price)}
        </Text>
        <Text
          style={[
            isIncreasing ? Fonts.textSmallSuccess : Fonts.textSmallError,
            Fonts.textRight,
          ]}
        >
          {isIncreasing ? '+' : ''}
          {token.price24hPercent}%
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({ image: { width: 22, height: 22 } })

export default TokenItemView
