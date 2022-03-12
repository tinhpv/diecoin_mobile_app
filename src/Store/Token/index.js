import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'token',
  initialState: { selectedTokenId: '' },
  reducers: {
    updateSelectedToken: (state, { payload: { id } }) => {
      state.selectedTokenId = id
    },
  },
})

export const { updateSelectedToken } = slice.actions

export default slice.reducer
