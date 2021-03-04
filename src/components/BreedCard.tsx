import React, { FC, memo } from 'react';
import { Image, Text, View } from 'react-native';

import { BreedImageType } from '$types/breeds';

export const BreedCard: FC<{ id: string; name: string; image: BreedImageType }> = (
  props,
) => {
  return (
    <View
      style={{
        width: '100%',
        borderRadius: 20,
        elevation: 20,
        backgroundColor: 'red',
        maxHeight: 200,
      }}
    >
      <Text>{props.name}</Text>
      <Image
        source={{ uri: props.image.url }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="contain"
      />
    </View>
  );
};
