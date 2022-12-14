import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Input from './form/input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setJwtToken } = useOutletContext();
  const { setAlertClassName } = useOutletContext();
  const { setAlertMessage } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('email/pass', email, password);
    if (email === 'admin@example.com') {
      setJwtToken('abc');
      setAlertClassName('alert-success');
      setAlertMessage('Login Succcess');
      setTimeout(() => {
        setAlertClassName('d-none');
        setAlertMessage('');
      }, 5000);
      navigate('/');
    } else {
      setAlertClassName('alert-danger');
      setAlertMessage('Invalid Credential');
      setTimeout(() => {
        setAlertClassName('d-none');
        setAlertMessage('');
      }, 5000);
    }
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
