import React, { FC, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ImageWithLoader } from '$components';
import { removeFromFavorites } from '$store/breeds';
import { useAppDispatch, useAppSelector } from '$store/hooks';

export const FavoritesScreen: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.breeds);

  const onRemoveOnFavorites = useCallback(
    (id: string) => () => {
      dispatch(removeFromFavorites(id));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item: imageData }) => {
      return (
        <View>
          <ImageWithLoader style={[styles.image]} uri={imageData.url} />
          <TouchableOpacity
            onPress={onRemoveOnFavorites(imageData.id)}
            style={styles.removeButton}
          >
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [onRemoveOnFavorites],
  );

  return (
    <SafeAreaView edges={['top']}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(breed) => breed.id}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    minHeight: '100%',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  removeButton: {
    backgroundColor: 'pink',
    height: 40,
    width: 40,
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
