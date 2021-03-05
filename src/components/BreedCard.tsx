import React, { FC, memo } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { BreedImageType } from '$types/breeds';
import ImageWithLoader from './ImageWithLoader';

interface BreedCardProps {
  id: string;
  name: string;
  image: BreedImageType;
  onPress: () => void;
  description: string;
}

export const BreedCard: FC<BreedCardProps> = (props) => {
  const { name, image, onPress, description } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageWithLoader
        uri={image.url}
        style={[styles.image]}
        imageProps={{ resizeMode: 'cover' }}
      />
      <View>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={5} style={styles.description}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    elevation: 20,
    maxHeight: 200,
    flexDirection: 'row',
    marginBottom: 15,
    height: 150,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 2,
  },
  name: {
    fontSize: 25,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
  description: {
    fontSize: 15,
    maxWidth: 200,
  },
});

export default memo(BreedCard);
