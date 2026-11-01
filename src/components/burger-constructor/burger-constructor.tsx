import { selectIsAuth } from '@/services/slices/userSlice';
import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  selectConstructorBun,
  selectConstructorIngredients,
  clearConstructor,
} from '../../services/slices/constructorSlice';
import {
  createOrder,
  clearOrder,
  selectOrderLoading,
  selectOrderModalData,
} from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

import type { TConstructorIngredient } from '../../services/slices/constructorSlice';

export const BurgerConstructor = (): React.JSX.Element | null => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const constructorItems = { bun, ingredients };

  const orderRequest = useSelector(selectOrderLoading);
  const orderModalData = useSelector(selectOrderModalData);

  const isAuth = useSelector(selectIsAuth);

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      void navigate('/login');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id,
    ];

    void dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = (): void => {
    void dispatch(clearOrder());
    void dispatch(clearConstructor());
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [constructorItems.bun, constructorItems.ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
