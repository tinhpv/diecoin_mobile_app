import React, { useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { useLazyFetchTrendingTokenQuery } from '@/Services/modules/token'
import TokenItemView from './Components/TokenItemView'
import { Separator } from '@/Components'

const TrendContainer = () => {
  // VARIABLES
  const { Images, Layout, Gutters, Fonts } = useTheme()
  const [tokenList, setTokenList] = useState([])

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
      setTokenList(data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    const idInterval = setInterval(() => {
      fetchTrendingToken()
    }, 5000)
    return () => {
      clearInterval(idInterval)
    }
  }, [fetchTrendingToken])

  // UI IMPLEMENTATION

  const header = () => {
    return (
      <View>
        <View style={[Layout.row, Gutters.tinyBMargin]}>
          <Text style={[Layout.fill, Fonts.subtitleTinyGray]}>Name</Text>
          <Text style={Fonts.subtitleTinyGray}>Last price / 24h change</Text>
        </View>
        <Separator />
      </View>
    )
  }

  const renderToken = ({ item }) => {
    return <TokenItemView token={item} />
  }

  return (
    <ImageBackground
      source={Images.background}
      style={[Layout.fill, styles.container]}
    >
      <SafeAreaView style={styles.area} />
      {/* HEADER */}
      <View style={[Gutters.smallHMargin]}>
        <Text style={[Fonts.titleRegular]}>Trending</Text>
      </View>

      {/* MAIN */}
      <View style={[Layout.fill, Gutters.smallVMargin, Gutters.smallHMargin]}>
        {isLoading && <ActivityIndicator size={'large'} />}
        {header()}
        <FlatList
          data={tokenList}
          keyExtractor={token => token.order}
          renderItem={renderToken}
        />
      </View>
      <SafeAreaView style={styles.are} />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 100 : 45 },
  area: { opacity: 0 },
  image: {},
})

export default TrendContainer
