import React, { useRef } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { VictoryLine } from 'victory-native'

import { useTheme, useFavoritePair } from '@/Hooks'
import PairView from '../Detail/Components/PairView'
import { navigate } from '@/Navigators/utils'
import { CHART_DATA_DEC, CHART_DATA_INC } from '../Home/DataSource/ChartData'
import { displayPrice } from '@/Utils'

const { width } = Dimensions.get('window')

const FavoriteItem = ({ pairId }) => {
  const { Gutters, Fonts, Common, Images, Layout, Colors } = useTheme()
  const favoritePair = useFavoritePair(pairId)
  const isIncreasing = favoritePair.vol24hPercent >= 0
  const numberRandom = useRef(Math.floor(Math.random() * 3))
  const chartDataSource = isIncreasing
    ? CHART_DATA_INC[numberRandom.current]
    : CHART_DATA_DEC[numberRandom.current]

  return (
    <View style={[styles.item, Gutters.smallVPadding, Gutters.smallHPadding]}>
      <TouchableOpacity
        onPress={() => {
          navigate('CoinSearch', {
            screen: 'Detail',
            params: {
              pairDetail: favoritePair,
              exchange: favoritePair.network,
            },
          })
        }}
      >
        {/* BABYCAKE / BUSD */}
        <PairView
          leftToken={favoritePair.token0}
          rightToken={favoritePair.token1}
          size="small"
        />

        {/* PRICE */}
        <Text
          style={[
            Fonts.textSmallSecondary,
            Gutters.tinyLMargin,
            Gutters.tinyVMargin,
          ]}
        >
          $ {displayPrice(favoritePair.token0.priceUsd)}
        </Text>

        {/* INCREASING RATE */}
        <View style={[Layout.rowBaseline, Gutters.tinyLMargin]}>
          <Image
            source={isIncreasing ? Images.arrowUp : Images.arrowDown}
            style={[
              styles.image,
              isIncreasing ? Common.tintColorSuccess : Common.tintColorError,
            ]}
          />
          <Text
            style={[isIncreasing ? Fonts.textTinySuccess : Fonts.textTinyError]}
          >
            {favoritePair.token0.token0Price24hPercent !== 0
              ? (favoritePair.token0.token0Price24hPercent * 100).toFixed(2)
              : 0}
            %
          </Text>
        </View>

        {/* CHART */}
        <View style={styles.chart}>
          <VictoryLine
            padding={10}
            height={54}
            width={68}
            style={{
              data: {
                stroke: isIncreasing ? Colors.success : Colors.error,
              },
            }}
            x={0}
            y={1}
            data={chartDataSource}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  item: {
    width: '50%',
    backgroundColor: '#222222',
  },
  image: {
    width: 6,
    height: 6,
    marginRight: 2,
  },
  chart: { position: 'absolute', left: width / 4.5, bottom: -5 },
})

export default FavoriteItem
