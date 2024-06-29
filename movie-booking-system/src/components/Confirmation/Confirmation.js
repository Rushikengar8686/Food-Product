import React from 'react';

const Confirmation = ({ bookingDetails }) => (
  <div className="container mt-5">
    <div className="card">
      <div className="card-body">
        <h2 className="card-title text-center">Booking Confirmation</h2>
        <p className="card-text"><strong>Movie:</strong> {bookingDetails.movie.title}</p>
        <p className="card-text"><strong>Showtime:</strong> {bookingDetails.showtime}</p>
        <p className="card-text"><strong>Seats:</strong> {bookingDetails.seats.join(', ')}</p>
        <p className="card-text"><strong>Total Price:</strong> ${bookingDetails.totalPrice}</p>
        <p className="card-text text-center">Thank you for your purchase!</p>
      </div>
    </div>
  </div>
);

export default Confirmation;
