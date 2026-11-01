import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {
  selectIsAuth,
  registerUser,
  selectUserError,
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuth = useSelector(selectIsAuth);
  const error = useSelector(selectUserError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .then(() => navigate('/'));
  };

  return (
    <RegisterUI
      errorText={error ?? ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
