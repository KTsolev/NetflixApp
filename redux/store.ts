import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './reducers/moviesReducer'
import sortedMoviesReducer from './reducers/filteredMoviesReducer'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    sortedMovies: sortedMoviesReducer
  }
})

// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {counter: CounterState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store