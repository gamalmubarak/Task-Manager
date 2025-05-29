import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Board from './pages/Board';
import Login from './pages/Login';

const router = createBrowserRouter([
  { path: '/', element: <Board /> },
  { path: '/login', element: <Login /> },
  // Add more routes as needed
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}