import { create } from 'zustand'

const SEAT_STORAGE_KEY = 'movie-night-seat-selections'

const readSeatSelections = () => {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const stored = window.localStorage.getItem(SEAT_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Failed to read seat selections', error)
    return {}
  }
}

export const useMovieStore = create((set, get) => ({
  movies: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  seatSelections: {},
  setMovies: (movies) => set({ movies }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  selectSeat: (movieId, seatNumber) => {
    const updatedSelections = {
      ...get().seatSelections,
      [movieId]: seatNumber,
    }
    set({ seatSelections: updatedSelections })

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        SEAT_STORAGE_KEY,
        JSON.stringify(updatedSelections),
      )
    }
  },
  loadSeatSelectionsFromStorage: () => {
    const selections = readSeatSelections()
    set({ seatSelections: selections })
  },
}))
