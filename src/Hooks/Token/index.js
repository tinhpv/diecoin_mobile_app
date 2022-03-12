import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useToken = detail => {
  const storedSelectedToken = useSelector(state => {
    return state.token.selectedTokenId
  })
  const [tokenId, setTokenId] = useState('')

  useEffect(() => {
    if (
      storedSelectedToken !== detail.token0.id &&
      storedSelectedToken !== detail.token1.id
    ) {
      setTokenId(detail.token0.id)
    } else {
      setTokenId(storedSelectedToken)
    }
  }, [detail.token0.id, detail.token1.id, storedSelectedToken])

  return tokenId
}
