import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useTheme } from '@/Hooks'
import AutoScroll from '@homielab/react-native-auto-scroll'
import TrendingTokenItemView from './TrendingTokenItemView'
import { useLazyFetchTrendingTokenQuery } from '@/Services/modules/token'
import { FlatList } from 'react-native-gesture-handler'

const TopCoinView = () => {
  const { Gutters } = useTheme()
  const [trendingTokenList, setTrendingTokenList] = useState([])

  const [
    fetchTrendingToken,
    { isLoading, data, isSuccess },
  ] = useLazyFetchTrendingTokenQuery()

  // API HANDLING

  useEffect(() => {
    fetchTrendingToken()
  }, [fetchTrendingToken])

  useEffect(() => {
    if (isSuccess) {
      setTrendingTokenList(data)
    }
  }, [data, isSuccess])

  useEffect(() => {
    const idInterval = setInterval(() => {
      fetchTrendingToken()
    }, 5000)
    return () => {
      clearInterval(idInterval)
    }
  }, [fetchTrendingToken])

  // UI IMPLEMENTATION

  return (
    <View style={Gutters.largeVMargin}>
      {isLoading && (
        <ActivityIndicator style={Gutters.regularVMargin} size={'small'} />
      )}
      <AutoScroll endPaddingWidth={0}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={trendingTokenList}
          keyExtractor={item => item.order}
          renderItem={({ item }) => (
            <TrendingTokenItemView key={item.order} token={item} />
          )}
        />
      </AutoScroll>
    </View>
  )
}

export default TopCoinView
