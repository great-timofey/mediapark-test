import React, { FC, useCallback } from 'react';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { useAppDispatch } from '$store/hooks';
import { BreedImageType, BreedType } from '$types/breeds';
import { addToFavorites, removeFromFavorites, requestBreeds } from '$store/breeds';
import { BreedCard } from './BreedCard';
import { useNavigation } from '@react-navigation/native';

export const BreedsView: FC<{
  breeds: BreedType[];
  favorites: BreedImageType[];
  loading: boolean;
}> = ({ breeds, favorites, loading }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleFavoritePress = useCallback(
    (imageData: BreedImageType) => (isFavorite: boolean) => {
      dispatch(isFavorite ? removeFromFavorites(imageData) : addToFavorites(imageData));
    },
    [dispatch],
  );

  const handleCardPress = useCallback(
    (breed: BreedType) => () => {
      const { id } = breed;
      navigation.navigate('Breed', { id });
    },
    [navigation],
  );

  return (
    <SafeAreaView>
      <Button title="Fetch more" onPress={() => dispatch(requestBreeds())} />
      <ScrollView>
        {breeds.map((breed) => (
          <BreedCard
            id={breed.id}
            key={breed.id}
            name={breed.name}
            image={breed.image}
            onPress={handleCardPress(breed)}
            favorite={favorites.includes(breed.image)}
            onFavoritePress={handleFavoritePress(breed.image)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
