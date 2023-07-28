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
    imageStyle: {
        resizeMode: "contain",
        height: SIZES.height / 2-mvs(20),
        width: SIZES.width
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: COLORS.theme,
        borderTopLeftRadius: ms(25),
        borderTopRightRadius: ms(25),
        height: SIZES.height / 2,
    },
    bottomSkipContainer: {
        backgroundColor: "#1C1FB0",
        height: mvs(75),
        width: '100%',
        position: 'absolute',
        bottom: 0,
         flexDirection: 'row', 
         alignItems: 'center',
         justifyContent:'space-between',
         paddingHorizontal:ms(20)
    }

});
