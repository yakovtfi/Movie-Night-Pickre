import { useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMovieStore } from '../store/useMovieStore.js'
import { fetchMovies } from '../api/movies.js'
import Loader from '../components/Loader.jsx'
import ErrorState from '../components/ErrorState.jsx'

const MovieDetailsPage = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const {
    movies,
    isLoading,
    error,
    setMovies,
    setLoading,
    setError,
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

  if (isLoading) {
    return <Loader message="Loading movie details…" />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!movie) {
    return (
      <div className="state-card">
        <p>We couldn&apos;t find that movie.</p>
        <button type="button" className="primary" onClick={() => navigate('/')}
        >
          Back to movies
        </button>
      </div>
    )
  }

  return (
    <section className="page">
      <Link to="/" className="text-link">
       Back to list
      </Link>

      <div className="details">
        <div className="details-poster">
          <img src={movie.posterUrl} alt={movie.title} />
        </div>
        <div className="details-content">
          <div>
            <p className="eyebrow">{movie.genres.join(' · ')}</p>
            <h2>{movie.title}</h2>
            <p className="movie-meta">
              {movie.year} · {movie.runtime} min · {movie.rating}
            </p>
          </div>
          <p className="details-overview">{movie.overview}</p>
          <button
            type="button"
            className="primary"
            onClick={() => navigate(`/movies/${movie.id}/seats`)}
          >
            Choose seat
          </button>
        </div>
      </div>
    </section>
  )
}

export default MovieDetailsPage
