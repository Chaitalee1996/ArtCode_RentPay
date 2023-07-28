import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../styles/theme";
import { ms, mvs } from "react-native-size-matters";


export const styles = StyleSheet.create({

  profileView: {
    // width:SIZES.cardWidth
  },
  imageStyle: {
    height: mvs(100),
    width: ms(100),
    resizeMode: 'cover',
    backgroundColor: "#F0F0F0",
    borderRadius: SIZES.radius,

  },
  imageEdit: {
    position: 'absolute',
    top: -ms(10),
    right: -ms(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: ms(20),
    width: ms(20),
    borderRadius: SIZES.radius,
    borderColor: COLORS.theme,
    borderWidth: ms(1),
  },
  profileEdit: {
    position: 'absolute',
    top: -ms(10),
    right: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: ms(20),
    width: ms(20),
    borderRadius: SIZES.radius,
    borderColor: COLORS.theme,
    borderWidth: ms(1),
  },
  closeBtnDisable: {
    position: 'absolute',
    top: -ms(10),
    right: ms(10),
    zIndex: 1
  },
  restoreContainer: {
    height: mvs(40),
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderBottomStartRadius: SIZES.radius,
    borderBottomEndRadius: SIZES.radius,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
   
  }

});
