import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { Todo } from 'modules';

const TodoListItem = ({ todoItem }: { todoItem: Todo }) => {
  const { text } = todoItem || {};
  console.log('### [TodoListItem] text = ', text);

  return (
    <Pressable
      style={styles.item}
      onPress={() => console.log('######### onPress')}
    >
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
