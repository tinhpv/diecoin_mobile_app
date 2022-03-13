import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { useDebounce } from 'use-debounce/lib'

import { useTheme } from '@/Hooks'
import SearchBar from './SearchBar'
import ImageButton from './ImageButton'
import ResultItem from './ResultItem'
import { Separator, NoResultView } from '@/Components'
import { useLazySearchTokenQuery } from '@/Services/modules/token'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { useDispatch } from 'react-redux'
import { updateSelectedToken } from '@/Store/Token'

const SearchContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const [
    searchToken,
    { data, isSuccess, isLoading, isFetching },
  ] = useLazySearchTokenQuery()

  const { Images, Gutters, Layout, Fonts } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchValue] = useDebounce(searchTerm, 600)
  const [exchange, setExchange] = useState('pancake')

  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  const exchanges = [
    { display: 'BINANCE', value: 'pancake', image: Images.binance },
    { display: 'SOLANA', value: 'raydium', image: Images.solana },
    { display: 'ETHEREUM', value: 'uniswap', image: Images.ethereum },
    { display: 'POLYGON', value: 'sushi_matic', image: Images.polygon },
  ]

  useEffect(() => {
    searchValue !== '' &&
      searchToken({ searchTerm: searchValue, exchange }, true)
  }, [searchToken, searchValue, exchange])

  return (
    <ImageBackground
      source={Images.background}
      style={[Layout.fill, styles.container]}
    >
      <View style={[Layout.fill, Gutters.smallHMargin]}>
        <View style={[Layout.rowHCenter]}>
          <SearchBar
            placeholder="Search market"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSubmit={term => {
              setSearchTerm(term)
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              } else {
                navigateAndSimpleReset('Main')
              }
            }}
          >
            <Text style={[Fonts.textSmall, styles.cancel]}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {exchanges.map((item, index) => (
              <ImageButton
                key={index}
                image={item.image}
                title={item.display}
                selected={exchange === item.value}
                onPress={() => setExchange(item.value)}
              />
            ))}
          </ScrollView>
        </View>
        <Separator />
        <View style={Layout.fill}>
          {(isLoading || isFetching) && (
            <ActivityIndicator style={[Layout.center, Gutters.smallTMargin]} />
          )}
          {isSuccess && (
            <View style={styles.list}>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={token => token.id}
                data={getUniqueListBy(data, 'id')}
                ListEmptyComponent={() => (
                  <NoResultView
                    image={Images.search}
                    title="No search result"
                    description={
                      'We cannot find results for your search \n Try again with another term'
                    }
                  />
                )}
                renderItem={({ item }) => (
                  <ResultItem
                    item={item}
                    onPress={() => {
                      dispatch(updateSelectedToken({ id: item.id }))
                      navigate('Pool', { exchange, tokenId: item.id })
                    }}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: { paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  cancel: { paddingLeft: 14, paddingRight: 5 },
  list: {
    flex: 1,
    marginTop: 10,
    marginBottom: Platform.OS === 'ios' ? 50 : 0,
  },
})

export default SearchContainer
