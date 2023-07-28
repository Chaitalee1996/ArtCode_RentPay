import { StyleSheet, View, Modal, ActivityIndicator, Image } from 'react-native';
import React, { useEffect } from 'react'
import { COLORS } from '../../styles/theme';
import { Animated } from 'react-native';
import images from '../../constants/images';
import { ms, mvs } from 'react-native-size-matters';



const Loader = props => {

  // const spinValue = React.useState(new Animated.Value('0'))[0];



  const {
    loading,
    ...attributes
  } = props;

  useEffect(() => {

    if (loading) {

      // Animated.spring(spinValue, {
      //   toValue: 1,
      //   useNativeDriver: true,
      // }).start();

    }

    return () => {

    }
  }, [])


  // const spinDeg = spinValue.interpolate({
  //   useNativeDriver: true,
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg']
  // })

  // const animatedScaleStyle = {
  //   transform: [{ rotate: spinDeg }]
  // };




  return (
    <Modal
      transparent={true}
      animationType={'none'}
      //  visible={TRUE}
      visible={loading}
      onRequestClose={() => { console.log('close modal') }}>

      <Animated.View style={[StyleSheet.absoluteFillObject, styles.container, ]}>

        <ActivityIndicator
          size={40}
          color={COLORS.theme}
          style={{ margin: 15 }} />

        {/* <Image
          source={images.logo}
          resizeMode="contain"
          style={styles.logoImageStyle}
        /> */}

        {/*  <LottieView style={{ marginTop: 0, height: 200, width: 200, }} colorFilters={{ color: COLORS.theme }} autoSize={false} source={changeSVGColor(require('../../../assets/images/Camera_Loader.json'), COLORS.theme)} autoPlay loop /> */}

      </Animated.View>


    </Modal>

  )
}


const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    //backgroundColor: BG,

  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logoImageStyle: {
    height: mvs(40),
    width: ms(40)
  }
});
export default Loader