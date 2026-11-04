import type { TIngredient } from '@utils-types';
import type { RefObject, Ref } from 'react';

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: RefObject<HTMLHeadingElement | null>;
  ingredients: TIngredient[];
  ref?: Ref<HTMLUListElement>;
};
