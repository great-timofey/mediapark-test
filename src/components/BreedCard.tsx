import React, { FC, memo, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Text, View } from 'react-native';

import { BreedImageType } from '$types/breeds';
import { TouchableOpacity } from 'react-native';

export const BreedCard: FC<{
  id: string;
  name: string;
  image: BreedImageType;
  onPress: () => void;
  description: string;
}> = (props) => {
  const { name, image, onPress, description } = props;
  const [imageLoading, setImageLoading] = useState(true);

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
      {imageLoading && (
        <View style={{ width: 150, height: 150 }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Image
        source={{ uri: image.url }}
        style={{
          width: 150,
          height: 150,
          marginRight: 10,
        }}
        resizeMode="cover"
        onLoadEnd={() => setImageLoading(false)}
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
