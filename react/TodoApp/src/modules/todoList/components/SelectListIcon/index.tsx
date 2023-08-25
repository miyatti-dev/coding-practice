import React, { useCallback, useState, useMemo } from 'react';
import { Icon } from '@rneui/base';
import { BottomSheet, ListItem } from '@rneui/themed';
import { styles } from './styles';

type SelectListItem = {
  title: string;
  onPress: () => void;
  containerStyle?: any;
};

const SelectListIcon = ({
  onTabChange,
}: {
  onTabChange: (index: number) => void;
}) => {
  // リスト選択のBottomSheetを表示するかどうか
  const [isSelectListVisible, setIsSelectVisible] = useState(false);

  // リスト選択のBottomSheetの表示内容
  const selectList: Array<SelectListItem> = useMemo(
    () => [
      {
        title: 'リスト選択',
        onPress: () => {
          setIsSelectVisible(false);
        },
        containerStyle: {
          fontsize: 30,
          borderBottomWidth: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      },
      {
        title: '未完了',
        onPress: () => {
          setIsSelectVisible(false);
          onTabChange(0);
        },
      },
      {
        title: '完了',
        onPress: () => {
          setIsSelectVisible(false);
          onTabChange(1);
        },
      },
      {
        title: '全て',
        onPress: () => {
          setIsSelectVisible(false);
          onTabChange(2);
        },
        containerStyle: {
          borderBottomWidth: 1,
        },
      },
      {
        title: 'キャンセル',
        onPress: () => setIsSelectVisible(false),
      },
    ],
    [onTabChange]
  );

  // リスト表示選択
  const onPressList = useCallback(() => {
    setIsSelectVisible(true);
  }, []);

  // リスト背景選択
  const onPressBackground = useCallback(() => {
    setIsSelectVisible(false);
  }, []);

  return (
    <>
      <Icon
        color="#2089dc"
        name="list"
        onPress={onPressList}
        reverse
        type="font-awesome-5"
      />
      <BottomSheet
        isVisible={isSelectListVisible}
        onBackdropPress={onPressBackground}
        containerStyle={styles.selectList}
      >
        {selectList.map((listitem, i) => (
          <ListItem
            key={i}
            containerStyle={listitem.containerStyle}
            onPress={listitem.onPress}
          >
            <ListItem.Content>
              <ListItem.Title
                style={i === 0 ? styles.selectListFirstText : undefined}
              >
                {listitem.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

export default SelectListIcon;
