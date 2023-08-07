import React, { useCallback } from 'react';
import { Text, Pressable } from 'react-native';
import { Todo } from 'modules';
import { styles } from './styles';

const TodoListItem = ({
  navigation,
  todoItem,
}: {
  navigation: any;
  todoItem: Todo;
}) => {
  const { text } = todoItem || {};

  const onPress = useCallback(() => {
    navigation.navigate('TodoDetail', { todoItem });
  }, [navigation, todoItem]);

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default TodoListItem;
