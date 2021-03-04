import React, { FC, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { useAppDispatch } from '$store/hooks';
import { BreedType } from '$types/breeds';
import { requestBreeds } from '$store/breeds';
import { BreedCard } from './BreedCard';

export const BreedsView: FC<{
  breeds: BreedType[];
  loading: boolean;
}> = ({ breeds, loading }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleCardPress = useCallback(
    (breed: BreedType) => () => {
      const { id } = breed;
      navigation.navigate('Breed', { id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item: breed }) => (
      <BreedCard
        id={breed.id}
        key={breed.id}
        name={breed.name}
        image={breed.image}
        onPress={handleCardPress(breed)}
        description={breed.description}
      />
    ),
    [handleCardPress],
  );

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 10 }}>
        <FlatList
          data={breeds}
          renderItem={renderItem}
          keyExtractor={(breed) => breed.id}
          onEndReached={() => dispatch(requestBreeds())}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? ActivityIndicator : <></>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
