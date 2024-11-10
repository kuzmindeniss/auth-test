import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../features/Login';
import { PageLayout } from '../PageLayout';
import { Registration } from '../features/Registration';
import { Edit } from '../features/Edit';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        )
      },
      {
        path: '/registration',
        element: <Registration />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])
