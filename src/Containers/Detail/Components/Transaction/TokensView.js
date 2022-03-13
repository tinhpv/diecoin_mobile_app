import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
  Linking,
} from 'react-native'
import { Separator, NoResultView } from '@/Components'
import { useTheme, useToken } from '@/Hooks'
import {
  useLazyFetchTransactionQuery,
  useLazyFetchLatestTransactionQuery,
  useLazyFetchTransactionByPairQuery,
  useLazyFetchLatestTransactionByFairQuery,
} from '@/Services/modules/transaction'
import { convertToDateString, convertToTimeString } from '@/Utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { displayPrice } from '@/Utils/numbers'

const RAYDIUM = 'raydium'

const TokensView = ({ exchange, detail }) => {
  const { Layout, Gutters, Fonts, Images } = useTheme()
  const selectedTokenId = useToken(detail)
  const [isToken0, setIsToken0] = useState(true)
  const [lazyLoading, setLazyLoading] = useState(false)

  // FETCH BY TOKEN

  const [
    fetchTransaction,
    {
      isLoading: isFetchByTokenLoading,
      data: fetchByTokenBaseData,
      isSuccess: isFetchByTokenBaseApiSuccess,
    },
  ] = useLazyFetchTransactionQuery()

  const [
    fetchLatestTransaction,
    { data: fetchByTokenLatestData, isSuccess: isGetLatestDataByTokenSuccess },
  ] = useLazyFetchLatestTransactionQuery()

  // FETCH BY FAIR

  const [
    fetchTransactionByPair,
    {
      isLoading: isFetchByPairLoading,
      data: fetchByPairBaseData,
      isSuccess: isFetchByFairBaseApiSuccess,
    },
  ] = useLazyFetchTransactionByPairQuery()

  const [
    fetchLatestTransactionByFair,
    { data: fetchByPairLatestData, isSuccess: isGetLatestDataByPairSuccess },
  ] = useLazyFetchLatestTransactionByFairQuery()

  const [stateLatestData, setStateLatestData] = useState(fetchByTokenBaseData)
  const persistedLatestData = useRef([])
  const persistedTheLastTransition = useRef({})

  // FIRST, CALL BASE API - ONE TIME ONLY

  useEffect(() => {
    if (exchange !== RAYDIUM) {
      fetchTransaction({
        exchange,
        tokenId: selectedTokenId,
      })
    } else {
      fetchTransactionByPair({
        exchange,
        pairId: detail.id,
      })
    }
  }, [
    detail.id,
    exchange,
    fetchTransaction,
    fetchTransactionByPair,
    selectedTokenId,
  ])

  useEffect(() => {
    if (exchange !== RAYDIUM && isFetchByTokenBaseApiSuccess) {
      setStateLatestData(fetchByTokenBaseData)
      updatePersistedLatestData(fetchByTokenBaseData)
      updatePersistedLastTransition(
        fetchByTokenBaseData[fetchByTokenBaseData.length - 1],
      )
      setIsToken0(fetchByTokenBaseData[0].pair.token0.id === selectedTokenId)
    } else if (exchange === RAYDIUM && isFetchByFairBaseApiSuccess) {
      setStateLatestData(fetchByPairBaseData)
      updatePersistedLatestData(fetchByPairBaseData)
      updatePersistedLastTransition(
        fetchByPairBaseData[fetchByPairBaseData.length - 1],
      )
      setIsToken0(fetchByPairBaseData[0].pair.token0.id === selectedTokenId)
    }
  }, [
    isFetchByTokenBaseApiSuccess,
    fetchByTokenBaseData,
    exchange,
    isFetchByFairBaseApiSuccess,
    fetchByPairBaseData,
    selectedTokenId,
  ])

  // NEXT, WHEN BASE API SUCCESSFUL
  // CALL TO GET LATEST DATA EVERY 5s
  useEffect(() => {
    const idInterval = setInterval(() => {
      if (exchange !== RAYDIUM && isFetchByTokenBaseApiSuccess) {
        fetchLatestTransaction({
          exchange,
          tokenId: selectedTokenId,
          lastTrxId: persistedLatestData.current[0].id,
          lastTrxTimestamp: persistedLatestData.current[0].timestamp,
        })
      } else if (exchange === RAYDIUM && isFetchByFairBaseApiSuccess) {
        fetchLatestTransactionByFair({
          exchange,
          pairId: detail.id,
          lastTrxId: persistedLatestData.current[0].id,
          lastTrxTimestamp: persistedLatestData.current[0].timestamp,
        })
      }
    }, 5000)
    return () => {
      clearInterval(idInterval)
    }
  }, [
    fetchLatestTransaction,
    selectedTokenId,
    exchange,
    isFetchByTokenBaseApiSuccess,
    isFetchByFairBaseApiSuccess,
    fetchLatestTransactionByFair,
    detail.id,
  ])

  useEffect(() => {
    if (isGetLatestDataByTokenSuccess) {
      const newFullData = fetchByTokenLatestData.concat(
        persistedLatestData.current,
      )
      setStateLatestData(newFullData)
      updatePersistedLatestData(newFullData)
    } else if (isGetLatestDataByPairSuccess) {
      const newFullData = fetchByPairLatestData.concat(
        persistedLatestData.current,
      )
      setStateLatestData(newFullData)
      updatePersistedLatestData(newFullData)
    }
  }, [
    isGetLatestDataByTokenSuccess,
    fetchByTokenLatestData,
    isGetLatestDataByPairSuccess,
    fetchByPairLatestData,
  ])

  const updatePersistedLatestData = dataToUpdate => {
    persistedLatestData.current = dataToUpdate
  }

  const updatePersistedLastTransition = transition => {
    persistedTheLastTransition.current = transition
  }

  const openUrl = url => {
    if (url.length !== 0 && Linking.canOpenURL(url)) {
      Linking.openURL(url)
    }
  }

  const row = ({ item }) => {
    const color = item.transactionType === 'sell' ? styles.sell : styles.buy

    const getUrl = () => {
      switch (exchange) {
        case 'pancake':
          return `https://bscscan.com/tx/${item.trxHash}`
        case 'uniswap':
          return `https://etherscan.io/tx/${item.trxHash}`

        case 'raydium':
          return `https://solscan.io/tx/${item.trxHash}`

        case 'sushi_matic':
          return `https://polygonscan.com/tx/${item.trxHash}`
      }
    }

    return (
      <View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentCenter,
            Layout.fill,
            Layout.fullWidth,
            Gutters.smallVPadding,
          ]}
        >
          {/* Tokens */}
          <View style={styles.col1}>
            <Text style={[Fonts.textTiny, color]}>
              {(isToken0 ? item.token0Amount : item.token1Amount).toFixed(4)}
            </Text>
          </View>

          {/* Price */}
          <View style={styles.col2}>
            <Text style={[Fonts.textTiny, color]}>
              ${displayPrice(item.totalValue)}
            </Text>
          </View>

          {/* Price/Token */}
          <View style={styles.col3}>
            <Text style={[Fonts.textTiny, color]}>
              $
              {displayPrice(
                item.totalValue /
                  (isToken0 ? item.token0Amount : item.token1Amount),
              )}
            </Text>
          </View>

          {/* Time */}
          <View style={styles.col4}>
            <Text style={[Fonts.textTiny, color]}>
              {convertToTimeString(item.timestamp * 1000)} {'\n'}
              {convertToDateString(item.timestamp * 1000)}
            </Text>
          </View>

          {/* Track */}
          <TouchableOpacity onPress={() => openUrl(getUrl())}>
            <View style={styles.col5}>
              <Text style={[Fonts.subtitleSmallBlue]}>Trx</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Separator />
      </View>
    )
  }

  const header = () => {
    return (
      <View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentCenter,
            Gutters.smallVPadding,
          ]}
        >
          {/* Tokens */}
          <View style={styles.col1}>
            <Text style={[Fonts.textTiny]}>Tokens</Text>
          </View>

          {/* Price */}
          <View style={styles.col2}>
            <Text style={[Fonts.textTiny]}>Price</Text>
          </View>

          {/* Price/Token */}
          <View style={styles.col3}>
            <Text style={[Fonts.textTiny]}>Price/Token</Text>
          </View>

          {/* Time */}
          <View style={styles.col4}>
            <Text style={[Fonts.textTiny]}>Time</Text>
          </View>

          {/* Track */}
          <View style={styles.col5}>
            <Text style={[Fonts.textTiny]}>Trx</Text>
          </View>
        </View>
        <Separator />
      </View>
    )
  }

  const handleLoadMore = () => {
    setLazyLoading(true)
    if (exchange !== RAYDIUM) {
      fetchTransaction({
        exchange,
        tokenId: selectedTokenId,
        lastTime: persistedTheLastTransition.current.timestamp,
        lastTransactionId: persistedTheLastTransition.current.id,
      })
    } else {
      fetchTransactionByPair({
        exchange,
        pairId: detail.id,
        lastTime: persistedTheLastTransition.current.timestamp,
        lastTransactionId: persistedTheLastTransition.current.id,
      })
    }
  }

  const renderFooter = () => {
    return lazyLoading ? (
      <ActivityIndicator style={Gutters.smallTMargin} size={'small'} />
    ) : null
  }

  return (
    <View style={Layout.fill}>
      {(isFetchByTokenLoading || isFetchByPairLoading) && (
        <ActivityIndicator style={Gutters.smallTMargin} size={'small'} />
      )}

      <View style={styles.table}>
        {(isFetchByTokenBaseApiSuccess || isFetchByFairBaseApiSuccess) && (
          <>
            {header()}
            <FlatList
              ListEmptyComponent={() => (
                <NoResultView
                  image={Images.search}
                  title="No transaction found!"
                  description={'We cannot find any transaction'}
                />
              )}
              keyExtractor={transaction => transaction.id}
              data={stateLatestData}
              renderItem={row}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
              ListFooterComponent={renderFooter}
            />
          </>
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  table: { width: '100%', height: 500 },
  col1: { width: '24%', paddingRight: 14 },
  col2: { width: '23%', paddingRight: 5 },
  col3: { width: '25%', paddingRight: 5 },
  col4: {
    width: '21%',
    justifyContent: 'center',
    paddingRight: 5,
  },
  col5: { flex: 1 },
  buy: {
    color: '#00FF00',
  },
  sell: {
    color: '#FF0000',
  },
})

export default TokensView
