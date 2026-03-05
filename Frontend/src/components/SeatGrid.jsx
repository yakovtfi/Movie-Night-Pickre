const SeatGrid = ({ seats, selectedSeat, unavailableSeats = [], onSelect }) => {
  return (
    <div className="seat-grid">
      {seats.map((seat) => {
        const isSelected = seat === selectedSeat
        const isUnavailable = unavailableSeats.includes(seat)
        return (
          <button
            key={seat}
            type="button"
            className={`seat ${isSelected ? 'selected' : ''} ${isUnavailable ? 'taken' : ''}`}
            onClick={() => onSelect(seat)}
            disabled={isUnavailable}
          >
            {seat}
          </button>
        )
      })}
    </div>
  )
}

export default SeatGrid
