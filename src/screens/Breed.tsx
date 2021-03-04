import React, { FC, useCallback } from 'react';
import { ActivityIndicator, Button, Image, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector, useCurrentBreed } from '$store/hooks';
import { addToFavorites, requestNewBreedImage } from '$store/breeds';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageWithLoader } from 'components';

export const BreedScreen: FC<any> = (props) => {
  const {
    route: {
      params: { id },
    },
  } = props;
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const currentBreed = useCurrentBreed(state, id);

  const handleChangeBreedImage = useCallback(async () => {
    dispatch(requestNewBreedImage(id));
  }, [id, dispatch]);

  const handleAddToFavorites = useCallback(() => {
    if (!currentBreed) return;

    dispatch(addToFavorites(currentBreed?.image));
  }, [currentBreed, dispatch]);

  if (!currentBreed) {
    return <Text>Something went wrong...</Text>;
  }

  return (
    <SafeAreaView>
      <View style={{ width: '100%', paddingHorizontal: 10 }}>
        {state.common.loading ? (
          <View
            style={{
              width: 400,
              height: 400,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Image
            style={{ width: '100%', height: 400 }}
            source={{ uri: currentBreed.image.url }}
            resizeMode="contain"
          />
        )}
        <Text>{currentBreed.name}</Text>
        <Text>{currentBreed.description}</Text>
        <Button title="Get new image" onPress={handleChangeBreedImage} />
        <Button title="Add to favorites" onPress={handleAddToFavorites} />
      </View>
    </SafeAreaView>
  );
};
