import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { ms, mvs } from "react-native-size-matters";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: mvs(30),
    alignItems: 'center',
    //  justifyContent: 'center', 

  },
  planCard: {
    width: SIZES.cardWidth-ms(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:ms(1),
    marginBottom:mvs(15),
    paddingTop:mvs(10),
    borderRadius:SIZES.radius15
  },
  cardBottomView:{
    position:'absolute',
    bottom:-ms(2),
    height:ms(35),
    width:'100%',
    borderBottomStartRadius:SIZES.radius15,
    borderBottomEndRadius:SIZES.radius15,
     alignItems: 'center',
     justifyContent: 'center', 
  },
  modalInnerContainer: {
    backgroundColor: COLORS.white,
    width: SIZES.cardWidth-ms(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: mvs(10),
    borderRadius: SIZES.radius12
  },
  closeView:{
    top:-mvs(25),
    height:ms(50),
    width:ms(50),
    borderRadius:SIZES.radius20*2,
    backgroundColor: COLORS.white,
     alignItems: 'center',
     justifyContent: 'center', 
  }
  
});
