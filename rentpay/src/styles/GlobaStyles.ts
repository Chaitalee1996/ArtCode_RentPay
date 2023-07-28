import {StyleSheet} from 'react-native';
import { COLORS, FONTS, SIZES } from './theme';
import { ms, mvs } from 'react-native-size-matters';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.bgTheme,
  },
  ph20:{
paddingHorizontal:ms(20)
  },
  selfCenter: {
    alignSelf: 'center',
  },
  alignJustifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toastMessage: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontFamily: FONTS.medium,
  },

  menuContainer:{
     alignItems: 'center',
     justifyContent: 'center', 
     height:mvs(35)
  },
  ModalContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',

  },

  modalInnerContainer: {
    backgroundColor: COLORS.white,
    width: SIZES.cardWidth-ms(40),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mvs(10),

    borderRadius: SIZES.radius12
  },

  flatLine:{
    marginVertical:mvs(10),
    height: mvs(1.5),
    backgroundColor: COLORS.lightWhite,
    width: '100%'
  },
 


  headerContainer: {
    height: mvs(80),
    // backgroundColor: COLORS.theme,
    width:SIZES.width,
   paddingTop:mvs(15)

},

inputStyle: {
  height: mvs(45),
  width: SIZES.cardWidth,
  backgroundColor: COLORS.white,
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingHorizontal: ms(15),
  marginTop: mvs(5),
  alignSelf: 'center',
  borderRadius: SIZES.radius,
  borderWidth: ms(1),
  borderColor: COLORS.lightWhite,
  
},
inputStyleModal: {
  height: mvs(45),
  width: SIZES.cardWidth-ms(30),
  backgroundColor: COLORS.white,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: ms(15),
  marginTop: mvs(5),
  alignSelf: 'center',
  borderRadius: SIZES.radius,
  borderWidth: ms(1),
  borderColor: COLORS.lightWhite,

},
dropDownStyle: {
  height: mvs(45),
  width: SIZES.cardWidth,
  backgroundColor: COLORS.white,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: ms(15),
  marginTop: mvs(5),
  alignSelf:'center',
  borderRadius:SIZES.radius,
  borderWidth:ms(1),
  borderColor:COLORS.lightWhite
},
dropDownStyleRow: {
  borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
  backgroundColor: COLORS.white
},

dottedLine:{
  borderStyle:'dashed',
  borderWidth:ms(1),
  width: '100%',
  borderColor:COLORS.greyTxt,
  position:'absolute',
  bottom:0
},
dottedLineContainer:{
  // alignItems: 'center', 
  // justifyContent: 'center',
  width: SIZES.width,
  position: 'absolute',
  bottom: 0,


},

    //   TEXT STYLES
  //!BOLD THEME
  txtB10THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f10,
    fontFamily: FONTS.bold,
  },
  txtB12THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f12,
    fontFamily: FONTS.bold,
  },
  txtB14THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f14,
    fontFamily: FONTS.bold,
  },
  txtB16THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f16,
    fontFamily: FONTS.bold,
  },
  txtB18THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f18,
    fontFamily: FONTS.bold,
  },
  txtB20THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f20,
    fontFamily: FONTS.bold,
  },
  txtB22THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f22,
    fontFamily: FONTS.bold,
  },
  txtB24THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f24,
    fontFamily: FONTS.bold,
  },

//!Semibold theme
  txtSB12THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f12,
    fontFamily: FONTS.semiBold,
  },
  txtSB14THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f14,
    fontFamily: FONTS.semiBold,
  },
  txtSB16THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f16,
    fontFamily: FONTS.semiBold,
  },
  txtSB18THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f18,
    fontFamily: FONTS.semiBold,
  },
  txtSB20THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f20,
    fontFamily: FONTS.semiBold,
  },
  txtSB22THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f22,
    fontFamily: FONTS.semiBold,
  },
  txtSB24THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f24,
    fontFamily: FONTS.semiBold,
  },
//!Medium theme
  txtM12THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f12,
    fontFamily: FONTS.medium,
  },
  txtM14THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f14,
    fontFamily: FONTS.medium,
  },
  txtM16THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f16,
    fontFamily: FONTS.medium,
  },
  txtM18THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f18,
    fontFamily: FONTS.medium,
  },
  txtM20THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f20,
    fontFamily: FONTS.medium,
  },
  txtM22THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f22,
    fontFamily: FONTS.medium,
  },
  txtM24THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f24,
    fontFamily: FONTS.medium,
  },

  //!Regular theme
  txtR12THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f12,
    fontFamily: FONTS.regular,
  },
  txtR14THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f14,
    fontFamily: FONTS.regular,
  },
  txtR16THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f16,
    fontFamily: FONTS.regular,
  },
  txtR18THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f18,
    fontFamily: FONTS.regular,
  },
  txtR20THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f20,
    fontFamily: FONTS.regular,
  },
  txtR22THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f22,
    fontFamily: FONTS.regular,
  },
  txtR24THEME: {
    color: COLORS.theme,
    fontSize: SIZES.f24,
    fontFamily: FONTS.regular,
  },

  //!BOLD WHITE
  txtB10White: {
    color: COLORS.white,
    fontSize: SIZES.f10,
    fontFamily: FONTS.bold,
  },
  txtB12White: {
    color: COLORS.white,
    fontSize: SIZES.f12,
    fontFamily: FONTS.bold,
  },
  txtB14White: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    fontFamily: FONTS.bold,
  },
  txtB16White: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontFamily: FONTS.bold,
  },
  txtB18White: {
    color: COLORS.white,
    fontSize: SIZES.f18,
    fontFamily: FONTS.bold,
  },
  txtB20White: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    fontFamily: FONTS.bold,
  },
  txtB22White: {
    color: COLORS.white,
    fontSize: SIZES.f22,
    fontFamily: FONTS.bold,
  },
  txtB24White: {
    color: COLORS.white,
    fontSize: SIZES.f24,
    fontFamily: FONTS.bold,
  },
  //!SEMI-BOLD WHITE
  txtSB12White: {
    color: COLORS.white,
    fontSize: SIZES.f12,
    fontFamily: FONTS.semiBold,
  },
  txtSB14White: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    fontFamily: FONTS.semiBold,
  },
  txtSB16White: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontFamily: FONTS.semiBold,
  },
  txtSB18White: {
    color: COLORS.white,
    fontSize: SIZES.f18,
    fontFamily: FONTS.semiBold,
  },
  txtSB20White: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    fontFamily: FONTS.semiBold,
  },
  txtSB22White: {
    color: COLORS.white,
    fontSize: SIZES.f22,
    fontFamily: FONTS.semiBold,
  },
  txtSB24White: {
    color: COLORS.white,
    fontSize: SIZES.f24,
    fontFamily: FONTS.semiBold,
  },
  //!MEDIUM WHITE
  txtM12White: {
    color: COLORS.white,
    fontSize: SIZES.f12,
    fontFamily: FONTS.medium,
  },
  txtM14White: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    fontFamily: FONTS.medium,
  },
  txtM16White: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontFamily: FONTS.medium,
  },
  txtM18White: {
    color: COLORS.white,
    fontSize: SIZES.f18,
    fontFamily: FONTS.medium,
  },
  txtM20White: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    fontFamily: FONTS.medium,
  },
  txtM22White: {
    color: COLORS.white,
    fontSize: SIZES.f22,
    fontFamily: FONTS.medium,
  },
  txtM24White: {
    color: COLORS.white,
    fontSize: SIZES.f24,
    fontFamily: FONTS.medium,
  },
  //!REGULAR WHITE
  txtR12White: {
    color: COLORS.white,
    fontSize: SIZES.f12,
    fontFamily: FONTS.regular,
  },
  txtR14White: {
    color: COLORS.white,
    fontSize: SIZES.f14,
    fontFamily: FONTS.regular,
  },
  txtR16White: {
    color: COLORS.white,
    fontSize: SIZES.f16,
    fontFamily: FONTS.regular,
  },
  txtR18White: {
    color: COLORS.white,
    fontSize: SIZES.f18,
    fontFamily: FONTS.regular,
  },
  txtR20White: {
    color: COLORS.white,
    fontSize: SIZES.f20,
    fontFamily: FONTS.regular,
  },
  txtR22White: {
    color: COLORS.white,
    fontSize: SIZES.f22,
    fontFamily: FONTS.regular,
  },
  txtR24White: {
    color: COLORS.white,
    fontSize: SIZES.f24,
    fontFamily: FONTS.regular,
  },

  //!MEDIUM GREY
  txtM12Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f12,
    fontFamily: FONTS.medium,
  },
  txtM14Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f14,
    fontFamily: FONTS.medium,
  },
  txtM16Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f16,
    fontFamily: FONTS.medium,
  },
  txtM18Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f18,
    fontFamily: FONTS.medium,
  },
  txtM20Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f20,
    fontFamily: FONTS.medium,
  },
  txtM22Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f22,
    fontFamily: FONTS.medium,
  },
  txtM24Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f24,
    fontFamily: FONTS.medium,
  },
  //!SEMI BOLD GREY
  txtSB12Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f12,
    fontFamily: FONTS.semiBold,
  },
  txtSB14Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f14,
    fontFamily: FONTS.semiBold,
  },
  txtSB16Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f16,
    fontFamily: FONTS.semiBold,
  },
  txtSB18Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f18,
    fontFamily: FONTS.semiBold,
  },
  txtSB20Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f20,
    fontFamily: FONTS.semiBold,
  },
  txtSB22Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f22,
    fontFamily: FONTS.semiBold,
  },
  txtSB24Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f24,
    fontFamily: FONTS.semiBold,
  },
  //!REGULAR GREY
  txtR10Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f10,
    fontFamily: FONTS.regular,
  },
  txtR12Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f12,
    fontFamily: FONTS.regular,
  },
  txtR14Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f14,
    fontFamily: FONTS.regular,
  },
  txtR16Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f16,
    fontFamily: FONTS.regular,
  },
  txtR18Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f18,
    fontFamily: FONTS.regular,
  },
  txtR20Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f20,
    fontFamily: FONTS.regular,
  },
  txtR22Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f22,
    fontFamily: FONTS.regular,
  },
  txtR24Grey: {
    color: COLORS.greyTxt,
    fontSize: SIZES.f24,
    fontFamily: FONTS.regular,
  },


  //!MEDIUM  Dark GREY
  txtM12DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f12,
    fontFamily: FONTS.medium,
  },
  txtM14DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f14,
    fontFamily: FONTS.medium,
  },
  txtM16DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f16,
    fontFamily: FONTS.medium,
  },
  txtM18DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f18,
    fontFamily: FONTS.medium,
  },
  txtM20DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f20,
    fontFamily: FONTS.medium,
  },
  txtM22DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f22,
    fontFamily: FONTS.medium,
  },
  txtM24DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f24,
    fontFamily: FONTS.medium,
  },


  //!REgular  Dark GREY
  txtR10DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f10,
    fontFamily: FONTS.regular,
   
  },
  txtR12DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f12,
    fontFamily: FONTS.regular,
   
  },
  txtR14DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f14,
    fontFamily: FONTS.regular,
  },
  txtR16DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f16,
    fontFamily: FONTS.regular,
  },
  txtR18DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f18,
    fontFamily: FONTS.regular,
  },
  txtR20DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f20,
    fontFamily: FONTS.regular,
  },
  txtR22DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f22,
    fontFamily: FONTS.regular,
  },
  txtR24DG: {
    color: COLORS.darkGrey,
    fontSize: SIZES.f24,
    fontFamily: FONTS.regular,
  },




});
