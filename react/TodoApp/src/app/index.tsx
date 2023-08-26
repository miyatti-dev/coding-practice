import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Todo } from 'modules';
import TodoListScreen from 'screens/TodoListScreen';
import TodoDetailScreen from 'screens/TodoDetailScreen';
import CreateTodoScreen from 'screens/CreateTodoScreen';
import { store } from './store';

export type RootStackParamList = {
  HomeDrawer: undefined;
  TodoList: undefined;
  TodoDetail: { todo: Todo };
  CreateTodo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{ title: 'Todo 一覧' }}
      />
      <Drawer.Screen
        name="CreateTodo"
        component={CreateTodoScreen}
        options={{ title: 'Todo を作成する' }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TodoList">
          <Stack.Screen
            name="HomeDrawer"
            component={HomeDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TodoDetail"
            component={TodoDetailScreen}
            options={{ title: 'Todo 詳細' }}
          />
          <Stack.Screen
            name="CreateTodo"
            component={CreateTodoScreen}
            options={{ title: 'Todo を作成する' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
