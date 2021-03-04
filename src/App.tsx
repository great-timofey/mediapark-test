import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import { store } from '$store';
import { BreedsView } from '$components';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <BreedsView />
    </Provider>
  );
};

export default App;
