import React, { FC, memo } from 'react';
import { Text, View } from 'react-native';

import { BreedImageType } from '$types/breeds';
import { TouchableOpacity } from 'react-native';
import ImageWithLoader from './ImageWithLoader';

export const BreedCard: FC<{
  id: string;
  name: string;
  image: BreedImageType;
  onPress: () => void;
  description: string;
}> = (props) => {
  const { name, image, onPress, description } = props;

  return (
    <TouchableOpacity
      style={{
        borderRadius: 20,
        elevation: 20,
        maxHeight: 200,
        flexDirection: 'row',
        marginBottom: 15,
        height: 150,
        paddingHorizontal: 20,
        borderColor: 'black',
        borderWidth: 2,
      }}
      onPress={onPress}
    >
      <ImageWithLoader
        uri={image.url}
        style={[
          {
            width: 150,
            height: 150,
            marginRight: 10,
          },
        ]}
        imageProps={{ resizeMode: 'cover' }}
      />
      <View>
        <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontSize: 25 }}>
          {name}
        </Text>
        <Text numberOfLines={5} style={{ fontSize: 15, maxWidth: 200 }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(BreedCard);
