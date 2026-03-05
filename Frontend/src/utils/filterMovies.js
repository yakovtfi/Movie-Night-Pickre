export const filterMovies = (movies, query) => {
  if (!query) {
    return movies
  }

  const normalizedQuery = query.toLowerCase()

  return movies.filter((movie) => {
    const inTitle = movie.title.toLowerCase().includes(normalizedQuery)
    const inGenres = movie.genres.some((genre) =>
      genre.toLowerCase().includes(normalizedQuery),
    )

    return inTitle || inGenres
  })
}
