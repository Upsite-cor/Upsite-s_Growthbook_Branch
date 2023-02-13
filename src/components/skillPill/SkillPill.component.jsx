import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, typography} from '../../styles/theme.style';
import Icon from 'react-native-vector-icons/Entypo';

const SkillPill = ({skill, clickHandler}) => {
  return (
    <TouchableOpacity onPress={()=>{clickHandler(skill)}}>
      <View style={styles.pill} onPress>
      <Text style={styles.learningText}>{skill}</Text>
    </View>
    </TouchableOpacity>
  );
};

const LearningItem = ({learning}) => {
  return (
    <View style={styles.learningPill}>
      <Icon style={{color: '#248A3D'}} name="check" size={16} />
      <Text>{learning}</Text>
    </View>
  );
};

const SkillPillHolder = ({skills = [], supporticons = false, clickHandler}) => {
  return (
    <>
      {supporticons && (
        <View style={styles.learningContainer}>
          {skills.map((item, index) => (
            <LearningItem key={index} learning={item} />
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
    gap: 10,
  },
  learningContainer: {
    gap:10
  },
  learningPill: {
    flexDirection: 'row',
    gap: 15,
  },
  text: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '400',
    fontSize: 14,
    color: colors.font.PRIMARY,
    lineHeight: 22,
  },
  learningText: {
    fontFamily: typography.fontFamilies.PRIMARY,
    fontWeight: '400',
    fontSize: 14,
    color: colors.font.PRIMARY,
    lineHeight: 22,
  },
  pill: {
    backgroundColor: '#EEEEEE',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 4,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {SkillPillHolder};
export default SkillPill;
