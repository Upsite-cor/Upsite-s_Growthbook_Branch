import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ErrorMessage from "../../components/exceptions/atoms/ErrorMessage.component";
import BackHeader from "../../components/headers/BackHeader.component";
import Container from "../../components/layout/Container2.component";
import { layout } from "../../styles/theme.style";
import emptyCart from '../../assets/images/emptyCart.png';
import CourseSlimCard from "../../components/cards/atoms/CourseSlimCard.component";
import CourseService from "../../services/courses/Course.service";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../features/loader/loaderSlice";

const CourseListing = ({ navigation, route }) => {
    const { payload, type } = route.params;
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();
    const fetchResults = async () => {
        try{
            dispatch(showLoader());
            var localCourses = [];
            try {
                if (payload?.item?.id) {
                    localCourses = await CourseService.getCoursesInCategory(payload.item.id);
                }
            } catch (error) {}
            setCourses([...localCourses]);
        }catch(error){

        }finally{
            dispatch(hideLoader());
        }
    }
    const courseOpened = course => {
        navigation.navigate('course', { payload: course });
    };
    useEffect(() => {
        fetchResults();
    }, [])
    return (
        <Container>
            <View style={{ flex: 1, paddingHorizontal: layout.padding.HORIZONTAL, paddingVertical: layout.padding.VERTICAL, gap: layout.gap.NEIGHBORS }}>
                <BackHeader onPress={() => navigation.goBack()} text={payload?.item?.name} />
                {courses?.length == 0 && <ErrorMessage imageSource={emptyCart} text={"No Result found."} />}
                {courses?.length > 0 && courses.map(course => (
                    <CourseSlimCard key={course.id} course={course} clickHandler={courseOpened}></CourseSlimCard>
                ))}
            </View>
        </Container>
    )
};

export default CourseListing;