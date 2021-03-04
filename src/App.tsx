import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { store } from '$store';
import { BreedCard } from '$components';
import { api } from '$services/api';
import { BreedImageType } from '$types/breeds';

declare const global: { HermesInternal: null | {} };

const App = () => {
  const [picture, setPicture] = useState<null | BreedImageType>(null);

  useEffect(() => {
    async function fetchBreeds() {
      const breeds = await api.get('/breeds', {
        params: {
          page: 0,
          limit: 2,
        },
      });

      setPicture(breeds?.data[0]?.image);
    }

    fetchBreeds();
  }, []);

  console.log(picture);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {picture ? (
          <BreedCard
            id="1"
            name="some"
            image={{
              ...picture,
            }}
          />
        ) : (
          <></>
        )}
      </SafeAreaView>
    </Provider>
  );
};

export default App;
