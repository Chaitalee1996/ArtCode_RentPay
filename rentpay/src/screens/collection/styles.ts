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
    }
});
