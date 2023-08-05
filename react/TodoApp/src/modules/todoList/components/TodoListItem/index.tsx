import React, { useCallback } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { Todo } from 'modules';

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

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 10,
    marginBottom: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    color: 'black',
  },
});

export default TodoListItem;
