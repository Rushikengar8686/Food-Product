import React from 'react';

const MovieDetails = ({ movie, onShowtimeSelect }) => (
  <div className="container mt-5">
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{movie.title}</h2>
        <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
        <h3 className="card-subtitle mb-3">Showtimes</h3>
        <ul className="list-group">
          {movie.showtimes.map((time) => (
            <li
              key={time}
              className="list-group-item"
              onClick={() => onShowtimeSelect(time)}
              style={{ cursor: 'pointer' }}
            >
              {time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default MovieDetails;
