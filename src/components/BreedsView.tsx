import React, { FC, useCallback, useEffect } from 'react';
import { BreedCard } from './BreedCard';
import { useAppDispatch, useAppSelector } from '$store/hooks';
import { addToFavorites, removeFromFavorites, requestBreeds } from '$store/breeds';
import { ActivityIndicator, Button, SafeAreaView, ScrollView } from 'react-native';
import { BreedImageType } from '$types/breeds';

export const BreedsView: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { breeds, common } = useAppSelector((state) => state);

  useEffect(() => {
    if (!breeds.list.length) {
      dispatch(requestBreeds());
    }
  }, [breeds.list, dispatch]);

  const handleFavoritePress = useCallback(
    (imageData: BreedImageType) => (isFavorite: boolean) => {
      dispatch(isFavorite ? removeFromFavorites(imageData) : addToFavorites(imageData));
    },
    [dispatch],
  );

  return (
    <SafeAreaView>
      <Button title="Fetch more" onPress={() => dispatch(requestBreeds())} />
      {common.loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          {breeds.list.map((breed) => (
            <BreedCard
              favorite={breeds.favorites.includes(breed.image)}
              onFavoritePress={handleFavoritePress(breed.image)}
              id={breed.id}
              key={breed.id}
              name={breed.name}
              image={breed.image}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
