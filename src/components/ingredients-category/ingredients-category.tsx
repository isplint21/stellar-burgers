import { IngredientsCategoryUI } from '@ui';
import { useMemo } from 'react';

import {
  selectConstructorBun,
  selectConstructorIngredients,
} from '../../services/slices/constructorSlice';
import { useSelector } from '../../services/store';

import type { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = ({
  title,
  titleRef,
  ingredients,
  ref,
}: TIngredientsCategoryProps): React.JSX.Element => {
  const constructorBun = useSelector(selectConstructorBun);
  const constructorIngredients = useSelector(selectConstructorIngredients);
  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};
    if (constructorBun) counters[constructorBun._id] = 2;
    constructorIngredients.forEach((item) => {
      counters[item._id] = (counters[item._id] || 0) + 1;
    });
    return counters;
  }, [constructorBun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
};
