import React, { useState } from 'react';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import SeatSelection from './components/SeatSelection/SeatSelection';
import PaymentGateway from './components/PaymentGateway/PaymentGateway';
import Confirmation from './components/Confirmation/Confirmation';
import Ticket from './components/Ticket/Ticket';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    setSelectedSeats([]);
  };

  const handleSeatsSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handlePaymentProceed = (totalPrice) => {
    const details = {
      movie: selectedMovie,
      showtime: selectedShowtime,
      seats: selectedSeats,
      totalPrice,
    };
    setBookingDetails(details);
  };

  const handlePaymentSuccess = () => {
    // handle post-payment actions
  };

  return (
    <div>
      {!selectedMovie && <MovieList onMovieSelect={handleMovieSelect} />}
      {selectedMovie && !selectedShowtime && (
        <MovieDetails movie={selectedMovie} onShowtimeSelect={handleShowtimeSelect} />
      )}
      {selectedShowtime && selectedSeats.length === 0 && (
        <SeatSelection onSeatsSelect={handleSeatsSelect} />
      )}
      {selectedSeats.length > 0 && !bookingDetails && (
        <Ticket
          movie={selectedMovie}
          showtime={selectedShowtime}
          seats={selectedSeats}
          onPaymentProceed={handlePaymentProceed}
        />
      )}
      {bookingDetails && (
        <PaymentGateway amount={bookingDetails.totalPrice} onPaymentSuccess={handlePaymentSuccess} />
      )}
      {bookingDetails && <Confirmation bookingDetails={bookingDetails} />}
    </div>
  );
};

export default App;
