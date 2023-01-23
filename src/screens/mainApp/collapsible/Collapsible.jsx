import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import AnimatedHeader from './AnimatedHeader';
import Bg from '../../../assets/images/marketing1.png';

getListItems = count => {
  const items = [];
  let i = 0;

  while (i < count) {
    i++;
    items.push(
      <View key={i} style={{ backgroundColor: i % 2 === 0 ? '#eee5ff' : '#ceebfd', height: 64 }}>
        <Text style={{ color: '#999' }}>{`List Item ${i}`}</Text>
      </View>
    );
  }

  return items;
};

export default class Collapsible extends Component {

  render() {
    return (
      <AnimatedHeader 
        style={{flex: 1 }}
        backText='Back'
        title='Happy coding'
        renderLeft={() => (<Icon name='arrow-back' style={{ marginLeft: 20 }} />)}
        renderRight={() => (<Icon name='add' style={{ marginRight: 20 }} />)}
        backStyle={{ marginLeft: 10 }}
        backTextStyle={{fontSize: 14, color: '#000'}}
        titleStyle={{ fontSize: 22, left: 20, bottom: 20, color: '#000' }}
        headerMaxHeight={200}
        imageSource={Bg}
        toolbarColor='#FFF'
        disabled={false}
      >
        <ScrollView>
          {getListItems(20)}
        </ScrollView>
      </AnimatedHeader>
    );
  }
  }