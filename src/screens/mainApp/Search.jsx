import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStylesheet from '../../styles/global.style';
import Container from '../../components/layout/container/Container.component'
import { SkillPillHolder } from '../../components/skillPill/SkillPill.component';
import { colors, typography } from '../../styles/theme.style';
import firestore from '@react-native-firebase/firestore';
import CourseCard from '../../components/home/courseCardv2/CourseCardv2.component';
import { Image } from 'react-native';
import emptyCart from '../../assets/images/emptyCart.png';

const Search = ({navigation}) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchResult, setResult] = useState([]);
  const [inputVal, setInputValue] = useState('');
  const handleSubmit = () => {
    setValue(inputVal);
  };
  const courseOpened = course => {
    navigation.navigate('course', { payload: course });
  };
  const fetchCourses = async () => {
    setLoading(true);
    const titleRecords = await firestore()
    .collection('courses')
    .get();

    var res= titleRecords.docs.map((doc) => {
      return {
        ...doc.data(), id: doc.id
      }
    }); 
    console.log(res);
    setCourses(res);
    setLoading(false);
  };

  useEffect(()=>{
    fetchCourses();
  },[])

  useEffect(()=>{
    if(value){
      setResult(courses.filter(x=> x.title.toLowerCase().includes(value.toLowerCase()) || x?.description?.toLowerCase().includes(value.toLowerCase())));
    }
  }, [value])
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
      {!loading && <ScrollView>
        {value == "" && <View style={{ marginHorizontal: 16, marginVertical: 10 }}>
          <Text style={globalStylesheet.heading}>Top Searches</Text>
          <View style={{ marginVertical: 10 }}>
            <SkillPillHolder clickHandler={(skill) => {
              setInputValue(skill);
              setValue(skill);
            }} skills={["Entreprenurship", "Business", "Management", "Communication",
              "Startup", "Human Resource"]}></SkillPillHolder>
          </View>
        </View>}
        {value!="" && <View style={{marginHorizontal:16, marginVertical:10}}>
          {searchResult?.length==0 && <View>
              <Image style={{width:"100%", height:300}} source={emptyCart} />
              <Text style={{
            fontFamily: typography.fontFamilies.PRIMARY,
            color: colors.font.DARK,
            textAlign: 'center',
            fontWeight: '600',
            marginTop: 15,
          }}>No Result found.</Text>
            </View>}
          {searchResult?.length>0 && searchResult.map(course => (
                <CourseCard key={course.id} course={course} clickHandler={courseOpened}></CourseCard>
              ))}
          </View>}
      </ScrollView>}
      {loading && <View style={{flex:1, justifyContent:"center"}}>
        <ActivityIndicator color={colors.general.BRAND} /></View>}
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