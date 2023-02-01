/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import Button from './components/button/Button.component';
import SignedOutStack from './navigators/SignedOutStack';
import { store } from './app/store';
import { colors } from './styles/theme.style';
import ApplicationNavigator from './navigators/Application';

const App = () => {
 
  const course =  {
    id:"1",
    coverArt: "https://firebasestorage.googleapis.com/v0/b/growthbook-ec77d.appspot.com/o/assets%2FcoverArts%2Fhd-wallpaper-3021072_640.jpg?alt=media&token=91a3e5b9-31be-40dd-aaf2-51f224a6f45b",
    title: "Start Your Own Travel Busines",
    description: "Travel Methodology is a unique Degree Program, designed to shine learners life, whoever takes this course seriously and learn and understand the course properly, I gurantee, they can start their own travel business in many travel business categories, after finishing this course. Learner will have multiple options and choices to choose their desired travel industry category to start their business from sctracth.",
    rating:{
        average: 3,
        count: 10009
    },
    skills:[
      "Marketing",
      "Financial Accounting",
      "Decision Making",
      "Chain Management",
      "Human Resource (HR)"
    ],
    learning:[
      "Understand branding and go-to-market strategies",
      "Read income statements, balance sheets, and cash flow statements",
      "Manage people through motivation and reward systems",
      "services or manufacturing"
    ],
    author: {
      name: "University of Pennsylvania",
      profilePic: "https://firebasestorage.googleapis.com/v0/b/growthbook-ec77d.appspot.com/o/assets%2FcoverArts%2Fmodel-2911332_640.jpg?alt=media&token=0f229d64-2f18-47f0-90fe-dfc7983be3e0",
      bio:"The University of Pennsylvania (commonly referred to as Penn) is a private university, located in Philadelphia, Pennsylvania, United States. A member of the Ivy League, Penn is the fourth-oldest institution of higher education in the United States, and considers itself to be the first university in the United States with both undergraduate and graduate studies."
    },
    syllabus:[
      {
        id: "1",
        title: "Introduction",
        child: [
          {
            id: "2",
            title: "Case Short Intro",
            type: "audio",
            contentId: "13"
          },
          {
            id: "3",
            title: "What is BSP & Travel License Class 3",
            type :"material",
            contentId: "234"
          },
          {
            id: "4",
            title: "How do Airlines operate?",
            type: "quiz",
            contentId: "134"
          }
        ]
      },
      {
        id: "5",
        title: "Chapter 1",
        child: [
          {
            id: "6",
            title: "Case Short Advanced",
            type: "audio",
            contentId: "1342"
          },
          {
            id: "7",
            title: "Learning Material",
            type: "material",
            contentId: "233222"
          },
          {
            id: "8",
            title: "Quiz Last",
            type: "quiz",
            contentId: "234053"
          }
        ]
      },
      {
        id: "9",
        title: "Chapter 2",
        child: [
          {
            id: "10",
            title: "Case Short Advanced",
            type: "audio",
            contentId: "1342"
          },
          {
            id: "11",
            title: "Learning Material",
            type: "material",
            contentId: "233222"
          },
          {
            id: "12",
            title: "Quiz Last",
            type: "quiz",
            contentId: "234053"
          }
        ],
        authorName: "Mike Russel",
      }
    ]
};

  return (
    <Provider store={store}>
       <SafeAreaProvider>
      <ApplicationNavigator></ApplicationNavigator>
    </SafeAreaProvider>
    </Provider>
  );
};

export default App;
