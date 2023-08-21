import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';
import { RootStackParamList } from 'app';
import { styles } from './styles';

const Footer = () => {
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
      <View style={styles.plusIconContainer}>
        <Icon
          color="#2089dc"
          name="plus"
          onPress={onPressCreateTodo}
          reverse
          size={30}
          type="font-awesome-5"
        />
      </View>
    </View>
  );
};

export default Footer;
