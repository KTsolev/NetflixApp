import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { FilmType, RecordType } from '../../types/DataTypes'

// Define a type for the slice state
export interface MoviewState {
  movies: RecordType[],
  extendedMovies: FilmType[]

}

// Define the initial state using that type
const initialState: MoviewState = {
  movies: [],
  extendedMovies: []
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    loadMovies: (state, action: PayloadAction<RecordType[]>) => {
      state.movies = [...state.movies, ...action.payload]
    },
    emptyMovies: (state, action: PayloadAction<RecordType[]>) => {
      state.movies = initialState.movies
    },
    loadExtendedMovies: (state, action: PayloadAction<FilmType[]>) => {
      state.extendedMovies = [...state.extendedMovies, ...action.payload]
    },
  }
})

// Action creators are generated for each case reducer function
export const { loadMovies, emptyMovies } = moviesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.movies

export default moviesSlice.reducer