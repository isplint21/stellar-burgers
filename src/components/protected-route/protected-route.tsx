import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuth } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

import type { ReactNode } from 'react';

export const ProtectedRoute = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
