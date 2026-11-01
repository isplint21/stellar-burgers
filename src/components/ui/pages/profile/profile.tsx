import { ProfileMenu } from '@components';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';

import type { ProfileUIProps } from './type';

import styles from './profile.module.css';

export const ProfileUI = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
  savedField,
  emailError,
}: ProfileUIProps): React.JSX.Element => (
  <main className={styles.container}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <form className={`mt-30 ${styles.form}`} onSubmit={handleSubmit} noValidate>
      <div className="pb-6">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleInputChange}
          value={formValue.name}
          name={'name'}
          error={savedField === 'name'}
          errorText={''}
          size={'default'}
          icon={'EditIcon'}
        />
        {savedField === 'name' && (
          <p
            className="text text_type_main-default text_color_error mt-2"
            style={{ textAlign: 'center' }}
          >
            Изменения сохранены!
          </p>
        )}
      </div>

      <div className="pb-6">
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleInputChange}
          value={formValue.email}
          name={'email'}
          error={emailError || savedField === 'email'}
          errorText={''}
          size={'default'}
          icon={'EditIcon'}
        />
        {emailError ? (
          <p
            className="text text_type_main-default text_color_error mt-2"
            style={{ textAlign: 'center' }}
          >
            Ой, произошла ошибка!
          </p>
        ) : savedField === 'email' ? (
          <p
            className="text text_type_main-default text_color_error mt-2"
            style={{ textAlign: 'center' }}
          >
            Изменения сохранены!
          </p>
        ) : null}
      </div>
      <div className="pb-6">
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={handleInputChange}
          value={formValue.password}
          name={'password'}
          error={savedField === 'password'}
          errorText={''}
          size={'default'}
          icon={'EditIcon'}
        />
        {savedField === 'password' && (
          <p
            className="text text_type_main-default text_color_error mt-2"
            style={{ textAlign: 'center' }}
          >
            Изменения сохранены!
          </p>
        )}
      </div>

      {isFormChanged && (
        <div>
          <Button
            type="secondary"
            htmlType="button"
            size="medium"
            onClick={handleCancel}
          >
            Отменить
          </Button>
          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}

      {updateUserError && (
        <p className={`${styles.error} pt-5 text text_type_main-default`}>
          {updateUserError}
        </p>
      )}
    </form>
  </main>
);
