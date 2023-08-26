import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Dialog, Text } from '@rneui/themed';
import { useAppDispatch } from 'app/hooks';
import { Todo, deleteTodo, completeTodo } from 'modules';
import { styles } from './styles';

const Footer = ({ todo }: { todo: Todo }) => {
  const { id, completed } = todo || {};

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // delete関連
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

  // 完了ボタン
  const onPressCompleteButton = useCallback(() => {
    dispatch(completeTodo({ id }));
    navigation.goBack();
  }, [dispatch, id, navigation]);

  return (
    <View style={styles.container}>
      <Button
        title={'削除する'}
        containerStyle={styles.button}
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
      <Button
        title={'完了にする'}
        containerStyle={styles.button}
        onPress={onPressCompleteButton}
        disabled={completed}
      />
    </View>
  );
};

export default Footer;
