import React, { useEffect } from 'react'
import {
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import { useLazyFetchPairDetailQuery } from '@/Services/modules/pair'
import { navigate } from '@/Navigators/utils'

const { width } = Dimensions.get('window')

const ExchangeView = ({ exchange }) => {
  const [
    fetchPairDetail,
    { isLoading, data, isSuccess },
  ] = useLazyFetchPairDetailQuery()

  // METHODS

  const handleNavigate = () => {
    fetchPairDetail({
      exchange: exchange.name,
      pairId: exchange.defaultPairId,
    })
  }

  // API HANDLING

  useEffect(() => {
    if (isSuccess) {
      navigate('CoinSearch', {
        screen: 'Detail',
        params: {
          pairDetail: data,
          exchange: exchange.name,
        },
      })
    }
  }, [data, exchange.name, isSuccess])

  // UI IMPLEMENTATION

  return (
    <TouchableOpacity onPress={handleNavigate}>
      {isLoading && (
        <ActivityIndicator size={'small'} style={styles.indicator} />
      )}
      <Image source={exchange.image} style={styles.imageButton} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imageButton: {
    width: width / 2.3,
    height: 40,
    resizeMode: 'contain',
    zIndex: 0,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
})

export default ExchangeView
