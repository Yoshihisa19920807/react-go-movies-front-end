import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let movieList = [
      {
        id: 1,
        title: '500 days of Summer',
        release_date: '2010-01-09',
        runtime: 95,
        mpaa_rating: 'PG-13',
        description: 'Romance which even men can enjoy.',
      },
      {
        id: 2,
        title: 'Yes Man',
        release_date: '2009-03-20',
        runtime: 104,
        mpaa_rating: 'PG-13',
        description: 'Comedy that will encourage you to take a new step.',
      },
    ];
    console.log('movieList');
    console.log(movieList);
    setMovies(movieList);
  }, []);
  console.log('movies');
  console.log(movies);
  console.log(movies.length);
  return (
    <>
      <div className="text-center">
        <h2>Movies</h2>
        <hr />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Release Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <Link to={`/movies/${movie.id}`} state={{ movie: movie }}>
                    {movie.title}
                  </Link>
                </td>
                <td>{movie.release_date}</td>
                <td>{movie.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Movies;
