import React from 'react';
import { Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { increase } from '../';

const HomeScreen = props => {
  const count = useSelector(state => state.home.count);
  const dispatch = useDispatch();

  console.log('### count home = ', count);
  const { navigation } = props;
  return (
    <Button
      title="Go to Jane's profile  aaa"
      onPress={() => {
        dispatch(increase());
        navigation.navigate('Profile', { name: 'Jane' });
      }}
    />
  );
};

export default HomeScreen;
