import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { store } from '$store';
import { createStackNavigator } from '@react-navigation/stack';
import { BreedScreen, BreedsScreen, FavoritesScreen } from '$screens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BreedsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Breeds" component={BreedsScreen} />
      <Stack.Screen name="Breed" component={BreedScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator tabBarOptions={{ labelStyle: { fontSize: 20 } }}>
          <Tab.Screen name="Breeds" component={BreedsStack} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
