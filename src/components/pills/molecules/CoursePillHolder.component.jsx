import React from 'react';
import {View, StyleSheet} from 'react-native';
import {layout} from '../../../styles/theme.style';
import LearningPill from '../atoms/LearningPill.component';

import SkillPill from '../atoms/SkillPill.component';


const CoursePillHolder = ({skills = [], supporticons = false, clickHandler}) => {
  return (
    <>
      {supporticons && (
        <View style={styles.learningContainer}>
          {skills.map((item, index) => (
            <LearningPill key={index} learning={item} />
          ))}
        </View>
      )}

      {!supporticons && (
        <View style={styles.skillContainer}>
          {skills.map((item, index) => (
            <SkillPill key={index} skill={item} clickHandler={clickHandler} />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.gap.INTERNAL,
  },
  learningContainer: {
    gap: layout.gap.INTERNAL,
  },
});

export default CoursePillHolder;
