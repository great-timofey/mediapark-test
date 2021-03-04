import React, { FC, useState } from 'react';
import { ActivityIndicator, Button, Image, Text, View } from 'react-native';

import { BreedImageType } from '$types/breeds';

export const BreedCard: FC<{
  id: string;
  name: string;
  image: BreedImageType;
  favorite: boolean;
  onFavoritePress: (isFavorite: boolean) => void;
}> = (props) => {
  const { favorite, onFavoritePress, name, image } = props;
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <View
      style={{
        width: '100%',
        borderRadius: 20,
        elevation: 20,
        backgroundColor: favorite ? 'red' : 'cyan',
        maxHeight: 200,
        flexDirection: 'row',
        marginBottom: 15,
        height: 150,
      }}
    >
      <Image
        source={{ uri: image.url }}
        style={{ width: 150, height: 150, marginRight: 30 }}
        resizeMode="contain"
        onLoadEnd={() => setImageLoading(false)}
      />
      <View>
        <Text style={{ fontSize: 30 }}>{name}</Text>
        {imageLoading && (
          <View style={{ width: 150, height: 150, backgroundColor: 'green' }}>
            <ActivityIndicator />
          </View>
        )}
        <Button
          title={`${favorite ? 'Remove from' : 'Add to'} favorites`}
          onPress={() => onFavoritePress(favorite)}
        />
      </View>
    </View>
  );
};
