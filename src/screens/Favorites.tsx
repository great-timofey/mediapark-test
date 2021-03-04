import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '$store/hooks';
import { BreedImageType } from '$types/breeds';
import { Image } from 'react-native';

export const FavoritesScreen: FC<{}> = () => {
  const { favorites } = useAppSelector((state) => state.breeds);

  return (
    <SafeAreaView>
      <ScrollView>
        {favorites.map((imageData: BreedImageType) => (
          <View>
            <Image
              key={imageData.id}
              style={{ width: 300, height: 300 }}
              source={{ uri: imageData.url }}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
