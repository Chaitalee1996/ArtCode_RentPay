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
    ModalContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',

    },


    searchContainer: {
        height: mvs(40),

        backgroundColor: COLORS.white,
        paddingHorizontal: ms(10),
        // marginLeft:ms(10),
        borderRadius: SIZES.radius,
        shadowColor: COLORS.theme,
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3,
        elevation: 15,
    },
    textContainer: {
        height: mvs(40),
        paddingHorizontal: ms(10),
    },
    addNewTenantContainer: {
        height: mvs(110),
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: ms(1.5),
        borderStyle: 'dashed',
        borderColor: COLORS.greyTxt,
        marginLeft: '3.33%',
        marginBottom: mvs(15),
        borderRadius: SIZES.radius12
    },
    tenantContainer: {
        height: mvs(110),
        width: '45%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.white,
        shadowColor: COLORS.darkGrey,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1,
        elevation: 10,
        marginLeft: '3.33%',
        marginBottom: mvs(15),
        borderRadius: SIZES.radius12,
        paddingHorizontal: ms(10),
        paddingVertical: mvs(10),

    },
    plusView: {
        height: ms(50),
        width: ms(50),
        borderRadius: ms(25),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: ms(3),
        borderColor: COLORS.theme
    },
    uploadContainer: {
        marginBottom: mvs(0),
        height: mvs(90),
        width: ms(100),
        marginTop: mvs(5),
        marginLeft: 0,
    },
    closeStyle: {
        position: 'absolute',
        top: -mvs(5),
        zIndex: 1,
        right: -ms(5),
        backgroundColor: COLORS.delete
    },
    cancelBtn: {
        height: mvs(40),
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
    shareContainer: {
        marginTop: mvs(20),
        width: SIZES.cardWidth,
        height: mvs(60),
        alignSelf: 'center',
        borderWidth: ms(1),
        borderColor: COLORS.theme,
        borderRadius: SIZES.radius20,
        marginBottom: mvs(100),
        paddingHorizontal: ms(20)
    },
    unitInputStyle: {
        height: mvs(35),
        width: SIZES.cardWidth / 2.8,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: ms(15),
        alignSelf: 'center',
        borderRadius: SIZES.radius,
        borderWidth: ms(1),
        borderColor: COLORS.theme,
        paddingVertical:mvs(0)
    },
    assetPlusView: {
        height: ms(25),
        width: ms(25),
        borderRadius: SIZES.radius / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: ms(2),
        borderColor: COLORS.theme
    },
    addAssetBtn: {
        backgroundColor: COLORS.theme,
        height:mvs(30),
        width:ms(130),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius / 2,
        alignSelf:'center',
        marginVertical:mvs(20)
    },
    assetRowContainer:{
        paddingHorizontal:ms(20),
        width:SIZES.cardWidth-ms(30),
        alignSelf:'center',
        height:mvs(30),
        marginBottom:mvs(15),
        borderRadius:SIZES.radius/2 ,
        backgroundColor:COLORS.lightWhite,
        shadowColor: COLORS.darkGrey,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 0.5,
        elevation: 5, 
    },
    collectModalInnerContainer:{
        height:SIZES.height*0.9,
        // backgroundColor:COLORS.white,
        width:SIZES.width,
        position:'absolute',
        bottom:0
    },
    closeBtn:{
        position:'absolute',
        top:0,
        right:ms(20)
    },
    cardContainer: {
        width:SIZES.cardWidth,
        paddingHorizontal:ms(10),
        paddingVertical:mvs(10),
        marginTop:mvs(40),
        backgroundColor:COLORS.white,
        alignSelf:'center',
        // shadowColor: COLORS.theme,
        // shadowOffset: {
        //   width: 3,
        //   height: 3,
        // },
        // shadowOpacity: 0.20,
        // shadowRadius: 3,
        // elevation: 15, 
        marginBottom:mvs(15)  ,
        borderRadius:SIZES.radius12  
    },
    collectRentView:{
        width:SIZES.width,
        height:'100%',
        borderTopStartRadius:SIZES.radius20,
        borderTopEndRadius:SIZES.radius20,
        backgroundColor:COLORS.white,
        paddingTop:mvs(10)
    },
    rentDepositeRowView:{
        marginTop:mvs(20),
        height:mvs(50),
        width:SIZES.width,
        borderBottomWidth:ms(1.5),
        borderColor:COLORS.lightWhite
    },
    verticalLine:{
        width:ms(1),
        backgroundColor:COLORS.lightWhite,
        height:'130%'
    },
    rentRow:{
        width:'33%', 
        alignItems: 'center',
        justifyContent: 'center', 
    }

});
