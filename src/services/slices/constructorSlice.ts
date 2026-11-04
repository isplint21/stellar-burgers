import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '../../utils/types';

export type TConstructorIngredient = TIngredient & { id: string };

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = crypto.randomUUID();
        return { payload: { ...ingredient, id } };
      },
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((item) => item.id !== action.payload);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      const [moved] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, moved);
    },
  },
});

export const { addIngredient, removeIngredient, clearConstructor, moveIngredient } =
  constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;

export const selectConstructorBun = (state: {
  burgerConstructor: TConstructorState;
}): TConstructorIngredient | null => state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: {
  burgerConstructor: TConstructorState;
}): TConstructorIngredient[] => state.burgerConstructor.ingredients;
