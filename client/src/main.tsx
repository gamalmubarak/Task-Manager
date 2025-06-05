import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Board from './pages/Board';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EditTicket from './pages/EditTicket';
import CreateTicket from './pages/CreateTicket';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Board /> },
      { path: 'edit', element: <ProtectedRoute><EditTicket /></ProtectedRoute> },
      { path: 'create', element: <ProtectedRoute><CreateTicket /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> }, 
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}