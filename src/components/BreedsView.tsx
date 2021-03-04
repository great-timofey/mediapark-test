import React, { FC, useCallback } from 'react';
import { ActivityIndicator, Button, SafeAreaView, ScrollView } from 'react-native';
import { useAppDispatch } from '$store/hooks';
import { BreedImageType, BreedType } from '$types/breeds';
import { addToFavorites, removeFromFavorites, requestBreeds } from '$store/breeds';
import { BreedCard } from './BreedCard';

export const BreedsView: FC<{
  breeds: BreedType[];
  favorites: BreedImageType[];
  loading: boolean;
}> = ({ breeds, favorites, loading }) => {
  const dispatch = useAppDispatch();

  const handleFavoritePress = useCallback(
    (imageData: BreedImageType) => (isFavorite: boolean) => {
      dispatch(isFavorite ? removeFromFavorites(imageData) : addToFavorites(imageData));
    },
    [dispatch],
  );

  return (
    <SafeAreaView>
      <Button title="Fetch more" onPress={() => dispatch(requestBreeds())} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          {breeds.map((breed) => (
            <BreedCard
              id={breed.id}
              key={breed.id}
              name={breed.name}
              image={breed.image}
              favorite={favorites.includes(breed.image)}
              onFavoritePress={handleFavoritePress(breed.image)}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
