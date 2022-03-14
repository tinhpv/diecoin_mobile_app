import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useTheme } from '@/Hooks'
import TrendingTokenItemView from './TrendingTokenItemView'
import { useLazyFetchTop3TokenInfoQuery } from '@/Services/modules/token'
import { useNavigation } from '@react-navigation/native'

const TopCoinView = () => {
  const { Gutters, Layout } = useTheme()
  const [trendingTokenList, setTrendingTokenList] = useState([])
  const navigation = useNavigation()

  const [
    fetchTop3TokenInfo,
    { isLoading, data, isSuccess },
  ] = useLazyFetchTop3TokenInfoQuery()

  // API HANDLING

  useEffect(() => {
    fetchTop3TokenInfo()

    const unsubscribe = navigation.addListener('focus', () => {
      fetchTop3TokenInfo()
    })
    return unsubscribe
  }, [fetchTop3TokenInfo, navigation])

  useEffect(() => {
    if (isSuccess) {
      setTrendingTokenList(data)
    }
  }, [data, isSuccess])

  useEffect(() => {
    const idInterval = setInterval(() => {
      fetchTop3TokenInfo()
    }, 5000)
    return () => {
      clearInterval(idInterval)
    }
  }, [fetchTop3TokenInfo])

  // UI IMPLEMENTATION

  return (
    <View style={[Gutters.largeVMargin, Layout.fill]}>
      {isLoading && (
        <ActivityIndicator style={Gutters.regularVMargin} size={'small'} />
      )}
      {trendingTokenList.length > 0 && (
        <View style={[Layout.row, Layout.justifyContentBetween]}>
          <TrendingTokenItemView token={trendingTokenList[0]} />
          <TrendingTokenItemView token={trendingTokenList[1]} />
          <TrendingTokenItemView token={trendingTokenList[2]} />
        </View>
      )}
    </View>
  )
}

export default TopCoinView
