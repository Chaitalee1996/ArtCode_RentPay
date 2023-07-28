import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../styles/theme';
import {ms, mvs} from 'react-native-size-matters';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const CustomCardContainer = ({containerStyle, children}: Props) => {
  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

export default CustomCardContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: mvs(10),
    width: SIZES.cardWidth,
    alignSelf: 'center',
    paddingHorizontal: ms(10),
    paddingVertical: mvs(15),
    borderRadius: SIZES.radius12,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkGrey,
        shadowOffset: {
          width: 2,
          height: 3,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 5, 
  },
});
