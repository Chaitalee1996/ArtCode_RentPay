import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomContainer, CustomHeader, CustomInnerContainer, CustomStatusBar, CustomTextInput, CustomThemeButton } from '../../components/custom'
import { ms, mvs } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { PropertyGetById, PropertyStatusUpdateDisable, PropertyTypeListGetByUserId, RoomListGetByPropertyId, RoomsAvailableGetByPropertyId } from '../../services/config/apiMethods/CommonApis'
import SelectDropdown from 'react-native-select-dropdown'
import { COLORS, SIZES } from '../../styles/theme'
import CommonSvg from '../../components/svg/CommonSvg'
import ManagePropertyTypeModal from './components/ManagePropertyTypeModal'
import { DELMethod, POSTMethod, PUTMethod } from '../../services/config/apiMethods/CommonMethods'
import { showMessage } from 'react-native-flash-message'
import { showError, showSuccess } from '../../components/uiCommon/FlashToast'
import Icons from 'react-native-vector-icons/AntDesign'
import { FlatList } from 'react-native'
import RoomNameModal from './components/RoomNameModal'
import { ROOM_STATUS } from '../../constants/enums'
import AddUnitModal from './components/AddUnitModal'
import { CommonDeleteConfirmationModal } from '../../components/uiCommon'
import screenNames from '../../constants/screenNames'

type Props = {}

const EditPropertyDetails = (props: Props) => {

  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);

  const [propertiesData, setPropertiesData] = useState<any>([]);
  const [propertiesTypeData, setPropertiesTypeData] = useState<any>([])
  const [unitData, setUnitData] = useState<any>([])

  const [categoryModalVisible, setcategoryModalVisible] = useState(false);
  const [roomNameModalVisible, setRoomNameModalVisible] = useState(false);
  const [addUnitModalVisible, setAddUnitModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const [propertyName, setPropertyName] = useState('');
  const [propertyTypeId, setPropertyTypeId] = useState(0);
  const [properyAddress, setProperyAddress] = useState('')
  const [managerName, setManagerName] = useState('')
  const [managerContact, setManagerContact] = useState('')

  const [upadatedRoomName, setUpadatedRoomName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState(0);

  const PropertyId = useRoute().params?.id;

  // console.log(`PropertyId: ${PropertyId}`);

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])

  const getData = () => {

    PropertyGetById(PropertyId).then(response => {

      // {"address": "Bhagatwasti", "availableRooms": 2, "id": 169, "managerContactNumber": "8446654175",
      // "managerName": "Namrata", 
      //   "name": "Bhagatwasti", "noOfRooms": 15, "occupiedRooms": 13, "propertyTypeId": 164, 
      //   "propertyTypeType": "RK", "roomPrefix": "School", "totalnoOfRooms": 15, "usersId": 118}
      setPropertyName(response.name);
      setPropertyTypeId(response?.propertyTypeId);
      setProperyAddress(response?.address);
      setManagerName(response?.managerName)
      setManagerContact(response?.managerContactNumber);

      console.log(response);
      setPropertiesData(response)
    })

    PropertyTypeListGetByUserId(USER_ID)
      .then(response => {

        //console.log("Properties Type ==>", response)
        setPropertiesTypeData(response);
      })


    getRooms()



    // PropertyTypeListGetByUserId(USER_ID)
    //   .then(response => {

    //     console.log("Properties==>", response)
    //     setPropertiesData(response);
    //   })

  }


  const getRooms = () => {
    RoomsAvailableGetByPropertyId(PropertyId)
      .then(response => {

        // console.log("Rooms Get ==>", response)
        setUnitData(response);
      })
  }

  const handleUpdate = () => {

    const reg = /^[0]?[56789]\d{9}$/;


    if (propertyName == "" || propertyTypeId == 0 || properyAddress == "" || managerName == "") {

      showError("Enter required fields");

    } else if (reg.test(managerContact) == false) {

      showError("Enter valid mobile number");

    } else {

      const request = {
        "address": properyAddress,
        "managerContactNumber": managerContact,
        "managerName": managerName,
        "name": propertyName,
        "propertTypeId": propertyTypeId,
        "usersId": USER_ID
      }

      console.log(request)

      PUTMethod(`/property/${PropertyId}`, request).then(response => {
        if (response?.success) {

          showSuccess(response.message);
          navigation.goBack()
        } else {
          showError(response.message)
        }

      })

    }
  }


  const updateRoomNameHandle = (roomName: string) => {

    if (roomName == "") {
      showError("Please enter a room name");
    } else {
      const request = {
        "name": roomName,
        "propertyId": PropertyId,
        "status": ROOM_STATUS.AVAILABLE
      }

      PUTMethod(`/rooms/${selectedRoomId}`, request).then(response => {

        if (response?.success) {
          setRoomNameModalVisible(false)
          getRooms()
          showSuccess(response.message);
        } else {
          showError(response.message)
        }


      })
    }

  }





  const deleteUnit = () => {


    DELMethod(`/rooms/${selectedRoomId}`).then(response => {
      if (response.success) {
        setDeleteModalVisible(false)
        getRooms()
        showSuccess(response.message);
      } else {
        showError(response.message)
      }
    })

  };


  const addUnitOnPress=(name:string,count:number) => {

    if (name == "" || count == 0) {
      showError("Please add or enter a room name");
    } else {
      
      for (let i = 1; i <= count; i++) {
        
          const request = {
            "name": `${name}-${i}`,
            "propertyId": PropertyId,
            "status": ROOM_STATUS.AVAILABLE,
          }
  
          console.log(request)
  
          POSTMethod("/rooms", request).then(response => {
            
          })
       
       

      }
      
      setTimeout(() => {
        getRooms()
        setAddUnitModalVisible(false);
       
      }, 2000);
    }

  }

  const disableProperty=() => {

    PropertyStatusUpdateDisable(`/property/update-property-status/${PropertyId}?status=true`)
      .then(response=>{
        if(response.success){
          showSuccess(response.message);
          navigation.navigate(screenNames.PROPERTY)
        }else{
          showError(response.message)
        }
    })

  }







  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Update Property' >
      <TouchableOpacity style={{ alignItems: 'center',justifyContent: 'center',   top: -mvs(5) }}
          onPress={() => {disableProperty()
            //navigation.navigate(screenNames.NEW_PROPERTY);
          }} >

          <CommonSvg.DisablePropertySvg />

        
            <Text style={{...GlobalStyles.txtM16THEME,textAlign:'center'}} >Disable</Text>
        
         
        </TouchableOpacity>
      </CustomHeader>



      <CustomInnerContainer scrollable={true} >

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
            defaultButtonText={propertiesData?.propertyTypeType}
            data={propertiesTypeData}
            buttonTextStyle={{
              ...GlobalStyles.txtR16THEME,
              textAlign: 'left',
            }}
            buttonStyle={[GlobalStyles.dropDownStyle,]}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.type;
            }}
            rowTextForSelection={(item, index) => {

              return item.type;
            }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem)
              setPropertyTypeId(selectedItem.id)
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


        <CustomThemeButton
          title='Update'
          containerStyle={{ width: SIZES.cardWidth, marginTop: mvs(20), marginBottom: mvs(20) }}
          onPress={handleUpdate}
        />


        <View style={{ marginLeft: ms(20) }} >

          <TouchableOpacity style={{...GlobalStyles.rowCenter,width:ms(150)}} onPress={() => setAddUnitModalVisible(true)} >
            <Icons name='plus' size={20} color={COLORS.theme} />
            <Text style={GlobalStyles.txtM16THEME} >Add Unit</Text>
          </TouchableOpacity>

        </View>

        <FlatList
          data={unitData}
          keyExtractor={(item) => `unit-${item.id}`}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={GlobalStyles.flatLine} />}
          contentContainerStyle={{ marginTop: mvs(10), paddingBottom: mvs(40) }}
          renderItem={({ item, index }) => {
            return (
              <View style={[GlobalStyles.rowCenterSpaceBetween, { width: SIZES.cardWidth, paddingLeft: ms(20) }]} >
                <View>
                  <Text style={GlobalStyles.txtR16THEME} >{item.name}</Text>
                </View>
                <View style={GlobalStyles.rowCenter} >
                  <TouchableOpacity onPress={() => {
                    //setSelectedCategoryData(item);
                    //setCategoryName(item.type);
                    setUpadatedRoomName(item.name);
                    setSelectedRoomId(item.id);
                    setRoomNameModalVisible(true)
                  }} >
                    <CommonSvg.EditSvg />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setSelectedRoomId(item.id);
                    setDeleteModalVisible(true);

                  }}
                    style={{ marginLeft: ms(20) }} >
                    <CommonSvg.DeleteSvg />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
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

      {
        roomNameModalVisible &&
        <RoomNameModal
          visible={roomNameModalVisible}
          visibleFunction={(visible) => {
            setRoomNameModalVisible(visible)
          }}
          selectedRoomName={upadatedRoomName}
          updateOnPress={(roomName) => {
            updateRoomNameHandle(roomName)
          }}

        />
      }

      {
        addUnitModalVisible &&
        <AddUnitModal
          visible={addUnitModalVisible}
          visibleFunction={(visible) => {
            setAddUnitModalVisible(visible)
          }}
          generateOnPress={(name,count)=>{
            addUnitOnPress(name,Number(count));
          }}
        />
      }

      {
        deleteModalVisible &&
        <CommonDeleteConfirmationModal
          visible={deleteModalVisible}
          visibleFunction={(visible) => {
            setDeleteModalVisible(visible)
          }}
          yesOnPress={()=>{
            deleteUnit()
          }}
        />
      }

    </CustomContainer>
  )
}

export default EditPropertyDetails;