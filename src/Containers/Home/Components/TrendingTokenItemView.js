import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { VictoryLine } from 'victory-native'
import { useTheme } from '@/Hooks'
import { CHART_DATA_DEC, CHART_DATA_INC } from '../DataSource/ChartData'
import { displayPercent, displayPrice } from '@/Utils/numbers'

const { width } = Dimensions.get('window')

const TrendingTokenItemView = ({ token }) => {
  const { Layout, Fonts, Gutters, Colors } = useTheme()
  const isIncreasing = token.price24hPercent > 0

  const getChartData = () => {
    switch (token.symbol) {
      case 'BTC':
        return isIncreasing ? CHART_DATA_INC[0] : CHART_DATA_DEC[0]
      case 'ETH':
        return isIncreasing ? CHART_DATA_INC[1] : CHART_DATA_DEC[1]
      case 'BNB':
        return isIncreasing ? CHART_DATA_INC[2] : CHART_DATA_DEC[2]
    }
  }

  return (
    <View>
      {/* INFO */}
      <View style={[Layout.rowHCenter, styles.container]}>
        <Image source={{ uri: token.image }} style={styles.image} />
        <View style={Gutters.littleLMargin}>
          <Text style={Fonts.textSmall}>{token.symbol}</Text>
          <View style={Layout.rowBaseline}>
            <Text style={[Fonts.textLittleSuccess, Gutters.littleRMargin]}>
              ${displayPrice(token.price)}
            </Text>
            <Text
              style={
                isIncreasing
                  ? Fonts.textExtremelySmallSuccess
                  : Fonts.textExtremelySmallError
              }
            >
              {isIncreasing ? '+' : ''}
              {displayPercent(token.price24hpercent * 100)}%
            </Text>
          </View>
        </View>
      </View>

      {/* CHART */}
      <View style={Gutters.littleTMargin}>
        <VictoryLine
          padding={10}
          height={60}
          width={width / 3.5}
          style={{
            data: {
              stroke: isIncreasing ? Colors.success : Colors.error,
            },
          }}
          x={0}
          y={1}
          data={getChartData()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  image: {
    width: 30,
    height: 30,
  },
})

export default TrendingTokenItemView
