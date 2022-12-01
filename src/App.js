import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
  const [jwtToken, setJwtToken] = useState('');
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
            <Link to="/login">
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
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
