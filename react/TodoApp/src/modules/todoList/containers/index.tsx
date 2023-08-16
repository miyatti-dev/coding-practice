import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';
import { Tab, TabView } from '@rneui/themed';
import { RootStackParamList } from 'app';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getTodoList } from 'modules';
import TodoList from 'modules/todoList/components/TodoList';
import { styles } from './styles';

const TodoListScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'CreateTodo'>
    >();

  // 未完了Todo
  const incompleteTodoList = useAppSelector(
    (state) => state.global.incompleteTodoList
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

  // フォーカス時にTodoListを取得
  useFocusEffect(
    useCallback(() => {
      dispatch(getTodoList());
    }, [dispatch])
  );

  // タブ切り替え
  const onTabChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  // Todo登録ボタン
  const onPressCreateTodo = useCallback(() => {
    navigation.navigate('CreateTodo');
  }, [navigation]);

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
          <TodoList
            todoListData={incompleteTodoList}
            isFinishGetTodoList={isFinishGetTodoList}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          <TodoList
            todoListData={completeTodoList}
            isFinishGetTodoList={isFinishGetTodoList}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          <TodoList
            todoListData={todoList}
            isFinishGetTodoList={isFinishGetTodoList}
          />
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
    </>
  );
};

export default TodoListScreen;
