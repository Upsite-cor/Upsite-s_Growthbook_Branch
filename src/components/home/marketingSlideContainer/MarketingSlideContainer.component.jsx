import React, {useRef, useState} from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'react-native';
import MarketingSlide from '../marketingSlide/MarketingSlide.component';
import MarketingSlideContainerStylesheet from './MarketingSlideContainer.style';

const viewConfigRef = {viewAreaCoveragePercentageThreshold: 95, itemVisiblePercentThreshold:95}

const MarketingSlideContainer = () => {
    const data = ["first", "second", "third"];
    const [currentIndex, setCurrentIndex] = useState(0)
    let flatListRef = useRef();
    const onViewRef = useRef(({changed})=> {
        if(changed[0].isViewable){
            setCurrentIndex(changed[0].index)
        }
    })

    const scrollToIndex = (index) =>{
        flatListRef.current?.scrollToIndex({animated: true, index: index})
    }
  return (
    <View style={MarketingSlideContainerStylesheet.container}>
        <FlatList style={MarketingSlideContainerStylesheet.listItem} 
        data={data}
        renderItem={({ item }) => <MarketingSlide slideNum={item}/>}
        horizontal
        keyExtractor={(item, index)=> item}
        showsHorizontalScrollIndicator={false}
        ref={(ref)=>{
            flatListRef.current = ref;
        }}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
        pagingEnabled/>

<View style={MarketingSlideContainerStylesheet.dotView}>
            {data.map(({}, index)=> (
                <TouchableOpacity onPress={()=> {scrollToIndex(index)}} style={[MarketingSlideContainerStylesheet.circle, {
                    backgroundColor: index==currentIndex? "#fff":  "#ffffff33"
                }]} key={index.toString()}>
                    
                </TouchableOpacity>
            ))}
            </View>
        </View>
  )
}


export default MarketingSlideContainer