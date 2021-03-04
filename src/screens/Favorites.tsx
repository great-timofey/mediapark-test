import React, { FC, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '$store/hooks';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { ImageWithLoader } from '$components';
import { View } from 'react-native';
import { removeFromFavorites } from 'store/breeds';

export const FavoritesScreen: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.breeds);

  const renderItem = useCallback(({ item: imageData }) => {
    return (
      <View>
        <ImageWithLoader
          style={[{ width: 300, height: 300, marginBottom: 20 }]}
          uri={imageData.url}
        />
        <TouchableOpacity
          onPress={() => dispatch(removeFromFavorites(imageData.id))}
          style={{
            backgroundColor: 'pink',
            height: 40,
            width: 40,
            position: 'absolute',
            right: 10,
            top: 10,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>X</Text>
        </TouchableOpacity>
      </View>
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
