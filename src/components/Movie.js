import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Movie = () => {
  // const location = useLocation();
  // const { movie } = location.state;
  const [movie, setMovie] = useState({});
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${process.env.REACT_APP_BACKEND}/movies/${id}`, requestOptions)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (movie.genres) {
    // Object.values() returns only the values of an object as an array
    movie.genres = Object.values(movie.genres);
  } else {
    movie.genres = [];
  }
  console.log(movie);

  return (
    <>
      <div>
        <h2>Title: {movie.title}</h2>
        <small>
          <em>
            {movie.release_date}, {movie.runtime} minutes, rating:{' '}
            {movie.mpaa_rating}
          </em>
        </small>
        <br />
        {movie.genres.map((g) => (
          <span key={g.genre} className="badge bg-secondary me-2">
            {g.genre}
          </span>
        ))}
        <hr />

        {movie.image != null && (
          <div className="mb-3">
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.image}`}
              alt="poster"
            />
          </div>
        )}
        <p>{movie.description}</p>
      </div>
    </>
  );
};

export default Movie;
