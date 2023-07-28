import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../styles/theme';

const Rail = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
  },
});

