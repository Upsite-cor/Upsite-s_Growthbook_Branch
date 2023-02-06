import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: 'white',
              width: 40,
              height: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name={'chevron-back'} size={24} />
          </TouchableOpacity>
  )
}

export default BackButton