import React, { useState, useCallback, useRef } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Input, Text } from '@rneui/themed';
import { useAppDispatch } from 'app/hooks';
import { postTodo } from 'modules';
import { styles } from './styles';

const CreateTodoContainer = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // onChangeTextのたびにStateを変化させたくないので、inputの入力内容はrefにする
  const todoRef = useRef<string>('');
  const [buttonDisabledFlag, setButtonDisabledFlag] = useState(true);

  const onPress = useCallback(() => {
    dispatch(postTodo({ todo: todoRef.current }));
    navigation.goBack();
  }, [dispatch, navigation]);

  const onChangeText = useCallback(
    (text: string) => {
      todoRef.current = text;

      if (text && buttonDisabledFlag) {
        setButtonDisabledFlag(false);
      } else if (!text && !buttonDisabledFlag) {
        setButtonDisabledFlag(true);
      }
    },
    [buttonDisabledFlag]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        android: undefined,
      } as const)}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text h1>ToDo登録</Text>
        <Input
          placeholder="ToDoを入力してください"
          containerStyle={styles.input}
          autoCapitalize="none"
          onChangeText={onChangeText}
        />
        <Button
          disabled={buttonDisabledFlag}
          onPress={onPress}
          title="追加"
          buttonStyle={styles.addButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateTodoContainer;
