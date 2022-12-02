import { useLocation } from 'react-router-dom';

const Movie = () => {
  const location = useLocation();
  const { movie } = location.state;
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
        <hr />
        <p>{movie.description}</p>
      </div>
    </>
  );
};

export default Movie;
