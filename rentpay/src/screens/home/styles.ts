import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { ms, mvs } from "react-native-size-matters";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.theme,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    headerContainer: {
        height: mvs(90),
        // backgroundColor: COLORS.theme,
        width:SIZES.width,
       paddingTop:mvs(15)

    },
    dottedLine:{
        borderStyle:'dashed',
        borderWidth:ms(1),
        width: '100%',
        borderColor:COLORS.greyTxt,
        position:'absolute',
        bottom:0
    },
    categoryContainer: {
        marginLeft: '2.5%',
        marginBottom: mvs(13),
        width: '30%',
        height: mvs(120),
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.theme,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      todayBtn:{
        height:mvs(30),
        width:ms(70),
         alignItems: 'center',
         justifyContent: 'center', 
         borderRadius:SIZES.radius/2,
         marginRight:ms(15)
      },
      cardIconImgStyle:{
        height:mvs(30),
        width:ms(45),
        resizeMode:'contain',
      }

});
