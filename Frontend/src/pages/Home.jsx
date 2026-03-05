import { useEffect, useMemo } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { useMovieStore } from '../store/useMovieStore.js'
import { fetchMovies } from '../api/movies.js'
import useDebounce from '../hooks/useDebounce.js'
import { filterMovies } from '../utils/filterMovies.js'

const HomePage = () => {
  const {
    movies,
    isLoading,
    error,
    searchQuery,
    setMovies,
    setLoading,
    setError,
    setSearchQuery,
  } = useMovieStore()

  useEffect(() => {
    const loadMovies = async () => {
      if (movies.length > 0) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await fetchMovies()
        setMovies(data)
      } catch (err) {
        setError(err.message || 'Unable to fetch movies.')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [movies.length, setMovies, setLoading, setError])

  const debouncedQuery = useDebounce(searchQuery, 300)

  const filteredMovies = useMemo(
    () => filterMovies(movies, debouncedQuery),
    [movies, debouncedQuery],
  )

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Browse tonight&apos;s lineup</h2>
          <p className="page-subtitle">
            Search by title or genre to find the right vibe for your group.
          </p>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {isLoading && <Loader />}
      {error && <ErrorState message={error} />}

      {!isLoading && !error && (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {filteredMovies.length === 0 && (
            <div className="state-card">
              <p>No movies matched your search yet.</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default HomePage
