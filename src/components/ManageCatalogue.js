import { useEffect, useState } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';

const ManageCatalogue = () => {
  const [movies, setMovies] = useState([]);

  const { jwtToken } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken === '') {
      navigate('/login');
      return;
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // it sends Authorization to the backend's GetTokenFromHeaderAndVerify
    headers.append('Authorization', 'Bearer ' + jwtToken);
    console.log('catalogue_headers');
    console.log(headers);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    fetch(`/admin/movies`, requestOptions)
      .then((response) => {
        console.log('then_response');
        return response.json();
      })
      .then((data) => {
        console.log('then_data');
        return setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jwtToken, navigate]);

  return (
    <>
      <div className="text-center">
        <h2>Movie Catalogue</h2>
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
                  <Link to={`/admin/movies/${movie.id}`}>{movie.title}</Link>
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

export default ManageCatalogue;
