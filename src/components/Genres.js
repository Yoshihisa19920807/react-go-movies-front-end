import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useEffect');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    fetch(`/genres`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log('///data');
          console.log(data);
          setError(data.message);
        } else {
          setGenres(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // console.log('genres');
  // console.log(genres);
  if (error !== null) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <div className="list-group">
          {genres.map((g) => (
            <Link
              key={g.id}
              className="list-group-item list-group-item-action"
              to={`/genres/${g.id}`}
              state={{
                genreName: g.genre,
              }}
            >
              {g.genre}
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default Genres;
