import React, { FC, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '$store/hooks';
import { Image } from 'react-native';
import { FlatList } from 'react-native';

export const FavoritesScreen: FC<{}> = () => {
  const { favorites } = useAppSelector((state) => state.breeds);
  const renderItem = useCallback(({ item: imageData }) => {
    return (
      <Image
        key={imageData.id}
        style={{ width: 300, height: 300, marginBottom: 20 }}
        source={{ uri: imageData.url }}
      />
    );
  }, []);

  return (
    <SafeAreaView edges={['top']}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(breed) => breed.id}
        contentContainerStyle={{
          width: '100%',
          alignItems: 'center',
          minHeight: '100%',
        }}
      />
    </SafeAreaView>
  );
};
