import React from 'react';
import { Text, View, Image } from "react-native";
import growthbookLogo2 from '../../assets/images/growthbookLogo-2.png'
import globalStylesheet from '../../styles/global.style'
import homeScreenStylesheet from './HomeScreen.style';
import Container from '../../components/layout/container/Container.component';

import CategoryBox from '../../components/home/categoryList/CategoryList.component';
import ActionHeader from '../../components/layout/actionHeader/ActionHeader.component';
import SearchButton from '../../components/home/searchButton/SearchButton.component';
import CourseCard from '../../components/home/courseCard/CourseCard.component';
import CourseList from '../../components/home/courseList/CourseList.component';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const HomeScreen = () => {

    
    const pills = [
        { id: "1", title: 'Entertainment'},
        { id: "2", title: 'Travel'},
        { id: "3", title: 'Trade'},
        { id: "4", title: 'Food'},
        { id: "5", title: 'Information Technology'},
        { id: "6", title: 'Small Business'},
      ];
      
    const getId= (cat) =>{
        alert("Pill" + cat.id+ "clicked")
    }

    const courses = [
        {
            id:"1",
            coverArt: "https://firebasestorage.googleapis.com/v0/b/growthbook-ec77d.appspot.com/o/assets%2FcoverArts%2Fhd-wallpaper-3021072_640.jpg?alt=media&token=91a3e5b9-31be-40dd-aaf2-51f224a6f45b",
            title: "Start Your Own Travel Busines",
            authorName: "Mike Russel",
            rating:{
                average: 3,
                count: 10009
            }
        },
        {
            id:"2",
            coverArt: "https://firebasestorage.googleapis.com/v0/b/growthbook-ec77d.appspot.com/o/assets%2FcoverArts%2Famerica-3125467_640.jpg?alt=media&token=da53b135-ba32-4a01-bba1-c7668b24d4e7",
            title: "How to Budget and Forecast for Your Business",
            authorName: "UCLA Business School of Studies",
            rating:{
                average: 4.5,
                count: 231
            }
        },
        {
            id:"3",
            coverArt: "https://firebasestorage.googleapis.com/v0/b/growthbook-ec77d.appspot.com/o/assets%2FcoverArts%2Fchess-4794265_640.jpg?alt=media&token=f58745ea-948b-4e5b-b358-c8e5d1768770",
            title: "Leadership: Practical Leadership Skills",
            authorName: "David Ochi",
            rating:{
                average: 5,
                count: 243
            }
        }
    ] 

    return (
        <Container>
            <View style={[globalStylesheet.centered, homeScreenStylesheet.logo]}>
                <Image style={{ width: 218, height: 45 }} source={growthbookLogo2} />
            </View>
            <Text style={globalStylesheet.heading}>Explore</Text>
            <SearchButton/>
            <ActionHeader heading={"Categories"}/>
            <CategoryBox categories={pills}/>
            <ActionHeader heading={"Latest Courses"}/>
            <CourseList courses={courses}/>
            <ActionHeader heading={"Popular Courses"}/>
            <CourseList courses={[...courses.slice().reverse()]}/>
        </Container>
    );
};