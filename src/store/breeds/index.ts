import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BreedImageType, BreedType } from '$types/breeds';

export const breedSliceName = 'breeds';

interface BreedsReducerStateType {
  list: BreedType[];
  page: number;
  favorites: BreedImageType[];
}

const initialState: BreedsReducerStateType = {
  list: [],
  page: 0,
  favorites: [],
};

export const counterSlice = createSlice({
  name: breedSliceName,
  initialState,
  reducers: {
    addBreeds: (state, action: PayloadAction<BreedType[]>) => {
      state.list.push(...action.payload);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    requestNewBreedImage: (_, action: PayloadAction<string>) => {},
    updateBreedImage: (
      state,
      action: PayloadAction<{ idToUpdate: string; newImage: BreedImageType }>,
    ) => {
      const indexOfBreed = state.list.findIndex(
        (breed) => breed.id === action.payload.idToUpdate,
      );

      state.list[indexOfBreed].image = action.payload.newImage;
    },
    incrementPage: (state) => {
      state.page++;
    },
    requestBreeds: () => {},
    addToFavorites: (state, action: PayloadAction<BreedImageType>) => {
      const alreadyInFavorites = Boolean(
        state.favorites.find((image) => image.id === action.payload.id),
      );

      if (!alreadyInFavorites) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const indexOfRemoved = state.favorites.findIndex(
        (image) => image.id === action.payload,
      );

      if (indexOfRemoved > -1) {
        state.favorites.splice(indexOfRemoved, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addBreeds,
  incrementPage,
  requestBreeds,
  addToFavorites,
  updateBreedImage,
  removeFromFavorites,
  requestNewBreedImage,
} = counterSlice.actions;
export default counterSlice.reducer;
