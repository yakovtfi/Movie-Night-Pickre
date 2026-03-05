import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SeatGrid from '../components/SeatGrid.jsx'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { useMovieStore } from '../store/useMovieStore.js'
import { fetchMovies, fetchSeats } from '../api/movies.js'

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
  const [seatMap, setSeatMap] = useState([])
  const [seatError, setSeatError] = useState(null)
  const [seatsLoading, setSeatsLoading] = useState(null)

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

  useEffect(() => {
    const loadSeats = async () => {
      if (!movieId) {
        return
      }

      setSeatsLoading(true)
      setSeatError(null)

      try {
        const data = await fetchSeats(movieId)
        setSeatMap(Array.isArray(data) ? data : [])
      } catch (err) {
        setSeatError(err.message || 'Unable to load seats right now.')
        setSeatMap([])
      } finally {
        setSeatsLoading(false)
      }
    }

    loadSeats()
  }, [movieId])

  const movie = useMemo(
    () => movies.find((item) => String(item.id) === String(movieId)),
    [movies, movieId],
  )

  const seats = useMemo(() => {
    if (seatMap.length > 0) {
      return seatMap.map((seat) => seat.id + 1)
    }

    return Array.from({ length: 30 }, (_, i) => i + 1)
  }, [seatMap])
  const unavailableSeats = useMemo(() => {
    if (seatMap.length === 0) {
      return []
    }

    return seatMap.filter((seat) => seat.isTaken).map((seat) => seat.id + 1)
  }, [seatMap])
  const selectedSeat = seatSelections[movieId]
  

  if (isLoading || seatsLoading) {
    return <Loader message="Loading seats…" />
  }

  if (error || seatError) {
    return <ErrorState message={error || seatError} />
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
      <div className='conteiner'>
      <SeatGrid
        seats={seats}
        selectedSeat={selectedSeat}
        unavailableSeats={unavailableSeats}
        onSelect={(seatNumber) => selectSeat(movieId, seatNumber)}
      />
      </div>
    </section>
  )
}

export default SeatsPage
