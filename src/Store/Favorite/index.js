import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'favorite',
  initialState: { favoriteList: {} },
  reducers: {
    updateFavorite: (state, { payload: { favoriteList } }) => {
      favoriteList.forEach(item => (state.favoriteList[item.id] = item))
    },
  },
})

export const { updateFavorite } = slice.actions

export default slice.reducer
