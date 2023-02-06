import React from 'react';
import {View} from 'react-native';
import BackButton from '../atoms/BackButton';

const BackHeader = ({onPress}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <BackButton onPress={onPress} />
    </View>
  );
};

export default BackHeader;
