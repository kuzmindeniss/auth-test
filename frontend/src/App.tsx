import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useAuthQuery } from './store/api/authApi';
import { useAuth } from './hooks/useAuth';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const App = () => {
  useAuthQuery();
  const auth = useAuth();

  return <RouterProvider router={router} />;
};
