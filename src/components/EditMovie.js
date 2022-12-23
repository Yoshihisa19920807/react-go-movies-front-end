import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Input from './form/Input';
import Select from './form/Select';
import TextArea from './form/TextArea';

const EditMovie = () => {
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext();

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
  });

  //get id from the URL
  let id = useParams();

  useEffect(() => {
    if (jwtToken === '') {
      navigate('/login');
      return;
    }
  }, [jwtToken, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      </form>
    </>
  );
};

export default EditMovie;
