import React, { useState, useCallback, useEffect } from 'react';
import { Tab, TabView } from '@rneui/themed';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getTodoList } from 'modules';
import TodoList, { TodoListType } from 'modules/todoList/components/TodoList';
import { styles } from './styles';

const TodoListContainer = () => {
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

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  // タブ切り替え
  const onTabChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

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
            type={TodoListType.incomplete}
            todoListData={incompleteTodoList}
            isFinishGetTodoList={isFinishGetTodoList}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          <TodoList
            type={TodoListType.complete}
            todoListData={completeTodoList}
            isFinishGetTodoList={isFinishGetTodoList}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewItem}>
          <TodoList
            type={TodoListType.all}
            todoListData={todoList}
            isFinishGetTodoList={isFinishGetTodoList}
          />
        </TabView.Item>
      </TabView>
    </>
  );
};

export default TodoListContainer;
