import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from 'modules/todoList/containers';
import TodoDetailScreen from 'modules/todoDetail/containers';
import { store } from './store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{ title: 'Todo' }}
          />
          <Stack.Screen name="TodoDetail" component={TodoDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
