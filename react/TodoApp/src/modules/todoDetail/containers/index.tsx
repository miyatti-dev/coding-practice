import React from 'react';
import { Text } from 'react-native';

// TODO:route型定義
const TodoDetailScreen = ({ route }: { route: any }) => {
  const { todoItem } = route.params;
  const { text } = todoItem || {};
  return <Text>{text}</Text>;
};

export default TodoDetailScreen;
