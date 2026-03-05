import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <div className="movie-poster">
        <img src={movie.posterUrl} alt={movie.title} loading = "lazy" />
      </div>
      <div className="movie-card-body">
        <div>
          <h3>{movie.title}</h3>
          <p className="movie-meta">{movie.year} · {movie.runtime} min</p>
        </div>
        <span className="movie-rating">{movie.rating}</span>
      </div>
    </Link>
  )
}

export default MovieCard
