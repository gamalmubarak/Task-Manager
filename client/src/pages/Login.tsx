import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';
import { useMutation, gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [loginMutation, { loading }] = useMutation(LOGIN_USER);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const { data } = await loginMutation({ variables: loginData });
      Auth.login(data.login.token);
      navigate('/'); // Redirect after login
    } catch (err) {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <label htmlFor="username">Username</label>
        <input 
          id='username'
          type='text'
          name='username'
          value={loginData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input 
          id='password'
          type='password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default Login;