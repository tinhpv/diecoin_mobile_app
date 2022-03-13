import React, { useState, useEffect } from 'react'
import { ScrollView, ActivityIndicator, Linking } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'
import Spacer from '@/Components/Spacer'
import { useFetchSocialNetworkInfoQuery } from '@/Services/modules/token'
import {
  addToWatchList,
  isAFavoriteItem,
  removeFromFavoriteList,
} from '@/Containers/Favorite/FavoriteHelper'
import { ImageButton, IconButton } from '@/Components'
import { swapApps } from '@/Constant'

const ActionStack = ({ exchange, tokenId, pairId }) => {
  const { Images, Layout, Gutters } = useTheme()
  const [favorite, setFavorite] = useState(false)
  const { isLoading, data, isSuccess } = useFetchSocialNetworkInfoQuery({
    exchange,
    tokenId,
  })

  useEffect(() => {
    const checkFavorite = async () => {
      const favoriteItem = await isAFavoriteItem(exchange, pairId)
      setFavorite(favoriteItem)
    }
    checkFavorite()
  }, [exchange, pairId])

  const openUrl = url => {
    if (url.length !== 0 && Linking.canOpenURL(url)) {
      Linking.openURL(url)
    }
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={[Layout.fill, Gutters.tinyTMargin]}
    >
      {isLoading && <ActivityIndicator size={'small'} />}
      {isSuccess && (
        <>
          <IconButton
            selectedIcon={Images.starFilled}
            unSelectedIcon={Images.star}
            selected={favorite}
            onPress={() => {
              if (favorite) {
                removeFromFavoriteList(exchange, pairId)
                setFavorite(false)
              } else {
                addToWatchList(exchange, pairId)
                setFavorite(true)
              }
            }}
          />
          <Spacer size={10} />
          <IconButton unSelectedIcon={Images.share} selected={false} />
          <Spacer size={10} />
          <ImageButton
            image={Images.bscscan}
            onPress={() => {
              openUrl(data.scanUrl)
            }}
          />
          <Spacer size={10} />
          <ImageButton
            image={Images.coinmarketcap}
            onPress={() => {
              openUrl(data.cmcUrl)
            }}
          />
          <Spacer size={10} />
          <ImageButton
            image={Images.unicrypt}
            onPress={() => {
              openUrl(data.unicryptUrl)
            }}
          />
          <Spacer size={10} />
          <IconButton
            unSelectedIcon={Images.twitter}
            onPress={() => {
              openUrl(data.twitterUrl)
            }}
          />
          <Spacer size={10} />
          <IconButton
            unSelectedIcon={Images.world}
            onPress={() => {
              openUrl(data.websiteUrl)
            }}
          />
          <Spacer size={10} />
          <IconButton
            unSelectedIcon={Images.telegram}
            onPress={() => {
              openUrl(data.telegramUrl)
            }}
          />
          <Spacer size={10} />
          <IconButton unSelectedIcon={Images.discord} onPress={() => {}} />
          <Spacer size={10} />
          <IconButton
            unSelectedIcon={Images.github}
            onPress={() => {
              openUrl(data.githubUrl)
            }}
          />
          <Spacer size={10} />
          <IconButton
            unSelectedIcon={Images.investigation}
            onPress={() => {
              openUrl(data.documentUrl)
            }}
          />
          <Spacer size={10} />
        </>
      )}
    </ScrollView>
  )
}

ActionStack.propTypes = {
  exchange: PropTypes.oneOf([
    swapApps.PANCAKE,
    swapApps.RAYDIUM,
    swapApps.SUSHI,
    swapApps.UNISWAP,
  ]).isRequired,
  pairId: PropTypes.string.isRequired,
  tokenId: PropTypes.string.isRequired,
}

export default ActionStack
