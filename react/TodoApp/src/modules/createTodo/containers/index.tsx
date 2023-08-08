import React from 'react';

import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { styles } from './styles';

const CreateTodoScreen = () => {
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
        />
        <Button
          onPress={() => {}}
          title="追加"
          buttonStyle={styles.addButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateTodoScreen;
