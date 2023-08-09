import React, { useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import { Tab, TabView } from '@rneui/themed';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Todo, getTodoList } from 'modules';
import TodoListItem from 'modules/todoList/components/TodoListItem';
import { styles } from './styles';

// TODO:navigationの型定義
type TodoListScreenProps = {
  navigation: any;
};

const TodoListScreen = (props: TodoListScreenProps) => {
  const { navigation } = props;

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

  // フォーカス時にTodoListを取得
  useFocusEffect(
    useCallback(() => {
      dispatch(getTodoList());
    }, [dispatch])
  );

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => {
      return <TodoListItem navigation={navigation} todoItem={item} />;
    },
    [navigation]
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

  const onTabChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

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
          {todoListComponent(inCompleteTodoList)}
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          {todoListComponent(completeTodoList)}
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          {todoListComponent(todoList)}
        </TabView.Item>
      </TabView>
      <Icon
        color="#2089dc"
        name="plus"
        onPress={onPressCreateTodo}
        reverse
        size={30}
        type="font-awesome-5"
      />
    </>
  );
};

export default TodoListScreen;
