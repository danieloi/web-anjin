import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const assistantSlice = createSlice({
  name: 'assistantSlice',
  initialState: {
    isActive: false,
    isHidden: false,
  },
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload
    },
    setHidden: (state, action: PayloadAction<boolean>) => {
      state.isHidden = action.payload
    },
  },
})

export const { setActive, setHidden } = assistantSlice.actions

export default assistantSlice.reducer
