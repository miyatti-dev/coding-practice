import React from 'react';
import { Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'app';

type TodoDetailScreenRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>;

const TodoDetailScreen = () => {
  const route = useRoute<TodoDetailScreenRouteProp>();
  const { todo } = route.params || {};
  const { text } = todo || {};

  return <Text>{text}</Text>;
};

export default TodoDetailScreen;
