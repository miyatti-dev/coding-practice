import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@rneui/themed';
import { RootStackParamList } from 'app';
import { useAppDispatch } from 'app/hooks';
import { Todo, undoTodo } from 'modules';
import TodoListItem from 'modules/todoList/components/TodoListItem';
import { styles } from './styles';

const TodoList = ({
  todoListData,
  isFinishGetTodoList,
}: {
  todoListData: Array<Todo>;
  isFinishGetTodoList: boolean;
}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'CreateTodo'>
    >();

  const dispatch = useAppDispatch();
  const [undoInfo, setUndoInfo] = useState<{ visible: boolean; todo?: Todo }>({
    visible: false,
    todo: undefined,
  });
  const { visible: visibleUndoButton, todo: undoTodoInfo } = undoInfo;
  const { id, completed = false } = undoTodoInfo || {};

  const showUndoButton = useCallback((todo: Todo) => {
    setUndoInfo({ visible: true, todo });

    setTimeout(() => {
      setUndoInfo({ visible: false, todo: undefined });
    }, 2000);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => {
      return (
        <TodoListItem
          navigation={navigation}
          todo={item}
          showUndoButton={showUndoButton}
        />
      );
    },
    [navigation, showUndoButton]
  );

  const keyExtractor = useCallback((item: Todo) => {
    return String(item.id);
  }, []);

  // Undoボタン
  const onPressUndoTodo = useCallback(() => {
    dispatch(undoTodo({ id }));
    setUndoInfo({ visible: false, todo: undefined });
  }, [dispatch, id]);

  if (!isFinishGetTodoList) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={todoListData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      {visibleUndoButton && (
        <View style={styles.overlayView}>
          {completed ? (
            <Text style={styles.overlayText}>未完了に戻しました</Text>
          ) : (
            <Text style={styles.overlayText}>完了にしました</Text>
          )}
          <Button title="元に戻す" type="clear" onPress={onPressUndoTodo} />
        </View>
      )}
    </>
  );
};

export default TodoList;
