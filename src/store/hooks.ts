import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '.';
import { BreedType } from '$types/breeds';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCurrentBreed = (
  state: RootState,
  breedToFind: string,
): BreedType | undefined =>
  state.breeds.list.find((breed: BreedType) => breed.id === breedToFind);
