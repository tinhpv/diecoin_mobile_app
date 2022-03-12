import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { VictoryLine } from 'victory-native'
import { useTheme } from '@/Hooks'
import { CHART_DATA_DEC, CHART_DATA_INC } from '../DataSource/ChartData'
import { displayPrice } from '@/Utils/numbers'

const { width } = Dimensions.get('window')

const TrendingTokenItemView = ({ token }) => {
  const { Layout, Fonts, Gutters, Colors } = useTheme()
  const isIncreasing = token.price24hPercent > 0
  const chartDataSource = isIncreasing ? CHART_DATA_INC[0] : CHART_DATA_DEC[1]

  return (
    <View style={[Gutters.tinyRMargin]}>
      {/* INFO */}
      <View style={[Layout.rowHCenter, styles.container]}>
        <Image source={{ uri: token.logo }} style={styles.image} />
        <View style={Gutters.littleLMargin}>
          <Text style={Fonts.textSmall}>{token.symbol}</Text>
          <View style={Layout.rowBaseline}>
            <Text style={[Fonts.textTinySuccess, Gutters.littleRMargin]}>
              ${displayPrice(token.price)}
            </Text>
            <Text
              style={
                isIncreasing
                  ? Fonts.textLittleBoldSuccess
                  : Fonts.textLittleBoldError
              }
            >
              {isIncreasing ? '+' : ''}
              {token.price24hPercent}%
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
          data={chartDataSource}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingRight: 20,
  },
  image: {
    width: 30,
    height: 30,
  },
})

export default TrendingTokenItemView
