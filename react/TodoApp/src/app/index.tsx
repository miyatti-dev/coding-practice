import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from 'modules/todoList/containers';
import TodoDetailScreen from 'modules/todoDetail/containers';
import CreateTodoScreen from 'modules/createTodo/containers';
import { store } from './store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen
            name="TodoList"
            component={TodoListScreen}
            options={{ title: 'Todo一覧' }}
          />
          <Stack.Screen
            name="TodoDetail"
            component={TodoDetailScreen}
            options={{ title: 'Todo詳細' }}
          />
          <Stack.Screen
            name="CreateTodo"
            component={CreateTodoScreen}
            options={{ title: 'Create Todo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
