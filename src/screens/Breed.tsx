import React, { FC, useCallback } from 'react';
import { ActivityIndicator, Button, Image, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector, useCurrentBreed } from '$store/hooks';
import { requestNewBreedImage } from '$store/breeds';

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

  if (!currentBreed) {
    return <Text>Something went wrong...</Text>;
  }

  return (
    <View>
      {state.common.loading ? (
        <View
          style={{
            width: 400,
            height: 400,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <Image
          style={{ width: 400, height: 400 }}
          source={{ uri: currentBreed.image.url }}
        />
      )}
      <Text>{currentBreed.name}</Text>
      <Text>{currentBreed.description}</Text>
      <Button title="Get new image" onPress={handleChangeBreedImage} />
    </View>
  );
};
