import React, { FC, useCallback } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector, useCurrentBreed } from '$store/hooks';
import { addToFavorites, requestNewBreedImage } from '$store/breeds';

export const BreedScreen: FC<any> = (props) => {
  const {
    route: {
      params: { id },
    },
  } = props;

  const navigation = useNavigation();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const currentBreed = useCurrentBreed(state, id);

  const handleChangeBreedImage = useCallback(async () => {
    dispatch(requestNewBreedImage(id));
  }, [id, dispatch]);

  const handleAddToFavorites = useCallback(() => {
    if (!currentBreed) {
      return;
    }

    dispatch(addToFavorites(currentBreed?.image));
  }, [currentBreed, dispatch]);

  if (!currentBreed) {
    return <Text>Something went wrong...</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButtonContainer}>
          <Text style={styles.backButtonText}>{'<'} prev screen</Text>
        </TouchableOpacity>
        {state.common.loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Image
            style={styles.image}
            source={{ uri: currentBreed.image.url }}
            resizeMode="contain"
          />
        )}
        <Text>{currentBreed.name}</Text>
        <Text>{currentBreed.description}</Text>
        <Button title="Get new image" onPress={handleChangeBreedImage} />
        <Button title="Add to favorites" onPress={handleAddToFavorites} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  backButtonContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 10,
    left: 10,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 20,
  },
  loaderContainer: {
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },
});
