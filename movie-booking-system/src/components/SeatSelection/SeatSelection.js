import React, { useState } from 'react';

const SeatSelection = ({ onSeatsSelect, bookedSeats = [] }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seats = Array.from({ length: 50 }, (_, index) => index + 1); // 50 seats

  const toggleSeat = (seat) => {
    if (!bookedSeats.includes(seat)) {
      setSelectedSeats((prev) =>
        prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Select Seats</h2>
      <div className="seating-chart d-flex flex-wrap justify-content-center">
        {seats.map((seat) => (
          <button
            key={seat}
            className={`btn m-1 ${bookedSeats.includes(seat) ? 'btn-secondary' : selectedSeats.includes(seat) ? 'btn-success' : 'btn-outline-primary'}`}
            onClick={() => toggleSeat(seat)}
            disabled={bookedSeats.includes(seat)}
            style={{ width: '50px', height: '50px' }}
          >
            {seat}
          </button>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => onSeatsSelect(selectedSeats)}>Confirm Seats</button>
      </div>
    </div>
  );
};

export default SeatSelection;
