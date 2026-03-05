const DEFAULT_API_BASE = 'http://localhost:3000'

export const fetchMovies = async () => {
  const response = await fetch(`${DEFAULT_API_BASE}/api/movies`)

  if (!response.ok) {
    throw new Error('Unable to load movies right now.')
  }

  return response.json()
}

export const fetchSeats = async (movieId) => {
  const response = await fetch(`${DEFAULT_API_BASE}/api/seats/${movieId}`)

  if (!response.ok) {
    throw new Error('Unable to load seats right now.')
  }

  return response.json()
}