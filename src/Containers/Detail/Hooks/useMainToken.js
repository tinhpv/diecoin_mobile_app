import { useState, useEffect } from 'react'

export const useMainToken = (pair, tokenId) => {
  const [mainToken, setMainToken] = useState({
    id: '',
    reserve: 0,
    symbol: '',
    imageUrl: '',
    price: 0,
    priceUsd: 0,
  })
  const [isZeroMainToken, setIsZeroMainToken] = useState(true)

  useEffect(() => {
    if (pair.token0.id === tokenId) {
      setMainToken(pair.token0)
      setIsZeroMainToken(true)
    } else {
      setMainToken(pair.token1)
      setIsZeroMainToken(false)
    }
  }, [pair.token0, pair.token1, tokenId])

  return { mainToken, isZeroMainToken }
}
