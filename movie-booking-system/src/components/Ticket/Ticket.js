import React from 'react';

const Ticket = ({ movie, showtime, seats, onPaymentProceed }) => {
    const totalPrice = seats.length * 200;

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title text-center">Review Your Booking</h2>
                    <p className="card-text"><strong>Movie:</strong> {movie.title}</p>
                    <p className="card-text"><strong>Showtime:</strong> {showtime}</p>
                    <p className="card-text"><strong>Seats:</strong> {seats.join(', ')}</p>
                    <p className="card-text"><strong>Total Price:</strong> {totalPrice}</p>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={() => onPaymentProceed(totalPrice)}>Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
