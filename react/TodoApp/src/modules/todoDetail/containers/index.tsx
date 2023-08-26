import React from 'react';
import { View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { RootStackParamList } from 'app';
import Footer from 'modules/todoDetail/components/Footer';
import { styles } from './styles';

type TodoDetailScreenRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>;

const TodoDetailContainer = () => {
  const route = useRoute<TodoDetailScreenRouteProp>();
  const { todo } = route.params || {};
  const { text } = todo || {};

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>ToDo内容</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Footer todo={todo} />
    </>
  );
};

export default TodoDetailContainer;
