import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const activeSlice = createSlice({
  name: 'active',
  initialState: {
    isActive: false,
  },
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload
    },
  },
})

export const { setActive } = activeSlice.actions

export default activeSlice.reducer
