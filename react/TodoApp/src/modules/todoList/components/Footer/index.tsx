import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';
import { RootStackParamList } from 'app';
import SelectListIcon from 'modules/todoList/components/SelectListIcon';
import MoreMenuIcon from 'modules/todoList/components/MoreMenuIcon';
import { styles } from './styles';

const Footer = ({ onTabChange }: { onTabChange: (index: number) => void }) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'CreateTodo'>
    >();

  // Todo登録ボタン
  const onPressCreateTodo = useCallback(() => {
    navigation.navigate('CreateTodo');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SelectListIcon onTabChange={onTabChange} />
      <MoreMenuIcon />
      <View style={styles.plusIconContainer}>
        <Icon
          color="#2089dc"
          name="plus"
          onPress={onPressCreateTodo}
          reverse
          type="font-awesome-5"
        />
      </View>
    </View>
  );
};

export default Footer;
