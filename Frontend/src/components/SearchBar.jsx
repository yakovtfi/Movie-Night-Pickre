const SearchBar = ({ value, onChange }) => {
  return (
    <label className="search-bar">
      <span className="sr-only">Search movies</span>
      <input
        type="search"
        placeholder="Search by title or genre"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
