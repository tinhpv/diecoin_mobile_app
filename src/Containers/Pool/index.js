import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Separator, NoResultView } from '@/Components'
import PoolItem from './PoolItem'
import {
  useFetchPairDetailListMutation,
  useLazyFetchPairListQuery,
} from '@/Services/modules/pair'

const PoolListContainer = ({ route, navigation }) => {
  const { Images, Layout, Fonts, Gutters, Common } = useTheme()
  const { exchange, tokenId } = route.params
  const [datasource, setDatasource] = useState([])
  const [lazyLoading, setLazyLoading] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const persistedPairIdList = useRef([])
  const persistedDataSource = useRef([])

  // FETCH ID LIST

  const [
    fetchPairList,
    {
      data: resultFromFetchingPairIdList,
      isSuccess: fetchPairIdListSuccess,
      isLoading: fetchPairIdListLoading,
    },
  ] = useLazyFetchPairListQuery()

  // FETCH DETAIL LIST BASED ON ID LIST
  const [
    fetchPairDetailList,
    { data, isLoading, isSuccess },
  ] = useFetchPairDetailListMutation()

  useEffect(() => {
    fetchPairList({ exchange, tokenId })
  }, [exchange, fetchPairList, tokenId])

  useEffect(() => {
    if (fetchPairIdListSuccess) {
      var numberOfPairToFetch =
        resultFromFetchingPairIdList.length > 12
          ? 12
          : resultFromFetchingPairIdList.length

      // ONLY GET DETAIL OF FIRST 12 ELEMENTS IF THERE'RE MORE
      fetchPairDetailList({
        body: {
          pairIdList: resultFromFetchingPairIdList.slice(
            0,
            numberOfPairToFetch,
          ),
        },
        exchange,
      })

      persistedPairIdList.current = resultFromFetchingPairIdList.slice(
        numberOfPairToFetch + 1,
        resultFromFetchingPairIdList.length,
      )
    }
  }, [
    exchange,
    fetchPairDetailList,
    fetchPairIdListSuccess,
    resultFromFetchingPairIdList,
  ])

  useEffect(() => {
    if (isSuccess) {
      setShowHeader(true)
      setLazyLoading(false)
      data.length > 0 && persistedDataSource.current.push(...data)
      setDatasource(persistedDataSource.current)
    }
  }, [data, isSuccess])

  // METHODS

  const renderPoolItem = ({ item }) => (
    <PoolItem
      item={item}
      exchange={exchange}
      onPress={() =>
        navigation.navigate('Detail', {
          pairDetail: item,
          exchange,
        })
      }
    />
  )

  const renderEmptyView = () => {
    return fetchPairIdListSuccess && isSuccess ? (
      <NoResultView
        image={Images.search}
        title="No search result"
        description={
          'We cannot find results for your search \n Try again with another term'
        }
      />
    ) : null
  }

  const handleLoadMore = () => {
    if (persistedPairIdList.current.length > 12) {
      setLazyLoading(true)
      fetchPairDetailList({
        body: {
          pairIdList: persistedPairIdList.current.slice(0, 12),
        },
        exchange,
      })
      persistedPairIdList.current = persistedPairIdList.current.slice(
        13,
        persistedPairIdList.current.length,
      )
    } else if (persistedPairIdList.current.length > 0) {
      setLazyLoading(true)
      fetchPairDetailList({
        body: {
          pairIdList: persistedPairIdList.current,
        },
        exchange,
      })
      persistedPairIdList.current = []
    }
  }

  const renderFooter = () => {
    return lazyLoading ? (
      <ActivityIndicator style={Gutters.smallTMargin} size={'small'} />
    ) : null
  }

  const header = () => {
    return showHeader ? (
      <View style={Gutters.smallTMargin}>
        <View style={[Layout.row, Gutters.tinyBMargin]}>
          <Text style={[Layout.fill, Fonts.subtitleTinyGray]}>Pair</Text>
          <Text style={[Gutters.regularRMargin, Fonts.subtitleTinyGray]}>
            LP Holding
          </Text>
        </View>
        <Separator />
      </View>
    ) : null
  }

  // UI

  return (
    <ImageBackground
      source={Images.background}
      style={[Layout.fill, styles.container]}
    >
      <SafeAreaView style={styles.area} />
      <View style={[Layout.fill, Gutters.smallHMargin]}>
        {/* HEADER */}
        <View style={Layout.rowBaseline}>
          <View style={Layout.fill}>
            <Text style={[Fonts.titleRegular]}>Pool List</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Images.error}
                style={[Common.tintColorWhite, styles.image]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* MAIN LIST */}
        <View style={[Layout.fill]}>
          {(isLoading || fetchPairIdListLoading) && !lazyLoading && (
            <ActivityIndicator style={[Layout.center, Gutters.smallTMargin]} />
          )}
          {header()}
          <View style={styles.list}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={pair => pair.id}
              data={datasource}
              ListEmptyComponent={renderEmptyView}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
              ListFooterComponent={renderFooter}
              renderItem={renderPoolItem}
            />
          </View>
          {/* } */}
        </View>
      </View>
      <SafeAreaView style={styles.are} />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 60 : 15 },
  image: { width: 22, height: 22 },
  area: { opacity: 0 },
  list: {
    flex: 1,
    marginTop: 10,
    marginBottom: Platform.OS === 'ios' ? 50 : 0,
  },
})

export default PoolListContainer
