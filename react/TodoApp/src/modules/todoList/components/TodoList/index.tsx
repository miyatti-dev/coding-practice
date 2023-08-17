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
import {
  Todo,
  undoTodo,
  setIncompleteTodoList,
  setCompleteTodoList,
  setTodoList,
} from 'modules';
import TodoListItem from 'modules/todoList/components/TodoListItem';
import { styles } from './styles';

export enum TodoListType {
  incomplete,
  complete,
  all,
}

const TodoList = ({
  type,
  todoListData,
  isFinishGetTodoList,
}: {
  type: TodoListType;
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
  const [undoInfo, setUndoInfo] = useState<{
    visible: boolean;
    todo?: Todo;
    index: number;
  }>({
    visible: false,
    todo: undefined,
    index: 0,
  });
  const {
    visible: visibleUndoButton,
    todo: undoTodoInfo,
    index: undoTodoIndex,
  } = undoInfo;
  const { id, completed = false } = undoTodoInfo || {};

  // propsのtodoListDataが更新されたら、stateも更新する
  useEffect(() => {
    setData(todoListData);
  }, [todoListData]);

  // 「もとに戻す」ボタン表示
  const showUndoButton = useCallback(
    ({ todo, index }: { todo: Todo; index: number }) => {
      setUndoInfo({ visible: true, todo, index });

      // 2秒後に表示を消す
      setTimeout(() => {
        setUndoInfo({ visible: false, todo: undefined, index: 0 });
      }, 2000);
    },
    []
  );

  // renderItem
  const renderItem = useCallback(
    ({ item, drag, getIndex }: RenderItemParams<Todo>) => {
      return (
        <TodoListItem
          navigation={navigation}
          index={getIndex()}
          todo={item}
          showUndoButton={showUndoButton}
          drag={drag}
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
    dispatch(undoTodo({ id, index: undoTodoIndex }));
    setUndoInfo({ visible: false, todo: undefined, index: 0 });
  }, [dispatch, id, undoTodoIndex]);

  const onDragEnd = useCallback(
    ({ data: todoList }: { data: Array<Todo> }) => {
      switch (type) {
        case TodoListType.incomplete:
          dispatch(setIncompleteTodoList({ incompleteTodoList: todoList }));
          break;
        case TodoListType.complete:
          dispatch(setCompleteTodoList({ completeTodoList: todoList }));
          break;
        case TodoListType.all:
          dispatch(setTodoList({ todoList: todoList }));
          break;
        default:
          break;
      }
    },
    [dispatch, type]
  );

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
          extraData={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onDragEnd={onDragEnd}
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
