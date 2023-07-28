import { ImageSourcePropType, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { ms, mvs } from 'react-native-size-matters';
import { COLORS } from '../../styles/theme';

type Props = {
    containerStyle?: StyleProp<ViewStyle>;
    imageUrl:ImageSourcePropType
  };




const CustomLottieView : React.FC<Props> = ({
    containerStyle,
    imageUrl
    
  }) => {
  return (
    <LottieView
    style={[styles.Lottiew,containerStyle]}
    autoSize={false}
    source={imageUrl}
    autoPlay
    loop
    resizeMode='cover'
  />
  )
}

export default CustomLottieView

const styles = StyleSheet.create({
    Lottiew:{
        height:Platform.OS=="android"?mvs(120): mvs(120),
        width: '100%',
        alignSelf:'center',
        // backgroundColor:COLORS.greyTxt
    }
})