import AsyncStorage from '@react-native-async-storage/async-storage'

const FAVORITE_KEY = 'FAVORITE'

export const addToWatchList = async (exchangeName, pairId) => {
  const list = await getFavoriteList()
  list.push({ exchangeName, pairId })
  const jsonValue = JSON.stringify(list)
  await AsyncStorage.setItem(FAVORITE_KEY, jsonValue)
}

export const getFavoriteList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITE_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) : []
  } catch (e) {
    console.log(e)
  }
}

export const removeFromFavoriteList = async (exchange, pairId) => {
  const list = await getFavoriteList()
  const newList = list.filter(
    item => item.exchange !== exchange && item.pairId !== pairId,
  )
  const jsonValue = JSON.stringify(newList)
  await AsyncStorage.setItem(FAVORITE_KEY, jsonValue)
}

export const isAFavoriteItem = async (exchange, pairId) => {
  const list = await getFavoriteList()
  if (Array.isArray(list)) {
    return list.some(
      pair => pair.exchangeName === exchange && pair.pairId === pairId,
    )
  }
  return false
}
