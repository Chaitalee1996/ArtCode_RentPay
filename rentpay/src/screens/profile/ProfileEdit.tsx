import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { CustomCityModal, CustomContainer, CustomHeader, CustomStateModal, CustomStatusBar, CustomThemeButton } from '../../components/custom'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { UserInfoGetById } from '../../services/config/apiMethods/CommonApis'
import { CommonBottomTab } from '../../components/uiCommon'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { ms, mvs } from 'react-native-size-matters'
import { COLORS } from '../../styles/theme'
import CommonCalendar from '../../components/uiCommon/CommonCalendar'
import CommonSvg from '../../components/svg/CommonSvg'
import moment from 'moment'
import { showError, showSuccess } from '../../components/uiCommon/FlashToast'
import { PUTMethod } from '../../services/config/apiMethods/CommonMethods'

type Props = {}

const ProfileEdit = (props: Props) => {

  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);

  const [dateVisible, setDateVisible] = useState(false);
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [cityModalVisible, setCityModalVisible] = useState(false)

  const [displayDate, setDisplayDate] = useState(new Date())

  const [userData, setUserData] = useState<any>({})

  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [pinCode, setPinCode] = useState('')

  const emailRef = useRef<TextInput>();

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])


  const getData = () => {

    UserInfoGetById(`/users/${USER_ID}`).then(response => {

      // {
      //   "address": "Chakan", "city": "Pune", "dob": "2004-04-22",
      //     "email": "atul.gore74@gmail.com", "id": 118, "mobileNo": "8600865500",
      //       "name": "Atul Gore", "pincode": 410502, "profilePic": "http://rentfiles.visionitsoftware.in/rentpayfiles/user/118_RentPay_2023_6_7_19_2_369.jpg",
      //         "sendNotification": true, "state": "Maharashtra", "subscriptionId": 1, "subscriptionName": "Premium"
      // }
      setUserData(response)
      setName(response?.name);
      setAddress(response?.address)
      setEmail(response?.email)
      setBirthDate(response?.dob);
      setState(response?.state);
      setCity(response?.city);
      setPinCode(response?.pincode)
    })

  }



  const handleUpdate = () => {

    if (name == "") {
      showError("Please enter name");
    } else if (email == "") {
      showError("Please enter email");
    } else if (birthDate == null) {
      showError('Please enter birth date');
    } else if (address == "") {
      showError('Please enter address');
    } else if (state == "") {
      showError('Please enter state');
    } else if (city == "") {
      showError('Please enter city');
    } else if (pinCode == "") {
      showError('Please enter pin code');
    } else {


      const request = {

        "address": address,
        "city": city,
        "dob": birthDate,
        "email": email,
        "mobileNo": userData?.mobileNo,
        "name": name,
        "pincode": Number(pinCode),
        "state": state
      }

      PUTMethod(`/users/${USER_ID}`,request).then(response=>{
        if(response.success){
          showSuccess(response.message);
          navigation.goBack()
        }else{
          showError(response.message);
        }
      })

    }
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Update Profile' />

      <ScrollView 
        style={{ flex: 1 }} 
        bounces={false} 
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ paddingBottom: mvs(90) }}>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Name *</Text>
          </View>

          <TextInput
            value={name}
            style={[GlobalStyles.inputStyle, name ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setName(txt)}
            autoCapitalize='none'
            placeholder={'Enter Name'}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              emailRef?.current?.focus()
            }}
            keyboardType={'default'}
          />
        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Email *</Text>
          </View>

          <TextInput
            value={email}
            ref={emailRef}
            style={[GlobalStyles.inputStyle, email ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setEmail(txt)}
            autoCapitalize='none'
            placeholder={'Enter email'}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            keyboardType={'default'}
          />
        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Birth Date *</Text>
          </View>

          <TouchableOpacity onPress={() => setDateVisible(true)} activeOpacity={0.8}
            style={[GlobalStyles.inputStyle, GlobalStyles.rowCenterSpaceBetween]} >

            <Text style={GlobalStyles.txtM16THEME} >{birthDate == null ? 'Select Date' : moment(birthDate).format('DD MMM YYYY')}</Text>
            <CommonSvg.CalendarSvg />
          </TouchableOpacity>

        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Address *</Text>
          </View>
          <TextInput
            value={address}
            style={[GlobalStyles.inputStyle,
            address ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME, { height: mvs(80), textAlignVertical: 'top', }]}
            onChangeText={(txt: any) => setAddress(txt)}
            autoCapitalize='none'
            placeholder={'Enter Address'}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            keyboardType={'default'}
          />
        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >State *</Text>
          </View>

          <TouchableOpacity style={GlobalStyles.inputStyle}
            onPress={() => setStateModalVisible(true)} >
            <Text style={state ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME} >{state}</Text>
          </TouchableOpacity>

        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >City *</Text>
          </View>

          <TouchableOpacity style={GlobalStyles.inputStyle}
            onPress={() => setCityModalVisible(true)} >
            <Text style={city ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14Grey} >{city==""?"Select City":city}</Text>
          </TouchableOpacity>

        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Pincode *</Text>
          </View>

          <TextInput
            value={`${pinCode}`}
            style={[GlobalStyles.inputStyle, pinCode ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setPinCode(txt)}
            autoCapitalize='none'
            placeholder={'Enter Pincode'}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            keyboardType={'number-pad'}
          />
        </View>

        <CustomThemeButton
          title='Update'
          containerStyle={{ marginTop: mvs(30), }}
          onPress={handleUpdate}
        />

{
        stateModalVisible &&
        <CustomStateModal
          visible={stateModalVisible}
          visibleFunction={(visible) => {
            setStateModalVisible(visible)
          }}
          onSelect={(state) => {
            setState(state);
            setCity('');
            console.log("selected states===>", state);
          }}
        />
      }

      {
        cityModalVisible &&
        <CustomCityModal
          visible={cityModalVisible}
          visibleFunction={(visible) => {
            setCityModalVisible(visible)
          }}
          onSelect={(state) => {
            setCity(state);
            console.log("selected City===>", state);
          }}
          selectedState={state}
        />
      }

      </ScrollView>

      <CommonCalendar
        value={birthDate}
        format={'YYYY-MM-DD'}
        isVisible={dateVisible}
        displayDate={displayDate}
        onCancel={(visible) => {
          setDateVisible(visible)
        }}
        onConfirm={(date) => {
          setBirthDate(moment(date).format('YYYY-MM-DD'));
          setDateVisible(false);
          setDisplayDate(date)
          console.log(date)
        }}
      />

      

      <CommonBottomTab />
    </CustomContainer>
  )
}

export default ProfileEdit

const styles = StyleSheet.create({})