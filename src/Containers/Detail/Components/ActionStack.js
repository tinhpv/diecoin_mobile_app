import React, { useState, useEffect } from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native'
import { useTheme } from '@/Hooks'
import Spacer from '@/Components/Spacer'
import { useFetchSocialNetworkInfoQuery } from '@/Services/modules/token'
import {
  addToWatchList,
  isAFavoriteItem,
  removeFromFavoriteList,
} from '@/Containers/Favorite/FavoriteHelper'
import IconButton from '@/Components/IconButton'

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

const ImageButton = ({ image, onPress }) => (
  <TouchableOpacity style={styles.imageButton} onPress={onPress}>
    <Image source={image} style={styles.imageInImageButton} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  label: { width: 120 },
  imageInImageButton: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  imageButton: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  buttonSelected: {
    backgroundColor: 'white',
  },
  buttonUnSelected: {
    backgroundColor: 'transparent',
  },
})

export default ActionStack
