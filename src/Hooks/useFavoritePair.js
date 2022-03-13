import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useFavoritePair = pairID => {
  const storedFavoriteList = useSelector(state => state.favorite.favoriteList)
  const [favoritePair, setFavoritePair] = useState({
    fee24h: 0,
    id: '',
    network: 'N/A',
    order: 0,
    token0: {
      id: '',
      imageUrl: '',
      price: 0.0,
      priceUsd: 0.0,
      reserve: 0.0,
      symbol: 'N/A',
    },
    token1: {
      id: 'N/A',
      imageUrl: '',
      price: 0.0,
      priceUsd: 0.0,
      reserve: 0.0,
      symbol: 'N/A',
    },
    tvl: 0,
    vol24h: 0,
    vol24hPercent: 0,
  })

  useEffect(() => {
    setFavoritePair(storedFavoriteList[pairID])
  }, [pairID, storedFavoriteList])

  return favoritePair
}

export default useFavoritePair
