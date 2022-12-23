import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Movies from './components/Movies';
import Movie from './components/Movie';
import ErrorPage from './components/ErrorPage';
import reportWebVitals from './reportWebVitals';
import Genres from './components/Genres';
import ManageCatalogue from './components/ManageCatalogue';
import GraphQL from './components/GraphQL';
import EditMovie from './components/EditMovie';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies', element: <Movies /> },
      { path: '/movies/:id', element: <Movie /> },
      { path: '/genres', element: <Genres /> },
      // ここの０はパラメータではない
      { path: '/admin/movies/0', element: <EditMovie /> },
      { path: '/admin/movies/:id', element: <EditMovie /> },
      { path: '/manage-catalogue', element: <ManageCatalogue /> },
      { path: '/graphql', element: <GraphQL /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
