import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import Input from './form/Input';
import Select from './form/Select';
import TextArea from './form/TextArea';
import Checkbox from './form/Checkbox';

const EditMovie = () => {
  console.log('EditMovie');
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext();
  console.log(jwtToken);

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);

  const mpaaOptions = [
    {
      id: 'G',
      value: 'G',
    },
    {
      id: 'PG',
      value: 'PG',
    },
    {
      id: 'PG13',
      value: 'PG13',
    },
    {
      id: 'R',
      value: 'R',
    },
    {
      id: 'NC17',
      value: 'NC17',
    },
    {
      id: '18A',
      value: '18A',
    },
  ];
  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const [movie, setMovie] = useState({
    id: 0,
    title: '',
    release_date: '',
    runtime: '',
    mpaa_rating: '',
    description: '',
    genres: [],
    // creata array with 13 empty elements and replace all the elements with false
    genres_array: [Array(13).fill(false)],
  });

  //get id from the URL
  let { id } = useParams();
  console.log('let=id');
  console.log(id);
  if (id === undefined) {
    id = 0;
  }

  useEffect(() => {
    console.log('====id');
    console.log(id);
    if (jwtToken === '') {
      console.log('nojwtToken');
      navigate('/login');
      return;
    }
    if (id === 0) {
      console.log('id==0');
      // adding a movie
      setMovie({
        id: 0,
        title: '',
        release_date: '',
        runtime: '',
        mpaa_rating: '',
        description: '',
        genres: [],
        // creata array with 13 empty elements and replace all the elements with false
        genres_array: [Array(13).fill(false)],
      });
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'GET',
        headers: headers,
      };
      fetch(`/genres`, requestOptions)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          const checks = [];
          data.forEach((g) => {
            checks.push({ id: g.id, checked: false, genre: g.genre });
          });

          console.log(checks);
          // setState((<previous state>) =>{...<previous state>, <key>: <new value>})
          setMovie((m) => ({
            ...movie,
            genres: checks,
            genres_array: [],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // editing an existing movie
    }
  }, [id, jwtToken, navigate]);

  const handleSubmit = (event) => {
    console.log('hundle submit');
    event.preventDefault();
    let errors = [];
    let required = [
      { field: movie.title, mame: 'title' },
      { field: movie.release_date, name: 'release_date' },
      { field: movie.runtime, name: 'runtime' },
      { field: movie.description, name: 'description' },
      { field: movie.mpaa_rating, name: 'mpaa_rating' },
    ];

    required.forEach(function (obj) {
      if (obj.field === '') {
        errors.push(obj.name);
      }
    });

    if (movie.genres_array.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'You must choose at least one genre!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      errors.push('genres');
    }

    setErrors(errors);

    if (errors.length > 0) {
      return false;
    }
  };

  const handleChange = () => (event) => {
    console.log(event.target);
    let name = event.target.name;
    let value = event.target.value;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleCheck = (event, position) => {
    console.log('handleCheck called');
    console.log('value in handle check', event.target.value);
    console.log('checked is', event.target.chcked);
    console.log('position is', position);
    let tmpArr = movie.genres;
    tmpArr[position].checked = !tmpArr[position].checked;

    let tmpIDs = movie.genres_array;
    if (!event.target.checked) {
      tmpIDs.splice(tmpIDs.indexOf(event.target.value));
    } else {
      // 10は進数(called radix or base)
      tmpIDs.push(parseInt(event.target.value, 10));
    }

    setMovie({
      ...movie,
      genres_array: tmpIDs,
    });
  };

  return (
    <>
      <div className="text-center">
        <h2>Add/Edit Movie</h2>
      </div>
      <hr />
      {/* JSON.stringify(<value>, <parser>, <space number used for the indentation>) */}
      <pre>{JSON.stringify(movie, null, 2)}</pre>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={movie.id} id="id"></input>
        <Input
          title={'Title'}
          className={'form-control'}
          type={'text'}
          name={'title'}
          value={movie.title}
          // onChange={()=> handleChange()}と
          // const handleChange = (event) => {}
          // の組み合わせでもいけるかも
          onChange={handleChange('title')}
          errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
          errorMsg={'please enter a title'}
        />
        <Input
          title={'Release Date'}
          className={'form-control'}
          type={'text'}
          name={'release_date'}
          value={movie.release_date}
          // onChange={()=> handleChange()}と
          // const handleChange = (event) => {}
          // の組み合わせでもいけるかも
          onChange={handleChange('release_date')}
          errorDiv={hasError('release_date') ? 'text-danger' : 'd-none'}
          errorMsg={'please enter a release date'}
        />
        <Input
          title={'Runtime'}
          className={'form-control'}
          type={'text'}
          name={'runtime'}
          value={movie.runtime}
          // onChange={()=> handleChange()}と
          // const handleChange = (event) => {}
          // の組み合わせでもいけるかも
          onChange={handleChange('runtime')}
          errorDiv={hasError('runtime') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter a runtime'}
        />
        <Select
          title={'MPAA Rating'}
          name={'mpaa_rating'}
          options={mpaaOptions}
          onChange={handleChange('mpaa_rating')}
          placeholder={'Choose...'}
          errorDiv={hasError('mpaa_rating') ? 'text-danger' : 'd-none'}
          errorMsg={'Please choose'}
        />
        <TextArea
          title={'Description'}
          name={'description'}
          value={movie.description}
          row={'3'}
          onChange={handleChange('description')}
          errorDiv={hasError('description') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter a description'}
        />
        <hr />
        <h3>Genre</h3>

        {movie.genres && movie.genres.length > 1 && (
          <>
            {Array.from(movie.genres).map((g, index) => (
              <Checkbox
                title={g.genre}
                name={'genre'}
                key={index}
                id={'genre-' + index}
                onChange={(event) => handleCheck(event, index)}
                value={g.id}
                checked={movie.genres[index].checked}
              />
            ))}
          </>
        )}
        <hr />
        <button className="btn btn-primary">Save</button>
      </form>
    </>
  );
};

export default EditMovie;
