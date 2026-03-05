import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Layout from './components/Layout.jsx'
import HomePage from './pages/Home.jsx'
import MovieDetailsPage from './pages/MovieDetails.jsx'
import SeatsPage from './pages/Seats.jsx'
import { useMovieStore } from './store/useMovieStore.js'

function App() {
  const loadSeatSelectionsFromStorage = useMovieStore(
    (state) => state.loadSeatSelectionsFromStorage,
  )

  useEffect(() => {
    loadSeatSelectionsFromStorage()
  }, [loadSeatSelectionsFromStorage])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/movies/:movieId/seats" element={<SeatsPage />} />
      </Route>
    </Routes>
  )
}

export default App
