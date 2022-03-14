import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Platform,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '@/Hooks'
import FavoriteItem from './FavoriteItem'
import { useFetchFavoritePairDetailListMutation } from '@/Services/modules/pair'
import { getFavoriteList } from './FavoriteHelper'
import { useDispatch } from 'react-redux'
import { updateFavorite } from '@/Store/Favorite'
import { ItemDivider, NoResultView } from '@/Components'

const FavoriteContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const [listId, setListId] = useState([])
  const [isFirstLoaded, setIsFirstLoaded] = useState(true)

  const { Images, Layout, Gutters, Fonts } = useTheme()

  const [
    fetchFavoritePairDetailList,
    { data, isSuccess, isLoading },
  ] = useFetchFavoritePairDetailListMutation()

  useEffect(() => {
    if (isSuccess) {
      setIsFirstLoaded(false)
      dispatch(updateFavorite({ favoriteList: data }))
      setListId(data.map(item => item.id))
    }
  }, [isSuccess, dispatch, data])

  const checkFavoriteList = useCallback(async () => {
    const favoriteList = await getFavoriteList()
    console.log(favoriteList)
    favoriteList.length > 0 &&
      fetchFavoritePairDetailList({
        body: {
          pairIdList: favoriteList,
        },
      })
  }, [fetchFavoritePairDetailList])

  useEffect(() => {
    const idInterval = setInterval(() => {
      checkFavoriteList()
    }, 5000)
    return () => {
      clearInterval(idInterval)
    }
  }, [checkFavoriteList])

  useEffect(() => {
    const getListAndFetchData = async () => {
      checkFavoriteList()
    }
    const unsubscribe = navigation.addListener('focus', () => {
      getListAndFetchData()
    })
    return unsubscribe
  }, [navigation, checkFavoriteList])

  const renderFavoriteItems = ({ item }) => {
    return <FavoriteItem pairId={item} />
  }

  return (
    <ImageBackground
      source={Images.background}
      style={[Layout.fill, styles.container]}
    >
      <SafeAreaView style={styles.area} />
      <View style={[Layout.fill, Gutters.smallHMargin]}>
        <Text style={[Fonts.titleRegular]}>Favorites</Text>
        {isLoading && isFirstLoaded && (
          <ActivityIndicator size={'small'} style={Gutters.regularTMargin} />
        )}
        <View style={[Gutters.smallTMargin, Layout.fullHeight]}>
          <FlatList
            numColumns={2}
            columnWrapperStyle={Layout.justifyContentBetween}
            contentContainerStyle={styles.list}
            keyExtractor={item => item}
            ListEmptyComponent={
              <NoResultView
                image={Images.addToFavorite}
                title="No favorite token"
                description={
                  'Add a token to favorite \n It will be displayed here'
                }
              />
            }
            data={listId}
            renderItem={renderFavoriteItems}
            ItemSeparatorComponent={ItemDivider}
          />
        </View>
      </View>
      <SafeAreaView style={styles.area} />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 100 : 45 },
  list: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#222222' },
  area: { opacity: 0 },
})

export default FavoriteContainer
