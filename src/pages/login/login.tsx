import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

import {
  loginUser,
  selectUserError,
  clearError,
  selectIsAuth,
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = useSelector(selectIsAuth);
  const error = useSelector(selectUserError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    void dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        const from =
          (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';
        void navigate(from, { replace: true });
      })
      .catch(() => undefined);
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <LoginUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
