import { useState, FormEvent, ChangeEvent } from "react";

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
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''  
  });
  const [errorMessage, setErrorMessage] = useState('');

 const [loginMutation] = useMutation(LOGIN_USER);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await loginMutation({ variables: loginData });
      Auth.login(data.login.token);
    } catch (err) {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Login;
