import React, { useCallback } from 'react';
import { Text, Pressable } from 'react-native';
import { Todo } from 'modules';
import { styles } from './styles';

const TodoListItem = ({
  navigation,
  todo,
}: {
  navigation: any;
  todo: Todo;
}) => {
  const { text } = todo || {};

  const onPress = useCallback(() => {
    navigation.navigate('TodoDetail', { todo });
  }, [navigation, todo]);

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default TodoListItem;
