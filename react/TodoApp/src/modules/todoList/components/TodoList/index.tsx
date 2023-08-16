import React, { useState, useCallback, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
  // TODO：Redux側の並び順も変えないとダメだ。。。
  const [data, setData] = useState(todoListData);
  const [undoInfo, setUndoInfo] = useState<{ visible: boolean; todo?: Todo }>({
    visible: false,
    todo: undefined,
  });
  const { visible: visibleUndoButton, todo: undoTodoInfo } = undoInfo;
  const { id, completed = false } = undoTodoInfo || {};

  // propsのtodoListDataが更新されたら、stateも更新する
  useEffect(() => {
    setData(todoListData);
  }, [todoListData]);

  // 「もとに戻す」ボタン表示
  const showUndoButton = useCallback((todo: Todo) => {
    setUndoInfo({ visible: true, todo });

    // 2秒後に表示を消す
    setTimeout(() => {
      setUndoInfo({ visible: false, todo: undefined });
    }, 2000);
  }, []);

  // renderItem
  const renderItem = useCallback(
    ({ item, drag }: RenderItemParams<Todo>) => {
      return (
        <TodoListItem
          navigation={navigation}
          todo={item}
          drag={drag}
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
      <GestureHandlerRootView>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onDragEnd={({ data: d }) => setData(d)}
        />
      </GestureHandlerRootView>
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
