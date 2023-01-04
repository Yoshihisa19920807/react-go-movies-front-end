import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './form/Input';

const GraphQL = () => {
  //set up stateful variables
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fullList, setFullList] = useState([]);

  // perform a search
  const performSearch = () => {
    console.log('searchTerm');
    console.log(searchTerm);
    const payload = `
    {
      search(titleContains: "${searchTerm}") {
        id
        title
        runtime
        release_date
        mpaa_rating
      }
    }`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/graphql');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: payload,
    };
    fetch(`${process.env.REACT_APP_BACKEND}/graph`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        let theList = Object.values(json.data.search);
        setMovies(theList);
        console.log('movies____');
        console.log(movies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();

    let value = event.target.value;
    setSearchTerm(value);
  };

  // useEffect
  useEffect(() => {
    console.log('useEffect');
    const payload = `
    {
      list {
        id
        title
        runtime
        release_date
        mpaa_rating
      }
    }`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/graphql');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: payload,
    };

    fetch(`${process.env.REACT_APP_BACKEND}/graph`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        let theList = Object.values(json.data.list);
        setMovies(theList);
        setFullList(theList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log('useEffect_searchTerm');
    console.log(searchTerm.length);
    performSearch();
  }, [searchTerm]);

  return (
    <>
      <div className="text-center">
        <h2>GraphQL</h2>
        <form onSubmit={handleChange}>
          <Input
            title={'Search'}
            type={'search'}
            name={'search'}
            className={'form-control'}
            value={searchTerm}
            onChange={handleChange}
          />
        </form>
        {movies ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Release Date</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id}>
                  <td>
                    <Link to={`/movies/${m.id}`}>{m.title}</Link>
                  </td>
                  <td>{new Date(m.release_date).toLocaleDateString()}</td>
                  <td>{m.mpaa_rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No movie!</p>
        )}
      </div>
    </>
  );
};

export default GraphQL;
