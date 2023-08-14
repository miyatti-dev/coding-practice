import React, { useCallback } from 'react';
import { Text } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { RootStackParamList } from 'app';
import { useAppDispatch } from 'app/hooks';
import { deleteTodo } from 'modules';
import { styles } from './styles';

type TodoDetailScreenRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>;

const TodoDetailScreen = () => {
  const route = useRoute<TodoDetailScreenRouteProp>();
  const { todo } = route.params || {};
  const { id, text } = todo || {};

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPressDeleteButton = useCallback(() => {
    dispatch(deleteTodo({ id }));
    navigation.goBack();
  }, [dispatch, id, navigation]);

  return (
    <>
      <Text>{text}</Text>
      <Button
        title={'削除'}
        containerStyle={styles.deleteButton}
        onPress={onPressDeleteButton}
      />
    </>
  );
};

export default TodoDetailScreen;
