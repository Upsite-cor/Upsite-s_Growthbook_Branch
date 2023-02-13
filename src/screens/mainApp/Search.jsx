import React, { useState} from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStylesheet from '../../styles/global.style';
import Container from '../../components/layout/container/Container.component'
import { SkillPillHolder } from '../../components/skillPill/SkillPill.component';
const Search = () => {
  const [value, setValue] = useState('');
  const [inputVal, setInputValue] = useState('');
  const handleSubmit = () => {
      setValue(inputVal);
  };
  return (
    <Container isScrollable={false}>
      <View style={styles.container}>
        <Icon name="search" style={styles.icon} />
        <TextInput
          placeholder="Search"
          returnKeyType="search"
          style={styles.input}
          onChangeText={newText => setInputValue(newText)}
          value={inputVal}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View
        style={{
          borderBottomColor: '#D3D3D3',
          borderBottomWidth: 1,

          width: '100%',
          // marginVertical:,
        }}
      />
      <ScrollView>
        {value=="" && <View style={{ marginHorizontal: 16, marginVertical: 10 }}>
          <Text style={globalStylesheet.heading}>Top Searches</Text>
          <View style={{ marginVertical: 10 }}>
            <SkillPillHolder clickHandler={(skill)=>{
              setInputValue(skill);
              setValue(skill);
            }} skills={["Entreprenurship", "Business", "Management", "Communication",
          "Startup", "Human Resource"]}></SkillPillHolder>
          </View>
        </View>}
      </ScrollView>
    </Container>
  )
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    gap: 10,
    padding: 10,
    marginVertical: 10
  },
  icon: {
    fontSize: 20,
    color: 'gray'
  },
  input: {
    flex: 1,
    fontSize: 18
  }
});
export default Search