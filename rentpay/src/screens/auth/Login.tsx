import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, StatusBar, Text, TextInput, Keyboard, Alert, BackHandler, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheet } from '../../components/uiCommon';
import { BottomSheetRefProps } from '../../components/uiCommon/BottomSheet';
import { COLORS, SIZES } from '../../styles/theme';
import { GlobalStyles } from '../../styles/GlobaStyles';
import { ms, mvs } from 'react-native-size-matters';
import { CustomThemeButton } from '../../components/custom';
import { styles } from './styles';
import Icons from 'react-native-vector-icons/AntDesign'
import OTPTextView from 'react-native-otp-textinput';
import { useNavigation } from '@react-navigation/native';
import screenNames from '../../constants/screenNames';
import { showError, showSuccess } from '../../components/uiCommon/FlashToast';
import { POSTMethod } from '../../services/config/apiMethods/CommonMethods';
import axiosInstance from '../../services/config/helpers/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENUMS_ASYNCH } from '../../constants/enums';
import { useDispatch } from 'react-redux';
import { __loadingChange } from '../../services/redux/loadingSlice';

type Props = {}

const MINIMUM_SCROLL = -mvs(250)
const MAX_SCROLL = -SIZES.height * 0.85;

const screen = {
  LOGIN: "Login",
  OTP: "Otp"
}

const Login = () => {

  const ref = useRef<BottomSheetRefProps>(null);
  const [scrollHeight, setScrollHeight] = useState(MINIMUM_SCROLL);
  const [mobileNo, setMobileNo] = useState('');
  const [otpScreen, setOtpScreen] = useState("Login");
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);

  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();


  useEffect(() => {
    // ref?.current?.scrollTo(0);
    ref?.current?.scrollTo(MINIMUM_SCROLL);
    // setScrollHeight(MINIMUM_SCROLL);
  }, [])

  useEffect(() => {
    const backAction = () => {
      // console.log("1st==>", otpScreen)
      if (otpScreen == screen.LOGIN) {
        console.log(otpScreen)
        ref?.current?.scrollTo(MINIMUM_SCROLL);
        setScrollHeight(MINIMUM_SCROLL);
        setOtpScreen(screen.LOGIN);

      } else {
        console.log("else==>", otpScreen)
        setOtpScreen(screen.LOGIN);
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, []);

  useEffect(() => {

    const subscribe = setTimeout(() => {
      if (timer == 0) {
        setTimer(0);
      } else {
        setTimer(prev => { return prev - 1 });
      }
    }, 1000);

    return () => {
      clearTimeout(subscribe)
    }

  }, [timer])


  const onPress = useCallback(() => {
    // navigation.navigate(screenNames.BOTTOM_TAB);
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(MAX_SCROLL);
      setScrollHeight(MAX_SCROLL);
    } else {
      ref?.current?.scrollTo(MINIMUM_SCROLL);
      setScrollHeight(MINIMUM_SCROLL);
    }
  }, []);

  const handleLogin = () => {
    const reg = /^[0]?[56789]\d{9}$/;
    if (reg.test(mobileNo) == false) {
      showError("Enter valid mobile number")
    } else {
      dispatch(__loadingChange(true))
      axiosInstance.post(`/users/login/${mobileNo}`).then(response => {
        console.log("Login===>", response.data);
        if (response?.data?.success) {
          showSuccess(response?.data?.message)
          setOtpScreen(prev => { return screen.OTP });
          setTimer(90);
        } else {
          showError(response?.data?.message)
        }
        dispatch(__loadingChange(false))
      })
    }
  }

  const resendOtp = () => {

    axiosInstance.post(`/users/login/${mobileNo}`).then(response => {
      console.log("resendOtp===>", response);
      if (response?.data?.success) {
        showSuccess("Otp resend successfully!")

        setTimer(90);
      } else {
        showError(response?.data?.message)
      }
    })


  }

  const editNumber=()=>{
    setOtpScreen(screen.LOGIN);
  }

  const verifyOtp = () => {
    if (otp == "") {
      showError("Please enter otp")
    } else {
      dispatch(__loadingChange(true))
      const request = {
        "firebaseToken": ";lskdjfl;asdkfl;askdfl;asjdfkl;jfd",
        "mobileno": mobileNo,
        "os": Platform.OS,
        "otp": otp
      }

      axiosInstance.post(`/users/verify-otp`, request).then(response => {
        console.log("verifyOtp===>", response?.data);
        if (response?.data?.success) {
          const data = response.data?.data;
          AsyncStorage.setItem(ENUMS_ASYNCH.USER_ID, String(data.User))
          AsyncStorage.setItem(ENUMS_ASYNCH.ACCESS_TOKEN, data?.accessToken)
          showSuccess(response?.data?.message)
          navigation.replace(screenNames.BOTTOM_TAB)

          // {"User": 104, "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5OTc1NDY0NDE4IiwiY3JlYXRlZCI6MTY4NTk0Mjk0MTg2NCwiZXhwIjoxNjg5ODMwOTQxfQ.vz5FSIsxbDNiFw6lgu3dxrq4aiJWKbvQvjkcgsLaVjEDXjEkPfGLZH8wKFxuDTobHAmFIt9mrbpE6lIWCowrpA", 
          // "isNew": false, "planExpired": true}

          // setTimer(90);
        } else {
          showError(response?.data?.message)
        }
        dispatch(__loadingChange(false))
      })

    }
  }

  const LoginComponent = () => {
    return (
      <View style={{ marginTop: mvs(30), paddingHorizontal: ms(25) }} >
        <Text style={GlobalStyles.txtM18THEME} >Welcome</Text>
        <Text style={GlobalStyles.txtR14Grey} numberOfLines={2} >RentPay helps you to manage your property rent,expenses and your tenants.</Text>

        {
          scrollHeight == MINIMUM_SCROLL ?
            <CustomThemeButton
              title='Enter your Number'
              onPress={onPress}
            />
            :
            <View style={{}} >
              <View style={[GlobalStyles.rowCenter, styles.mobInputView]}>
                <View>
                  <Text style={GlobalStyles.txtR16THEME} >+91 </Text>
                </View>
                <View style={{ width: '75%' }} >
                  <TextInput
                    value={mobileNo}
                    style={[GlobalStyles.txtM16THEME, { height: '100%', paddingVertical: 0 }]}
                    onChangeText={(txt) => setMobileNo(txt)}
                    autoFocus={true}
                    autoCapitalize='none'
                    maxLength={10}
                    placeholder='XXXXXXXXXX'
                    onSubmitEditing={Keyboard.dismiss}
                    keyboardType='phone-pad'
                  />
                </View>
                <TouchableOpacity onPress={handleLogin}>
                  <Icons name='arrowright' size={30} color={COLORS.theme} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={GlobalStyles.txtR10Grey} numberOfLines={2}>By continuing you may receive an SMS for verification Message and rates may apply</Text>
              </View>
            </View>

        }

      </View>
    )
  }

  const OtpComponent = () => {
    return (
      <View style={{ marginTop: mvs(30), paddingHorizontal: ms(25) }} >
        <Text style={GlobalStyles.txtM20THEME} >Verify OTP</Text>
        <Text style={GlobalStyles.txtR14Grey} numberOfLines={2} >Verification code sent on
          <Text style={GlobalStyles.txtR14THEME} > {mobileNo} </Text>,
          if you want to change your number <Text style={GlobalStyles.txtR14THEME} onPress={editNumber} >click here.</Text></Text>
        <View style={styles.otpinputOuterContainer}>
          <OTPTextView
            handleTextChange={(otp: any) => setOtp(otp)}
            inputCount={4}
            autoFocus
            containerStyle={{ width: '70%' }}
            textInputStyle={[styles.otpTxtContainer, GlobalStyles.txtM18THEME]}
            tintColor={COLORS.theme}
          />
        </View>

        <TouchableOpacity disabled={timer == 0 ? false : true}
          style={{ ...GlobalStyles.rowCenter, alignSelf: 'center' }}
          onPress={resendOtp}>
          <Text style={GlobalStyles.txtM18THEME} >
            Resend  {timer == 0 ? "" : "in " + timer + "s"}
          </Text>
        </TouchableOpacity>

        <CustomThemeButton
          title='Verify'
          containerStyle={{}}
          onPress={verifyOtp}
        />

      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>

        {/* BOX1 */}
        <View style={styles.box1} />

        <View style={styles.titleOuter} >
          <View style={styles.whiteBox} />
          <View style={{ marginTop: mvs(10) }} >
            <Text style={{ ...GlobalStyles.txtM20White, fontSize: ms(30) }} >RentPay</Text>
            <Text style={{ ...GlobalStyles.txtR14White, }} >The Platform Built For</Text>
            <Text style={{ ...GlobalStyles.txtR14White, }} >Your Property.</Text>
          </View>
        </View>

        {/* BOX2 */}
        <View style={styles.box2} />

        <View style={{ ...styles.box3, bottom: scrollHeight == MAX_SCROLL ? -mvs(100) : mvs(100) }} />

        <BottomSheet ref={ref}>
          <View style={{ flex: 1, backgroundColor: COLORS.white, borderRadius: 25, zIndex: 1 }} >
            {
              otpScreen == screen.LOGIN ?

                <>
                  {
                    LoginComponent()
                  }
                </>
                :
                <>
                  {
                    OtpComponent()
                  }
                </>

            }
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}

export default Login


