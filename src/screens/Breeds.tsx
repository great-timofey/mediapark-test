import React, { FC, useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BreedCard } from '$components';
import { BreedType } from '$types/breeds';
import { requestBreeds } from '$store/breeds';
import { useAppDispatch, useAppSelector } from '$store/hooks';

export const BreedsScreen: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {
    breeds: { list },
    common: { loading },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (!list.length) {
      dispatch(requestBreeds());
    }
  }, [list, dispatch]);

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
          data={list}
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
