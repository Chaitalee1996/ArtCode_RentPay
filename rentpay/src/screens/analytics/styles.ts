import { Platform, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { ms, mvs } from "react-native-size-matters";


export const styles = StyleSheet.create({

    categoryContainer: {
        marginLeft: '2.5%',
        // marginBottom: mvs(13),
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
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SIZES.cardWidth,
        alignSelf: 'center'
    },
    dateLine: {
        height: mvs(4),
        width: ms(50),
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.greyTxt
    },
    filterBottomBtn: {
        position: 'absolute',
        bottom: mvs(90),
        right: ms(20),
        height: ms(50),
        width: ms(50),
        borderRadius: ms(30),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.theme
    },
    listHeaderContainer: {
        width: SIZES.width,
        height: mvs(40),
        paddingHorizontal: ms(10),
        paddingVertical: mvs(5),
        backgroundColor: COLORS.white,
        borderTopWidth: ms(1),
        borderBottomWidth: ms(1),
        borderColor: COLORS.lightWhite,
        marginTop: mvs(1)
    },
    listFooterContainer: {
        width: SIZES.width,
        height: mvs(40),
        paddingHorizontal: ms(10),
        paddingVertical: mvs(5),
        backgroundColor: COLORS.white,
        borderTopWidth: ms(1),
        borderBottomWidth: ms(1),
        borderColor: COLORS.lightWhite

    },
    listRowContainer: {
        width: SIZES.width,
        paddingHorizontal: ms(10),
        paddingVertical: mvs(7),

    },
    cellContainer: {
        alignItems: 'center',
        width: '25%',
        paddingLeft: ms(3)
    },
    filterContainer: {
        width: SIZES.width,
        height: Platform.OS == 'android' ? SIZES.height - mvs(200) : SIZES.height - mvs(220),
        backgroundColor: COLORS.white,
        shadowColor: COLORS.theme,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5,
        elevation: 20,
    },
    applyBottomView: {
        position: 'absolute',
        bottom: 0,
        borderTopWidth: ms(1),
        borderTopColor: COLORS.lightWhite,
        width: SIZES.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: ms(30),
        height: mvs(70),
        zIndex: 10,
        overflow: 'hidden',
        backgroundColor: COLORS.white
    },
    clearBtn: {
        height: mvs(40),
        width: ms(130),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: ms(1),
        borderColor: COLORS.theme,
        borderRadius: SIZES.radius
    },
    applyBtn: {
        height: mvs(40),
        width: ms(130),
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: SIZES.radius,
        backgroundColor: COLORS.theme
    },
    propertyLabelView: {
        width: '40%',
        alignItems: 'center',
        borderRightWidth: ms(1),
        borderColor: COLORS.theme,
        height: '100%'
    },
    propertyListView: {
        width: '60%',
        height: '100%',
        paddingBottom: mvs(75)
    },
    propertyLableContainer: {
        alignItems: 'center',
        paddingVertical: mvs(13),
        borderBottomColor: COLORS.lightWhite,
        borderBottomWidth: ms(1.5),
        width: '100%'
    },
    properyFlatrow: {
        alignItems: 'center',
        paddingVertical: mvs(8),
        flexDirection: 'row',
        width: '100%'
    },
    tickView: {
        marginRight: mvs(10),
        height: ms(25),
        width: ms(25),
        borderRadius: SIZES.radius * 0.25,
        borderWidth: ms(2),
        borderColor: COLORS.greyTxt
    },
    searchBtn: {
        height: mvs(45),
        width: ms(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: ms(1),
        borderColor: COLORS.lightWhite,
        marginTop: mvs(5),
    },
    getPoliceReportBottomBtn: {
        width:SIZES.width,
        position: 'absolute',
        bottom: mvs(70),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
         backgroundColor:COLORS.white
    }


});
