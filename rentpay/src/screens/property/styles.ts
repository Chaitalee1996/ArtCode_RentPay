import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { ms, mvs } from "react-native-size-matters";


export const styles = StyleSheet.create({
  ModalContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',

  },

  expenseFlatTitle: {
    //width:SIZES.cardWidth,
    alignSelf: 'center',

  },
  flatLine: {
    marginLeft: ms(5),
    height: mvs(1.5),
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width - ms(50)
  },

  //New
  createContainer: {
    marginTop: mvs(20),
    width: SIZES.width,
    alignSelf: 'center',

    flex: 1,
    borderTopStartRadius: SIZES.radius12,
    borderTopEndRadius: SIZES.radius12,
    borderColor: COLORS.greyTxt,
    borderWidth: ms(1),
    backgroundColor: COLORS.white,
    paddingTop: mvs(20),
  },


  modalInnerContainer: {
    backgroundColor: COLORS.white,
    width: SIZES.width,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mvs(20),

    borderRadius: SIZES.radius12
  },
  closeBtnContainer: {
    position: 'absolute',
    top: ms(10),
    right: ms(10)
  },

  cancelBtn: {
    height: mvs(30),
    width: ms(130),
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkGrey,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3,
    elevation: 15,

  },

  selectTenantView:{
    height:mvs(40),
    width:'100%',
     alignItems: 'center',
     justifyContent: 'center', 
     backgroundColor:COLORS.theme,
     borderTopStartRadius: SIZES.radius,
     borderTopEndRadius:SIZES.radius,
     position:'absolute',
     top:0
  },

  closeView:{
      position:'absolute',
      top:-ms(10),
      right:-ms(10),
      zIndex:1
  },
  tenantListRow:{
    paddingVertical:mvs(10),
    width:'100%',
    marginLeft:ms(15)
  }
});
