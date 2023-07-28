import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../styles/theme';
import {ms, mvs} from 'react-native-size-matters';
import {GlobalStyles} from '../../styles/GlobaStyles';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const CustomThemeButton: React.FC<Props> = ({
  containerStyle,
  title,
  titleStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.btnStyle, containerStyle]}
      onPress={onPress}>
      <Text style={[styles.txt, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomThemeButton;

const styles = StyleSheet.create({
  btnStyle: {
    height: mvs(45),
    width: ms(230),
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    marginVertical:mvs(10)
  },
  txt: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontFamily: FONTS.semiBold,
  },
});
