import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { WebView } from 'react-native-webview'

import { useTheme } from '@/Hooks'
import VolumeChangeView from './VolumeChangeView'
import DetailInfoView from './DetailInfoView'
import { useLazyFetchPairDetailQuery } from '@/Services/modules/pair'
import { displayPrice } from '@/Utils/numbers'

const ChartBox = ({ detail, exchange }) => {
  const { Layout, Gutters, Fonts, Common } = useTheme()
  const [newDetail, setNewDetail] = useState(detail)
  const [fetchPairDetail, { data, isSuccess }] = useLazyFetchPairDetailQuery()

  const chartUri = `https://chart.diecoin.app/chart?exchange=${exchange}&pairId=${detail.id}&theme=dark`

  useEffect(() => {
    const idInterval = setInterval(() => {
      fetchPairDetail({ exchange, pairId: detail.id })
    }, 5000)
    return () => {
      clearInterval(idInterval)
    }
  }, [detail.id, exchange, fetchPairDetail])

  useEffect(() => {
    if (isSuccess) {
      setNewDetail(data)
    }
  }, [isSuccess, data])

  return (
    <View style={Common.contentContainerRounded}>
      <View style={[Layout.row, Gutters.tinyBMargin]}>
        {/* PRICE */}
        <Text style={[Fonts.textBigBold, Layout.fill, Gutters.tinyRMargin]}>
          $ {displayPrice(newDetail.token0.priceUsd)}
        </Text>

        {/* 24h CHANGE */}
        <VolumeChangeView percent={newDetail.vol24hPercent} />
      </View>

      {/* TOKEN-1 PRICE */}
      <Text style={[Fonts.subtitleSmallGray]}>
        {detail.token1.symbol} {displayPrice(newDetail.token1.price)}
      </Text>

      {/* DETAIL INFO */}
      <View style={Gutters.tinyVMargin}>
        <DetailInfoView detail={detail} exchange={exchange} />
      </View>

      {/* CHART */}
      <View style={styles.webview}>
        <WebView
          startInLoadingState={true}
          style={styles.chart}
          source={{ uri: chartUri }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  chart: {
    height: 435,
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  webview: {
    marginTop: 10,
    marginBottom: -16,
    marginHorizontal: -16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
})

export default ChartBox
