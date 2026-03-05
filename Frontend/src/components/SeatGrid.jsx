const SeatGrid = ({ seats, selectedSeat, onSelect }) => {
  return (
    <div className="seat-grid">
      {seats.map((seat) => {
        const isSelected = seat === selectedSeat
        return (
          <button
            key={seat}
            type="button"
            className={`seat ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(seat)}
          >
            {seat}
          </button>
        )
      })}
    </div>
  )
}

export default SeatGrid
