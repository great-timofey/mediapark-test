import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BreedType } from '$types/breeds';

export const breedSliceName = 'breeds';

interface BreedsReducerStateType {
  breeds: BreedType[];
}

const initialState: BreedsReducerStateType = {
  breeds: [],
};

export const counterSlice = createSlice({
  name: breedSliceName,
  initialState,
  reducers: {
    addBreeds: (state, action: PayloadAction<BreedType[]>) => {
      state.breeds.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBreeds } = counterSlice.actions;
export default counterSlice.reducer;
