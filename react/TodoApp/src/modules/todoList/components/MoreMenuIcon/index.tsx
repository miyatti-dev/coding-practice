import React, { useCallback, useState, useMemo } from 'react';
import { Icon, Text } from '@rneui/base';
import { BottomSheet, ListItem, Dialog } from '@rneui/themed';
import { useAppDispatch } from 'app/hooks';
import { completeAllTodo, deleteCompletedTodo } from 'modules';
import { styles } from './styles';

type MoreMenuItem = {
  title: string;
  onPress: () => void;
  containerStyle?: any;
};

const MoreMenuIcon = () => {
  // MoreMenuのBottomSheetを表示するかどうか
  const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);

  const dispatch = useAppDispatch();

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const toggleDeleteDialog = useCallback(() => {
    setIsDeleteDialogVisible(
      (prevIsDeleteDialogVisible) => !prevIsDeleteDialogVisible
    );
  }, []);

  const onPressDeleteAllButton = useCallback(() => {
    toggleDeleteDialog();
  }, [toggleDeleteDialog]);

  const deleteTodoFunc = useCallback(() => {
    dispatch(deleteCompletedTodo());
    toggleDeleteDialog();
    setIsMoreMenuVisible(false);
  }, [toggleDeleteDialog, dispatch]);

  // MoreMenuのBottomSheetの表示内容
  const moreMenuList: Array<MoreMenuItem> = useMemo(
    () => [
      {
        title: '全て完了にする',
        onPress: () => {
          setIsMoreMenuVisible(false);
          dispatch(completeAllTodo());
        },
        containerStyle: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      },
      {
        title: '完了したタスクを全て削除',
        onPress: onPressDeleteAllButton,
      },
      {
        title: 'キャンセル',
        onPress: () => setIsMoreMenuVisible(false),
        containerStyle: {
          borderTopWidth: 1,
        },
      },
    ],
    [dispatch, onPressDeleteAllButton]
  );

  // MoreMenu表示選択
  const onPressMoreMenu = useCallback(() => {
    setIsMoreMenuVisible(true);
  }, []);

  // 背景選択
  const onPressBackground = useCallback(() => {
    setIsMoreMenuVisible(false);
  }, []);

  return (
    <>
      <Icon
        color="#2089dc"
        name="ellipsis-h"
        onPress={onPressMoreMenu}
        reverse
        type="font-awesome-5"
      />
      <BottomSheet
        isVisible={isMoreMenuVisible}
        onBackdropPress={onPressBackground}
        containerStyle={styles.moreMenuList}
      >
        {moreMenuList.map((listitem, i) => (
          <ListItem
            key={i}
            containerStyle={listitem.containerStyle}
            onPress={listitem.onPress}
          >
            <ListItem.Content>
              <ListItem.Title>{listitem.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <Dialog
        isVisible={isDeleteDialogVisible}
        onBackdropPress={toggleDeleteDialog}
      >
        <Text>完了したタスクを全て削除しますか？</Text>
        <Dialog.Actions>
          <Dialog.Button title="全て削除する" onPress={deleteTodoFunc} />
          <Dialog.Button title="キャンセル" onPress={toggleDeleteDialog} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default MoreMenuIcon;
