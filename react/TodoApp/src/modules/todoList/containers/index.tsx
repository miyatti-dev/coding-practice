import React, { useState, useCallback, useRef } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';
import { Tab, TabView, Button } from '@rneui/themed';
import { RootStackParamList } from 'app';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Todo, getTodoList, undoTodo } from 'modules';
import TodoListItem from 'modules/todoList/components/TodoListItem';
import { styles } from './styles';

const TodoListScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'CreateTodo'>
    >();

  // 未完了Todo
  const inCompleteTodoList = useAppSelector(
    (state) => state.global.inCompleteTodoList
  );
  // 完了Todo
  const completeTodoList = useAppSelector(
    (state) => state.global.completeTodoList
  );
  // 全てTodo
  const todoList = useAppSelector((state) => state.global.todoList);
  // 取得済みかどうか
  const isFinishGetTodoList = useAppSelector(
    (state) => state.global.isFinishGetTodoList
  );

  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [undoInfo, setUndoInfo] = useState<{ visible: boolean; todo?: Todo }>({
    visible: false,
    todo: undefined,
  });
  const { visible: visibleUndoButton, todo: undoTodoInfo } = undoInfo;
  const { id, completed = false } = undoTodoInfo || {};

  // フォーカス時にTodoListを取得
  useFocusEffect(
    useCallback(() => {
      dispatch(getTodoList());
    }, [dispatch])
  );

  // TODO：リストから呼び出して、「元に戻す」を表示
  // 元に戻す Todo をもらう
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

  const todoListComponent = (todoListData: Array<Todo>) => {
    if (isFinishGetTodoList) {
      return (
        <FlatList
          data={todoListData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      );
    }
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  // タブ切り替え
  const onTabChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  // Todo登録ボタン
  const onPressCreateTodo = useCallback(() => {
    navigation.navigate('CreateTodo');
  }, [navigation]);

  // Todo登録ボタン
  const onPressUndoTodo = useCallback(() => {
    dispatch(undoTodo({ id }));
    setUndoInfo({ visible: false, todo: undefined });
  }, [dispatch, id]);

  return (
    <>
      <Tab
        value={tabIndex}
        onChange={onTabChange}
        indicatorStyle={styles.tabIndicatorStyle}
        variant="primary"
      >
        <Tab.Item title="未完了" />
        <Tab.Item title="完了" />
        <Tab.Item title="全て" />
      </Tab>

      <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
        <TabView.Item style={styles.tabViewItem}>
          {todoListComponent(inCompleteTodoList)}
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          {todoListComponent(completeTodoList)}
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          {todoListComponent(todoList)}
        </TabView.Item>
      </TabView>
      <View style={styles.plusIconContainer}>
        <Icon
          color="#2089dc"
          name="plus"
          onPress={onPressCreateTodo}
          reverse
          size={30}
          type="font-awesome-5"
        />
      </View>
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

export default TodoListScreen;
