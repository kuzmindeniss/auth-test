import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/useAuth';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return children;
}
