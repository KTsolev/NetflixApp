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

export const sortedMoviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    loadMovies: (state, action: PayloadAction<RecordType[]>) => {
      state.movies = [...new Set([...state.movies, ...action.payload])]
    },
    loadExtendedMovies: (state, action: PayloadAction<FilmType[]>) => {
      state.extendedMovies = [...new Set([...state.extendedMovies, ...action.payload])]
    },
    clearMovieArrays: (state, action: PayloadAction<FilmType[]>) => {
      state.extendedMovies = initialState.extendedMovies,
        state.movies = initialState.movies
    },
  }
})

// Action creators are generated for each case reducer function
export const { loadMovies, loadExtendedMovies, clearMovieArrays } = sortedMoviesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.movies

export default sortedMoviesSlice.reducer