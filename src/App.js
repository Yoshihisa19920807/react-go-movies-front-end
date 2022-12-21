import { useEffect, useState, useCallback } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Alert from './components/Alert';

function App() {
  const [jwtToken, setJwtToken] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClassName, setAlertClassName] = useState('d-none');

  // const [ticking, setTicking] = useState(false);
  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = () => {
    // setJwtToken('');
    // setAlertMessage('Logot Success');
    // setAlertClassName('alert-success');
    // setTimeout(() => {
    //   setAlertClassName('d-none');
    //   setAlertMessage('');
    // }, 5000);

    const requestOptions = {
      method: 'GET',
      credentials: 'include',
    };
    fetch(`/logout`, requestOptions)
      .catch((error) => {
        console.log('error logging out', error);
      })
      .finally(() => {
        setJwtToken('');
        toggleRefresh(false);
      });
    navigate('/login');
  };

  const toggleRefresh = useCallback(
    (status) => {
      console.log('clicked');
      // tick tock... sound of a clock
      if (status) {
        console.log('turning on ticking');
        console.log(tickInterval);
        let i = setInterval(() => {
          console.log('this will run 10 minutes');
          const requestOptions = {
            method: 'GET',
            credentials: 'include',
          };
          fetch(`/refresh`, requestOptions)
            .then((response) => {
              console.log('response');
              console.log(response);
              console.log(response.json());
              return response.json();
            })
            .then((data) => {
              if (data.access_token) {
                setJwtToken(data.access_token);
              }
            })
            .catch((error) => {
              console.log('user is not logged in because : ' + error);
            });
        }, 600000);
        console.log(tickInterval);
        setTickInterval(i);
        console.log('setting tick interval to', i);
      } else {
        console.log('turning off ticking');
        console.log('turning off tickInterval', tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  useEffect(() => {
    if (jwtToken === '') {
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
      };
      fetch(`/refresh`, requestOptions)
        .then((response) => {
          console.log(response);
          console.log(response.json());
          return response.json();
        })
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch((error) => {
          console.log('user is not logged in because ' + error);
        });
    }
  }, [jwtToken, toggleRefresh]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go watch a movie</h1>
        </div>
        <div className="col text-end">
          {jwtToken === '' ? (
            <Link to="/login">
              <span className="badge bg-success">Login</span>
            </Link>
          ) : (
            <Link to="#!" onClick={logOut}>
              <span className="badge bg-danger">Logout</span>
            </Link>
          )}
        </div>
        <hr className="mb-3"></hr>
      </div>
      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">
                Home
              </Link>
              <Link
                to="/movies"
                className="list-group-item list-group-item-action"
              >
                Movies
              </Link>
              <Link
                to="/genres"
                className="list-group-item list-group-item-action"
              >
                Genres
              </Link>
              {jwtToken !== '' && (
                <>
                  <Link
                    to="/admin/movies/0"
                    className="list-group-item list-group-item-action"
                  >
                    Add Movies
                  </Link>
                  <Link
                    to="/manage-catalogue"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Catalogue
                  </Link>
                  <Link
                    to="/graphql"
                    className="list-group-item list-group-item-action"
                  >
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert message={alertMessage} className={alertClassName} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
              toggleRefresh,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
