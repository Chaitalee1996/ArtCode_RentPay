import { View, Text, TouchableOpacity, Image, FlatList, TextInput, TextInputProps, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CustomContainer, CustomHeader, CustomInnerContainer, CustomStatusBar, CustomTextInput, CustomThemeButton } from '../../components/custom'
import { CommonBottomTab, CommonCloseBtn } from '../../components/uiCommon'
import { ms, mvs } from 'react-native-size-matters'
import { GlobalStyles } from '../../styles/GlobaStyles'
import CommonSvg from '../../components/svg/CommonSvg'
import { COLORS, SIZES } from '../../styles/theme'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Entypo';
import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet'
import { showError } from '../../components/uiCommon/FlashToast'
import { POSTMethodMultiPart } from '../../services/config/apiMethods/CommonMethods'
import { AddMembersModal } from './component'

type Props = {}

const NewTenant = (props: Props) => {

  const { USER_ID } = useSelector((state: any) => state.user);
  const photoRef = useRef(null);
  const documentRef = useRef(null);


  const [photoData, setPhotoData] = useState<any>(null);
  const [documentData, setdocumentData] = useState<any>([]);

  const [addMemberVisible, setAddMemberVisible] = useState(false);

  const [addMemberData, setAddMemberData] = useState({});

  const [name, setName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [address, setAddress] = useState('')
  const [documentNumber, setDocumentNumber] = useState('');
  const [company, setCompany] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyContact, setCompanyContact] = useState('')

  const mobileRef = useRef<TextInput>();
  const addressRef = useRef<TextInput>();
  const documentNoRef = useRef<TextInput>();
  const companyRef = useRef<TextInput>();
  const companyAddressRef = useRef<TextInput>();
  const companyNoRef = useRef<TextInput>();




  const handleSave = () => {

    const reg = /^[0]?[56789]\d{9}$/;

    if (name == "" || reg.test(mobileNo) == false ||
      address == "" || documentNumber == "" || company == "" || address == "" || companyContact == "") {
      showError("Please enter required or valid information!")
    } else {


      var maxNo = 100
      const formData = new FormData();
      if (photoData.hasOwnProperty("path")) {
        formData.append("profilePic", {
          uri: photoData?.path,
          type: photoData?.mime,
          name: photoData?.filename || `ProfilePic${photoData?.modificationDate}${Math.floor((Math.random() * maxNo) + 1)}.jpg`,
        })
      }

      if (documentData.length > 0) {
        const data = [];

        documentData.map((item) => {
          data.push({
            uri: item.path,
            type: item.mime,
            name: item.filename ||
              `ducuments${item.modificationDate}${Math.floor((Math.random() * maxNo) + 1)}.jpg`
          })
        })

        formData.append('files', data);
      }

      const request = {
        "address": address,
        "companyAddress": companyAddress,
        "companyContactNo": companyContact,
        "documentNo": documentNumber,
        "emergencyMobileNo": mobileNo, 
        "emergencyName": name,
        "members": [
          // {
          //   "address": "string",
          //   "companyAddress": "string",
          //   "companyContactNo": "string",
          //   "documentNo": "string",
          //   "emergencyMobileNo": "string",
          //   "emergencyName": "string",
          //   "id": 0,
          //   "mobileNo": "string",
          //   "name": "string",
          //   "tenantId": 0,
          //   "usersId": 0,
          //   "workingCompany": "string"
          // }
        ],
        "mobileNo": mobileNo,
        "name": name,
        "rentAmount": 0,
        "usersId": USER_ID,
        "workingCompany": company
      }

      formData.append('request', JSON.stringify(request));

      POSTMethodMultiPart('/tenants', formData).then(response => {
        console.log(response)
      })

    }


  }

  const UploadComponent = ({ type }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{ ...styles.addNewTenantContainer, ...styles.uploadContainer }}
        onPress={() => {
          if (type == 'photo') {
            photoRef.current.open()
          } else {
            documentRef?.current.open()
          }
        }} >
        <View  >
          <CommonSvg.UploadDocsSvg />
        </View>
        <View style={{ marginTop: mvs(10) }} >
          <Text style={GlobalStyles.txtR12Grey} >upload photo</Text>
        </View>
      </TouchableOpacity>
    )
  }

  var photoOptions = [
    {
      name: 'Take from camera',
      icon: <Icon color={COLORS.theme} size={21} name="camera" />,
      onPress: () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          //cropping: true,
        })
          .then(response => {
            setPhotoData(response);
            photoRef.current.close()
          })
          .catch(e => console.log("Image Error", e.message))
      },
    },
    {
      name: 'Choose from Gallery',
      icon: <Icon name="image" color={COLORS.theme} size={21} />,
      onPress: () => {
        ImagePicker.openPicker({
          multiple: false,
          waitAnimationEnd: false,
          includeExif: true,
          forceJpg: true,
          compressImageQuality: 0.8,
          maxFiles: 2,
          mediaType: 'photo',
          includeBase64: true,

        })
          .then(response => {
            setPhotoData(response)
            photoRef.current.close()
          })
          .catch(e => console.log("Image Error", e.message))
      },
    },
  ];

  var documentOptions = [
    {
      name: 'Take from camera',
      icon: <Icon color={COLORS.theme} size={21} name="camera" />,
      onPress: () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          //cropping: true,
        })
          .then(response => {
            const data = [response];
            setdocumentData([...documentData, ...data])
            documentRef?.current.close()
          })
          .catch(e => console.log("Image Error", e.message))
      },
    },
    {
      name: 'Choose from Gallery',
      icon: <Icon name="image" color={COLORS.theme} size={21} />,
      onPress: () => {
        ImagePicker.openPicker({
          multiple: false,
          waitAnimationEnd: false,
          includeExif: true,
          forceJpg: true,
          compressImageQuality: 0.8,
          maxFiles: 2,
          mediaType: 'photo',
          includeBase64: true,

        })
          .then(response => {
            const data = [response];
            setdocumentData([...documentData, ...data])
            documentRef?.current.close()
          })
          .catch(e => console.log("Image Error", e.message))
      },
    },
  ];

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='New Tenant' />

      <CustomInnerContainer containerStyle={{ paddingBottom: mvs(20) }}>

        <View style={{}}>
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
              mobileRef?.current?.focus()
            }}
            keyboardType={'default'}
          />
        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Mobile Number *</Text>
          </View>
          <TextInput
            value={`${mobileNo}`}
            ref={mobileRef}
            style={[GlobalStyles.inputStyle, mobileNo ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setMobileNo(txt)}
            autoCapitalize='none'
            placeholder={'Enter Mobile Number'}
            maxLength={10}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              addressRef?.current.focus()
            }}
            keyboardType='phone-pad'
          />

        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Permanent Address *</Text>
          </View>

          <TextInput
            value={address}
            ref={addressRef}
            style={[GlobalStyles.inputStyle, address ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setAddress(txt)}
            autoCapitalize='none'
            placeholder={'Enter Permanent Address'}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            keyboardType={'default'}
          />


        </View>

        <View style={{ marginTop: mvs(10), marginLeft: ms(20), }}>
          <View style={{ marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Tenant Photo</Text>
          </View>
          {
            photoData == null ?
              <UploadComponent type={'photo'} />
              :
              <View style={{ flexGrow: 0, width: ms(110) }} >
                <CommonCloseBtn
                  onPress={() => {
                    setPhotoData(null)
                  }}
                  containeStyle={styles.closeStyle} />
                <Image
                  source={{ uri: photoData?.path }}
                  style={{ width: ms(100), height: mvs(90), borderRadius: SIZES.radius12, }}
                />
              </View>
          }


        </View>


        <View style={{ marginTop: mvs(10), marginLeft: ms(20), }}>
          <View style={{}} >
            <Text style={GlobalStyles.txtR12Grey} >Documents (max 5 Documents)</Text>
          </View>
          <View style={[GlobalStyles.rowCenter]} >
            {
              documentData.length < 5 &&
              <View style={{ marginRight: ms(10) }} >
                <UploadComponent type={'document'} />
              </View>
            }
            <FlatList
              data={documentData || []}
              keyExtractor={(item) => `documents-${item.id}`}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ paddingRight: mvs(20) }}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: ms(110), height: mvs(100), alignItems: 'center', justifyContent: 'center', }} >
                    <CommonCloseBtn
                      onPress={() => {
                        const data = documentData.filter(s => s.path != item?.path);
                        console.log(data);
                        setdocumentData(data)
                      }}
                      containeStyle={{ ...styles.closeStyle, top: mvs(3), right: ms(1) }} />
                    <Image
                      source={{ uri: item?.path }}
                      style={{ width: ms(95), height: mvs(85), borderRadius: SIZES.radius12, }}
                    />
                  </View>
                )
              }}
            />
          </View>

        </View>


        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Document Number *</Text>
          </View>

          <TextInput
            value={documentNumber}
            ref={documentNoRef}
            style={[GlobalStyles.inputStyle, documentNumber ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setDocumentNumber(txt)}
            autoCapitalize='none'
            placeholder={'Enter Document Number'}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              companyRef.current?.focus()
            }}
            keyboardType={'default'}
          />
        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Working Company *</Text>
          </View>

          <TextInput
            value={company}
            ref={companyRef}
            style={[GlobalStyles.inputStyle, company ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setCompany(txt)}
            autoCapitalize='none'
            placeholder={'Enter working company name'}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              companyAddressRef.current?.focus()
            }}
            keyboardType={'default'}
          />

        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Company Address *</Text>
          </View>
          <TextInput
            value={companyAddress}
            ref={companyAddressRef}
            style={[GlobalStyles.inputStyle, companyAddress ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setCompanyAddress(txt)}
            autoCapitalize='none'
            placeholder={'Enter Company Address'}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              companyNoRef.current?.focus()
            }}
            keyboardType={'default'}
          />


        </View>

        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Company Contact Number *</Text>
          </View>
          <TextInput
            value={`${companyContact}`}
            ref={companyNoRef}
            style={[GlobalStyles.inputStyle, companyContact ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
            onChangeText={(txt: any) => setCompanyContact(txt)}
            autoCapitalize='none'
            placeholder={'Enter Company Contact Number'}
            maxLength={10}
            placeholderTextColor={COLORS.greyTxt}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            keyboardType='phone-pad'
          />

        </View>

        <View style={{ marginTop: mvs(15) }}>
          <TouchableOpacity onPress={() => setAddMemberVisible(true)}
            style={{ marginLeft: ms(20), ...GlobalStyles.rowCenter, width: ms(140) }} >
            <CommonSvg.AddTenantSvg />
            <Text style={{ ...GlobalStyles.txtM14THEME, marginLeft: ms(10) }} >Add Members</Text>
          </TouchableOpacity>
        </View>

        <CustomThemeButton
          title='Save'
          containerStyle={{ width: SIZES.cardWidth, marginTop: mvs(20), marginBottom: mvs(70) }}
          onPress={handleSave}
        />


      </CustomInnerContainer>
      {/* <View style={{ height: mvs(100) }} /> */}

      {
        addMemberVisible &&
        <AddMembersModal
          visible={addMemberVisible}
          visibleFunction={(visible) => {
            setAddMemberVisible(visible)
          }}
          save={(data) => {
            console.log(data)
            setAddMemberData(data)
          }}
        />
      }

      <RBSheet
        ref={photoRef}
        height={190}
        openDuration={250}
        dragFromTopOnly
        closeOnDragDown
        customStyles={{
          container: {
            backgroundColor: COLORS.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}>
        <View style={{ paddingHorizontal: 20, }}>
          {photoOptions.map(({ name, onPress, icon }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                alignItems: 'center',
              }}
              key={name}>
              {icon}
              <Text style={[GlobalStyles.txtM14THEME, { marginHorizontal: ms(10) }]}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>

      <RBSheet
        ref={documentRef}
        height={190}
        openDuration={250}
        dragFromTopOnly
        closeOnDragDown
        customStyles={{
          container: {
            backgroundColor: COLORS.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}>
        <View style={{ paddingHorizontal: 20, }}>
          {documentOptions.map(({ name, onPress, icon }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                alignItems: 'center',
              }}
              key={name}>
              {icon}
              <Text style={[GlobalStyles.txtM14THEME, { marginHorizontal: ms(10) }]}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>


      <CommonBottomTab />

    </CustomContainer>


  )
}

export default NewTenant