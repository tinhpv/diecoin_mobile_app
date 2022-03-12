import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'search',
  initialState: { searchTerm: '' },
  reducers: {
    updateSearchTerm: (state, { payload: { searchTerm } }) => {
      state.searchTerm = searchTerm
    },
  },
})

export const { updateSearchTerm } = slice.actions

export default slice.reducer
