import {Dimensions} from 'react-native';
import {
  scale as sc,
  moderateScale as ms,
  moderateVerticalScale as mvs,
  verticalScale as vs,
} from 'react-native-size-matters';
const {width, height, fontScale} = Dimensions.get('window');

const COLORS = {
  theme:"#324cd3",

  bgTheme:'#F9FAFA',

  topTabColor: '#282B3E',
  orange: '#FEA47E',

  yellow: '#FED47E',
  green: '#24AA6F',
  red: '#DA514B',
  voilet: '#353871',

  redBtn: '#AE3B4A',

  delete:"#E92F2F",

  lightVoilet: '#B5B8FF',
  lightRed: '#FFD6D4',
  lightGreen: '#D7FDEC',

  greyTxt: '#87859A',
  // greyTxt: '#8D90B2',

  darkGrey:"#222222",

  

  lightWhite:"#E0E0E0",
  tabTxt:"#87859A",

  white: '#FFFFFF',
  black: '#000000',

  transparent: 'transparent',
  
};

const SIZES = {
  // global sizes

  radius: ms(10),
  radius12: ms(12),
  radius15: ms(15),
  radius20: ms(20),

  padding20: ms(20),
  padding15: ms(15),
  padding: ms(10),

  largeTitle: ms(40),
  heading: ms(28),
  f30: ms(30),
  f24: ms(24),
  f22: ms(22),
  f20: ms(20),
  f18: ms(18),
  f16: ms(16),
  f14: ms(14),
  f12: ms(12),
  f10: ms(10),

  // app dimensions
  width,
  height,

  //card
  cardWidth: width - ms(30),

  //btn
  btnSize: (width - ms(30)) / 2 - ms(10),

  marginVertical: mvs(20),
  paddingHorizontal: ms(15),
};

const FONTS = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extraBold: 'Poppins-ExtraBold',
  // regular: 'SegoeUI-Light',
  // medium: 'Segoe-Regular',
  // semiBold: 'SegoeUI-SemiBold',
  // bold: 'SegoeUI-Bold',
  // extraBold: 'Poppins-ExtraBold',
};

export {COLORS, FONTS, SIZES};
