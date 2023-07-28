import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomContainer, CustomHeader, CustomInnerContainer, CustomRangeSlider, CustomStatusBar, CustomTextInput, CustomThemeButton } from '../../components/custom'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { PropertiesGetAllById, PropertyTypeListGetByUserId } from '../../services/config/apiMethods/CommonApis'
import { ms, mvs } from 'react-native-size-matters'
import { GlobalStyles } from '../../styles/GlobaStyles'
import SelectDropdown from 'react-native-select-dropdown'
import { COLORS, SIZES } from '../../styles/theme'
import CommonSvg from '../../components/svg/CommonSvg'
import ManagePropertyTypeModal from './components/ManagePropertyTypeModal'
import { CommonBottomTab } from '../../components/uiCommon'
import { showError, showSuccess } from '../../components/uiCommon/FlashToast'
import { POSTMethod } from '../../services/config/apiMethods/CommonMethods'
import { showMessage } from 'react-native-flash-message'
import { ROOM_STATUS } from '../../constants/enums'

type Props = {}

const NewProperty = (props: Props) => {

  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const dispatch=useDispatch<any>();

  const [low, setLow] = useState(1);

  const [propertiesData, setPropertiesData] = useState<any>([]);
  const [categoryModalVisible, setcategoryModalVisible] = useState(false);
  const [unitsVisible, setUnitsVisible] = useState(false)

  const [propertyName, setPropertyName] = useState('');
  const [propertyId, setPropertyId] = useState(0);
  const [properyAddress, setProperyAddress] = useState('')
  const [managerName, setManagerName] = useState('')
  const [managerContact, setManagerContact] = useState('');
  const [roomName, setRoomName] = useState('')


  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])


  const getData = () => {

    PropertyTypeListGetByUserId(USER_ID)
      .then(response => {

        console.log("Properties==>", response)
        setPropertiesData(response);
      })

  }

  const handleSave = () => {

    const reg = /^[0]?[56789]\d{9}$/;


    if (propertyName == "" || propertyId == 0 || properyAddress == "" || managerName == "") {

      showError("Enter required fields");

    } else if (reg.test(managerContact) == false) {

      showError("Enter valid mobile number");

    } else {

      const request = {
        "address": properyAddress,
        "managerContactNumber": managerContact,
        "managerName": managerName,
        "name": propertyName,
        "propertTypeId": propertyId,
        "usersId": USER_ID
      }


      POSTMethod('/property', request).then(response => {
        console.log("response==>", response)
        if (response?.success) {

          setUnitsVisible(true);
          setPropertyId(response.data?.id)
          showSuccess(response?.message);
        } else {
          showError(response.message)
        }

      })

    }

  }

  const handleAddUnit = () => {

    if (roomName == "" || low == 0) {
      showError("Please add or enter a room name");
    } else {
      
      for (let i = 1; i < low; i++) {

        const request = {
          "name": `${roomName}-${i}`,
          "propertyId": propertyId,
          "status": ROOM_STATUS.AVAILABLE,
        }

        console.log(request)

        // POSTMethod("/rooms", request).then(response => {
        //   if (response?.success) {

        //     showSuccess(response?.message);
        //     navigation.goBack();
        //   } else {
        //     showError(response.message);
        //   }
        // })

      }
    }
  }


  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='New Property' />



      <CustomInnerContainer scrollable={true} containerStyle={{ paddingBottom: mvs(70) }}>

        {/* Property Name ENTER */}
        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Property Name *</Text>
          </View>

          <CustomTextInput
            value={propertyName}
            onChangeText={(text) => setPropertyName(text)}
            placeholder={'Enter Property Name'}

          />
        </View>

        {/* SELECT Propety */}
        <View style={{ marginTop: mvs(10) }} >
          <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), marginBottom: mvs(2) }]} >
            <Text style={GlobalStyles.txtR12Grey} >Property Type *</Text>
            <TouchableOpacity onPress={() => setcategoryModalVisible(true)}>
              <Text style={GlobalStyles.txtR14THEME} >Manage Property Type</Text>
            </TouchableOpacity>
          </View>

          <SelectDropdown
            dropdownStyle={{
              borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
              backgroundColor: COLORS.white
            }}
            rowTextStyle={GlobalStyles.txtR16THEME}
            defaultButtonText={'Select Property Type'}
            data={propertiesData}
            buttonTextStyle={[propertyId != 0 ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14Grey, { textAlign: 'left', }]}
            buttonStyle={[GlobalStyles.dropDownStyle,]}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.type;
            }}
            rowTextForSelection={(item, index) => {

              return item.type;
            }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem)
              setPropertyId(selectedItem.id)
            }}
            renderDropdownIcon={() => (
              <CommonSvg.ArrowDownSvg />
            )}
          />
        </View>


        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Property Address *</Text>
          </View>

          <CustomTextInput
            value={properyAddress}
            onChangeText={(text) => setProperyAddress(text)}
            placeholder={'Enter Property Address'}
            multiline={true}
            numberOfLines={7}
            style={{ height: mvs(80) }}
          />
        </View>

        {/* MAnager Name ENTER */}
        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Manager Name *</Text>
          </View>

          <CustomTextInput
            value={managerName}
            onChangeText={(text) => setManagerName(text)}
            placeholder={'Enter Property Manager Name'}

          />
        </View>

        {/* Contact ENTER */}
        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Manager Contact *</Text>
          </View>

          <CustomTextInput
            value={managerContact}
            onChangeText={(text) => setManagerContact(text)}
            placeholder={'Enter property Manager Contact'}

            maxLength={10}
            keboardType={'phone-pad'}
          />
        </View>

        {
          unitsVisible &&
          <>
            <View style={{ marginTop: mvs(30) }}>
              <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
                <Text style={GlobalStyles.txtR12Grey} >How many Units do you have *</Text>
              </View>

              <CustomTextInput
                value={`${low}`}
                onChangeText={(text) => setLow(Number(text))}
                placeholder={'Enter Number'}
                keboardType={'number-pad'}
              />
            </View>

            <View style={{ marginTop: mvs(10), alignSelf: 'center' }}>

              <CustomRangeSlider value={low} handleLowHigh={(low, high) => setLow(low)} />


            </View>

            <View style={{ marginTop: mvs(10) }}>
              <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
                <Text style={GlobalStyles.txtR12Grey} >Room Name *</Text>
              </View>

              <CustomTextInput
                value={roomName}
                onChangeText={(text) => setRoomName(text)}
                placeholder={'e.g Room/Flat/Kholi'}

              />
            </View>
          </>
        }



        <CustomThemeButton
          title={unitsVisible ? "Generate Unit" : 'Save'}
          containerStyle={{ width: SIZES.cardWidth, marginTop: mvs(20), marginBottom: mvs(50) }}
          onPress={unitsVisible ? handleAddUnit : handleSave}
        />









      </CustomInnerContainer>


      {
        categoryModalVisible &&

        <ManagePropertyTypeModal
          visible={categoryModalVisible}
          visibleFunction={(visible) => {
            getData()
            setcategoryModalVisible(visible)
          }}
        // categoryData={categoryData}
        />
      }

      <CommonBottomTab />

    </CustomContainer>
  )
}

export default NewProperty