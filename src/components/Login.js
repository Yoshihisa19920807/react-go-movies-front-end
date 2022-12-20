import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Input from './form/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setJwtToken } = useOutletContext();
  const { setAlertClassName } = useOutletContext();
  const { setAlertMessage } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('email/pass', email, password);
    // if (email === 'admin@example.com') {
    //   setJwtToken('abc');
    //   setAlertClassName('alert-success');
    //   setAlertMessage('Login Succcess');
    //   setTimeout(() => {
    //     setAlertClassName('d-none');
    //     setAlertMessage('');
    //   }, 5000);
    //   navigate('/');
    // } else {
    //   setAlertClassName('alert-danger');
    //   setAlertMessage('Invalid Credential');
    //   setTimeout(() => {
    //     setAlertClassName('d-none');
    //     setAlertMessage('');
    //   }, 5000);
    // }

    // build the request payload
    let payload = {
      email: email,
      password: password,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    };

    fetch(`/authenticate`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlertClassName('alert-danger');
          setAlertMessage(data.message);
        } else {
          setJwtToken(data.access_token);
          setAlertClassName('d-none');
          setAlertMessage('');
          navigate('/');
        }
      })
      .catch((error) => {
        setAlertClassName('alert-danger');
        setAlertMessage(error);
      });
  };
  return (
    <>
      <div className="col-md-6 offset-md-3">
        <h2>Login</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <Input
            title="Email Address"
            type="email"
            className="form-control"
            name="email"
            autoComplete="email-new"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            title="Password"
            type="password"
            className="form-control"
            name="password"
            autoComplete="password-new"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <hr />
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
      </div>
    </>
  );
};

export default Login;
