import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ms, mvs} from 'react-native-size-matters';
import {GlobalStyles} from '../styles/GlobaStyles';
import {COLORS, FONTS, SIZES} from '../styles/theme';

type Props = {
  focused: boolean;
  icon: React.ReactNode;
  title: string;
  count?: number;
};

const TabIcon: React.FC<Props> = ({focused, icon, title, count}) => {
  return (
    <View style={styles.iconContainer}>
      <View style={{marginBottom: mvs(5)}}>
        {icon}

      </View>
      <Text
        style={{
          ...styles.txt,
          color: focused ? COLORS.theme : COLORS.greyTxt,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS == 'android' ? mvs(60) : mvs(70),
  },
  txt: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.f12,
  },
 
  badgetxt: {
    fontFamily: FONTS.medium,
    fontSize: ms(9),
    color: COLORS.white,
  },
});
