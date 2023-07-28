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
    mobInputView: {
        width: SIZES.cardWidth-ms(20),
        height: mvs(45),
        borderWidth: ms(1),
        borderColor: COLORS.theme,
        alignSelf:'center',
        marginTop:mvs(20),
        borderRadius:SIZES.radius,
        paddingHorizontal:ms(10)
    },

    otpTxtContainer: {
        width: ms(45),
        height: ms(45),

    },
    otpinputOuterContainer: {
        alignItems: 'center',
        marginVertical: mvs(20),
        justifyContent: 'center'
    },

    box1:{
        position:'absolute',
        top:-20,
        right:-ms(150),
        borderStyle:'dashed',
        borderColor:COLORS.lightWhite,
        borderWidth:ms(1.5),
        height:mvs(100),
        width:ms(350),
        borderRadius:SIZES.radius12
    },
    box2:{
        alignSelf:'center',
        top:SIZES.height*0.15,
        borderStyle:'dashed',
        borderColor:COLORS.lightWhite,
        borderWidth:ms(1.5),
        borderRadius:SIZES.radius12,
        height:mvs(250),
        width:ms(220),
        // zIndex:1
    },
    box3:{
        position:'absolute',
        bottom:mvs(100),
        left:-ms(100),
        borderStyle:'dashed',
        borderColor:COLORS.lightWhite,
        borderWidth:ms(1.5),
        height:mvs(350),
        width:ms(220),
        borderRadius:SIZES.radius12
    },
    titleOuter:{
        position:'absolute',
        top:SIZES.height*0.13,
        left:ms(50)
    },
    whiteBox:{
        height:ms(50),
        width:ms(50),
        backgroundColor:COLORS.white,
      
    }

});
