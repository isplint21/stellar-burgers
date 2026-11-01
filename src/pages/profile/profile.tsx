import { ProfileUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';

import { selectUser, updateUser } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile = (): React.JSX.Element => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  const [savedField, setSavedField] = useState<'name' | 'email' | 'password' | null>(
    null
  );
  const [emailError, setEmailError] = useState<boolean>(false);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name ?? '',
      email: user?.email ?? '',
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    setEmailError(false);
    if (!formValue.email.includes('@')) {
      setEmailError(true);
      return;
    }

    const dataToUpdate: { name?: string; email?: string; password?: string } = {};
    if (formValue.name !== user?.name) dataToUpdate.name = formValue.name;
    if (formValue.email !== user?.email) dataToUpdate.email = formValue.email;
    if (formValue.password) dataToUpdate.password = formValue.password;

    dispatch(updateUser(dataToUpdate))
      .unwrap()
      .then(() => {
        setFormValue((prev) => ({ ...prev, password: '' }));
        if (dataToUpdate.name) setSavedField('name');
        else if (dataToUpdate.email) setSavedField('email');
        else if (dataToUpdate.password) setSavedField('password');
      })
      .catch(() => {
        setEmailError(true);
      });
  };

  const handleCancel = (e: SyntheticEvent): void => {
    e.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
    setSavedField(null);
    setEmailError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSavedField(null);
    setEmailError(false);
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged || savedField !== null || emailError}
      savedField={savedField}
      emailError={emailError}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
