import React from 'react';
import {View} from 'react-native';
import courseNoSyllabus from '../../../assets/images/courseNoSyllabus.png';

import ErrorMessage from '../../exceptions/atoms/ErrorMessage.component';
import TableContentItem from '../atoms/TableContentItem.component';

const TableOfContent = ({content, onPress, style}) => {
  return (
    <View style={style}>
      {(content == null || content.length <= 0) && (
        <ErrorMessage imageSource={courseNoSyllabus} text={"Instructor has no uploaded the syllabus for this course. Please check again."}/>
      )}
      {content?.length > 0 && (
        <View>
          {content.map((chapter, index) => (
            <TableContentItem key={index} item={chapter} onPress={onPress} />
          ))}
        </View>
      )}
    </View>
  );
};

export default TableOfContent;
