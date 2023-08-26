import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Button, Dialog } from '@rneui/themed';
import { RootStackParamList } from 'app';
import { useAppDispatch } from 'app/hooks';
import { deleteTodo } from 'modules';
import { styles } from './styles';

type TodoDetailScreenRouteProp = RouteProp<RootStackParamList, 'TodoDetail'>;

const TodoDetailContainer = () => {
  const route = useRoute<TodoDetailScreenRouteProp>();
  const { todo } = route.params || {};
  const { id, text } = todo || {};

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const toggleDeleteDialog = useCallback(() => {
    setIsDeleteDialogVisible(
      (prevIsDeleteDialogVisible) => !prevIsDeleteDialogVisible
    );
  }, []);

  const onPressDeleteButton = useCallback(() => {
    toggleDeleteDialog();
  }, [toggleDeleteDialog]);

  const deleteTodoFunc = useCallback(() => {
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
      <Dialog
        isVisible={isDeleteDialogVisible}
        onBackdropPress={toggleDeleteDialog}
      >
        <Text>このTodoを削除しますか？</Text>
        <Dialog.Actions>
          <Dialog.Button title="削除する" onPress={deleteTodoFunc} />
          <Dialog.Button title="キャンセル" onPress={toggleDeleteDialog} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default TodoDetailContainer;
