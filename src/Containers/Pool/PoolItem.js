import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { useTheme } from '@/Hooks'
import PairView from './PairView'
import {
  addToWatchList,
  isAFavoriteItem,
  removeFromFavoriteList,
} from '../Favorite/FavoriteHelper'
import { displayPrice } from '@/Utils/numbers'

const PoolItem = ({ item, exchange, onPress }) => {
  const { Layout, Gutters, Images, Fonts } = useTheme()
  const { token0, token1 } = item
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    const checkFavorite = async () => {
      const favoriteItem = await isAFavoriteItem(exchange, item.id)
      setFavorite(favoriteItem)
    }
    checkFavorite()
  }, [exchange, item.id])

  return (
    <View style={[Layout.fill, Layout.rowHCenter]}>
      <TouchableOpacity
        style={[Layout.rowHCenter, Layout.fill]}
        onPress={() => onPress()}
      >
        <View style={[Layout.fill, Layout.rowHCenter, Gutters.smallVPadding]}>
          {/* PAIR */}
          <View style={Layout.rowHCenter}>
            <PairView
              leftToken={token0.symbol}
              rightToken={token1.symbol}
              exchange={exchange}
            />
          </View>
        </View>

        {/* LP HOLDING */}
        <View style={[Gutters.smallRMargin, styles.price]}>
          <Text style={[Fonts.textSmallBoldSuccess, Fonts.textRight]}>
            ${displayPrice(item.tvl)}
          </Text>
        </View>
      </TouchableOpacity>

      {/* FAVORITE BUTTON */}
      <TouchableOpacity
        onPress={() => {
          if (favorite) {
            removeFromFavoriteList(exchange, item.id)
            setFavorite(false)
          } else {
            addToWatchList(exchange, item.id)
            setFavorite(true)
          }
        }}
      >
        <Image
          source={favorite ? Images.favoriteFilled : Images.favorite}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flex: 1 },
  image: { width: 12, height: 12, tintColor: 'white' },
  price: {
    width: 147,
  },
})

export default PoolItem
