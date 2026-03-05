import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import SeatGrid from '../components/SeatGrid.jsx'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { useMovieStore } from '../store/useMovieStore.js'
import { fetchMovies } from '../api/movies.js'

const SeatsPage = () => {
  const { movieId } = useParams()
  const {
    movies,
    isLoading,
    error,
    seatSelections,
    setMovies,
    setLoading,
    setError,
    selectSeat,
  } = useMovieStore()

  useEffect(() => {
    const ensureMovies = async () => {
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

    ensureMovies()
  }, [movies.length, setMovies, setLoading, setError])

  const movie = useMemo(
    () => movies.find((item) => String(item.id) === String(movieId)),
    [movies, movieId],
  )

  const seats = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])
  const selectedSeat = seatSelections[movieId]

  if (isLoading) {
    return <Loader message="Loading seats…" />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!movie) {
    return (
      <div className="state-card">
        <p>We couldn&apos;t find that movie.</p>
      </div>
    )
  }

  return (
    <section className="page">
      <Link to={`/movies/${movie.id}`} className="text-link">
         Back to details
      </Link>

      <div className="seat-header">
        <div>
          <h2>Choose your seat</h2>
          <p className="page-subtitle">
            You&apos;re picking a seat for <strong>{movie.title}</strong>.
          </p>
        </div>
        <div className="seat-summary">
          <span>Your seat for this movie:</span>
          <strong>{selectedSeat ? `#${selectedSeat}` : 'Not selected'}</strong>
        </div>
      </div>

      <SeatGrid
        seats={seats}
        selectedSeat={selectedSeat}
        onSelect={(seatNumber) => selectSeat(movieId, seatNumber)}
      />
    </section>
  )
}

export default SeatsPage
