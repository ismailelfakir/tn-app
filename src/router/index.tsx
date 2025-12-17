import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { RoleSelectPage } from '../pages/RoleSelectPage';
import { GamePage } from '../pages/GamePage';
import { ResultPage } from '../pages/ResultPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/roles',
    element: <RoleSelectPage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    path: '/results',
    element: <ResultPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
