import React, { useCallback } from 'react';
import { Text, Pressable } from 'react-native';
import { useAppDispatch } from 'app/hooks';
import { Todo } from 'modules';
import { CheckBox } from '@rneui/themed';
import { completeTodo, inCompleteTodo } from 'modules';
import { styles } from './styles';

const TodoListItem = ({
  navigation,
  todo,
}: {
  navigation: any;
  todo: Todo;
}) => {
  const { id, text, completed } = todo || {};
  const dispatch = useAppDispatch();

  const onPressCheckBox = useCallback(() => {
    if (completed) {
      dispatch(inCompleteTodo({ id }));
    } else {
      dispatch(completeTodo({ id }));
    }
  }, [dispatch, id, completed]);

  const onPressListItem = useCallback(() => {
    navigation.navigate('TodoDetail', { todo });
  }, [navigation, todo]);

  return (
    <Pressable style={styles.item} onPress={onPressListItem}>
      <CheckBox
        checked={completed}
        containerStyle={styles.checkbox}
        onPress={onPressCheckBox}
      />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default TodoListItem;
