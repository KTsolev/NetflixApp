import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { FilmType } from '../../types/DataTypes'

// Define a type for the slice state
export interface MoviewState {
  latestMovies: FilmType[]
  mostScored: FilmType[]
}

// Define the initial state using that type
const initialState: MoviewState = {
  latestMovies: [],
  mostScored: []
}

export const moviesSlice = createSlice({
  name: 'sortedMovies',
  initialState,
  reducers: {
    sortMovieByRatings: (state, action: PayloadAction<FilmType[]>) => {
      state.mostScored = action.payload
    },
    sortByRelease: (state, action: PayloadAction<FilmType[]>) => {
      state.latestMovies = action.payload
    },
    clearSortedArrays: (state, action: PayloadAction<FilmType[]>) => {
      state.latestMovies = initialState.latestMovies
      state.mostScored = initialState.mostScored
    },
  }
})

// Action creators are generated for each case reducer function
export const { sortByRelease, sortMovieByRatings, clearSortedArrays } = moviesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.movies

export default moviesSlice.reducer