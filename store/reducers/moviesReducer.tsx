import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { DataType } from '../../types/DataTypes'

// Define a type for the slice state
export interface MoviewState {
  movies: DataType[]
}

// Define the initial state using that type
const initialState: MoviewState = {
  movies: []
}

export const moviesSlice = createSlice({
  name: 'movies',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNew: (state, action: PayloadAction<DataType>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.movies = [...state.movies, action.payload]
    },
  }
})

// Action creators are generated for each case reducer function
export const { addNew } = moviesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.movies

export default moviesSlice.reducer