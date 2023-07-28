import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENUMS_ASYNCH } from '../../constants/enums';
import screenNames from '../../constants/screenNames';
import images from '../../constants/images';
import { ms, mvs } from 'react-native-size-matters';
import { COLORS, SIZES } from '../../styles/theme';
import { CustomStatusBar } from '../../components/custom';

type Props = {}

const Splash = (props: Props) => {

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();


  useEffect(() => {
    navigate();

  }, []);

  const navigate = () => {
    setTimeout(async () => {
      const splash = await AsyncStorage.getItem(ENUMS_ASYNCH.SPLASH_MODAL);

      if (splash == ENUMS_ASYNCH.SPLASH_MODAL) {
        const userID = await AsyncStorage.getItem(ENUMS_ASYNCH.USER_ID);
        if (userID) {
          // dispatch(__userIdChange(userID));
          navigation.replace(screenNames.BOTTOM_TAB);
        } else {
          navigation.replace(screenNames.LOGIN);
        }

      } else {
        navigation.replace(screenNames.SPLASH_MODAL);
      }
    }, 2000);
  };


  return (
    <View style={styles.imageContainerStyle}>
       <CustomStatusBar color={COLORS.white} />
      <Image
        source={images.splashLogo}
        resizeMode="contain"
        style={styles.logoImageStyle}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  logoImageStyle: {
    height: mvs(200),
    width: SIZES.cardWidth - ms(60),
  },
  imageContainerStyle: {
    flex: 1,
    backgroundColor:COLORS.white,
    height: SIZES.height,
    width: SIZES.width,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash