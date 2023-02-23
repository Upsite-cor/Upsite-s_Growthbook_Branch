import React, { useEffect, useState } from "react";
import { Image, View, Text } from "react-native";
import Container from "../../components/layout/container/Container.component";
import BackHeader from "../../components/navigation/organisms/BackHeader";
import { colors, typography } from "../../styles/theme.style";
import emptyCart from '../../assets/images/emptyCart.png';
import { useDispatch } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";
import CourseCard from "../../components/home/courseCardv2/CourseCardv2.component";

const getTitle = (type, payload) => {
    if (type == "category") {
        return payload?.item?.name
    }
    return "";
}
const CourseListing = ({ navigation, route }) => {
    const { payload, type } = route.params;
    const dispatch = useDispatch();
    const [searchResult, setResult] = useState([]);

    const courseOpened = course => {
        navigation.navigate('course', {payload: course});
      };
    

    const fetchCoursesInCategory = async () => {
        if( payload?.item?.id){
            const courses = await firestore()
          .collection("courses").where("categories", "array-contains", payload?.item?.id).get();
        return courses.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id
          }
        });
        }
        return [];
      }
    const fetchResults = async ()=>{
        dispatch(showLoader());
        try{
            if(type=="category"){
                const res= await fetchCoursesInCategory();
                setResult(res);
             }
        }catch(e){
            console.log(e);
        }
        dispatch(hideLoader());
    }

    useEffect(()=>{     
        fetchResults();
    },[])
    return (<>
        <Container>
            <BackHeader onPress={() => navigation.goBack()} text={getTitle(type, payload)} />
            <View style={{ marginHorizontal: 16, marginVertical: 10 }}>
                {searchResult?.length == 0 && <View>
                    <Image style={{ width: "100%", height: 300 }} source={emptyCart} />
                    <Text style={{
                        fontFamily: typography.fontFamilies.PRIMARY,
                        color: colors.font.DARK,
                        textAlign: 'center',
                        fontWeight: '600',
                        marginTop: 15,
                    }}>No Result found.</Text>
                </View>}
                {searchResult?.length > 0 && searchResult.map(course => (
                    <CourseCard key={course.id} course={course} clickHandler={courseOpened}></CourseCard>
                ))}
            </View>
        </Container>
    </>)
};

export default CourseListing;