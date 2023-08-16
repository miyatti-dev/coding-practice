import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Text, Pressable } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useAppDispatch } from 'app/hooks';
import { Todo } from 'modules';
import { CheckBox } from '@rneui/themed';
import { completeTodo, inCompleteTodo } from 'modules';
import { styles } from './styles';

const TodoListItem = ({
  navigation,
  todo,
  showUndoButton,
  drag,
}: {
  navigation: any;
  todo: Todo;
  showUndoButton: (todo: Todo) => void;
  drag: () => void;
}) => {
  const { id, text, completed } = todo || {};

  const dispatch = useAppDispatch();
  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const [stateCompleted, setStateCompleted] = useState(completed);

  useEffect(() => {
    return () => {
      // タイマーのクリア
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    setStateCompleted(completed);
  }, [completed]);

  const onPressCheckBox = useCallback(() => {
    const processTodo = () => {
      showUndoButton({ id, text, completed });
      if (completed) {
        // 未完了に戻す
        dispatch(inCompleteTodo({ id }));
      } else {
        // 完了にする
        dispatch(completeTodo({ id }));
      }
    };

    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = undefined;
    }

    // チェック状態の変化を見せたいので、setTimeoutで処理を遅らせる
    timerId.current = setTimeout(processTodo, 500);
    setStateCompleted(!completed);
  }, [dispatch, showUndoButton, id, text, completed]);

  const onPressListItem = useCallback(() => {
    navigation.navigate('TodoDetail', { todo });
  }, [navigation, todo]);

  return (
    <ScaleDecorator>
      <Pressable
        style={styles.item}
        onPress={onPressListItem}
        onLongPress={drag}
      >
        <CheckBox
          checked={stateCompleted}
          containerStyle={styles.checkbox}
          onPress={onPressCheckBox}
        />
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </ScaleDecorator>
  );
};

export default TodoListItem;
