import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  Pressable,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { increase, getTodoList } from 'modules';
import TodoListItem from 'modules/home/components/TodoListItem';


const HomeScreen = (props) => {
  const count = useSelector((state) => state.global.count);
  const todoList = useSelector((state) => state.global.todoList);
  const dispatch = useDispatch();
  const [flg, setFlg] = useState<boolean>(false);
  useEffect(() => {
    // 起動時にTODOリスト取得数
    dispatch(getTodoList());
  }, [dispatch]);

  const renderItem = useCallback(({ item }) => {
    const { text } = item || {};
    console.log('##### text = ', text);
  
    return <TodoListItem item={item} />;
  }, []);

  console.log('### count home = ', count);
  console.log('### home todoList = ', todoList);
  const { navigation } = props;
  return (
    <>
      <Button
        title="Go to Jane's profile  cccc"
        onPress={() => {
          dispatch(increase());
          navigation.navigate('Profile', { name: 'Jane' });
        }}
      />
      <FlatList
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;
