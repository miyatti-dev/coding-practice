import React from 'react';
import { Text } from 'react-native';

// TODO:route型定義
const ProfileScreen = ({ route }: { route: any }) => {
  return <Text>This is {route.params.name}'s profile aaa</Text>;
};

export default ProfileScreen;
