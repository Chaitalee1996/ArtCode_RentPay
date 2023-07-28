import { FlatList, Image, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { CustomInnerContainer } from '../../../components/custom';
import { ms, mvs } from 'react-native-size-matters';
import { COLORS, SIZES } from '../../../styles/theme';
import { GlobalStyles } from '../../../styles/GlobaStyles';
import { styles } from '../styles';
import { CommonCloseBtn } from '../../../components/uiCommon';
import CommonSvg from '../../../components/svg/CommonSvg';
import { showError } from '../../../components/uiCommon/FlashToast';

type Props = {
  visible: boolean,
  visibleFunction: (visible: boolean) => void,
  save?: (data: any) => void,

  // categoryData: any[],
}

const AddMembersModal = ({ visible, visibleFunction, save }: Props) => {

  const [modalVisible, setModalVisible] = useState<any>(visible);

  const photoRef = useRef(null);
  const documentRef = useRef(null);


  const [photoData, setPhotoData] = useState<any>(null);
  const [documentData, setdocumentData] = useState<any>([]);


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


    const data = {
      name: name,
      mobileNo: mobileNo,
      address: address,
      documentNumber: documentNumber,
      company: company,
      companyAddress: companyAddress,
      companyContact: companyContact
    }

    save(data);
    handleClose()
  }

  }

  const handleClose = () => {
    visibleFunction(false)
    setModalVisible(false)
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


  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={modalVisible}
      onRequestClose={() => {
        handleClose()
      }}>

      <View style={[StyleSheet.absoluteFillObject, styles.ModalContainer]}>

        <CustomInnerContainer containerStyle={{ height: SIZES.height, width: SIZES.width - ms(20) }}>

          <View style={{}}>
            <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
              <Text style={GlobalStyles.txtR12Grey} >Name *</Text>
            </View>

            <TextInput
              value={name}
              style={[GlobalStyles.inputStyleModal, name ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
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
              style={[GlobalStyles.inputStyleModal, mobileNo ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
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

            {/* <CustomTextInput
            value={`${mobileNo}`}
            onChangeText={(text) => setMobileNo(text)}
            placeholder={'Enter Mobile Number'}
            maxLength={10}
            keboardType='phone-pad'
          /> */}
          </View>

          <View style={{ marginTop: mvs(10) }}>
            <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
              <Text style={GlobalStyles.txtR12Grey} >Permanent Address *</Text>
            </View>

            <TextInput
              value={address}
              ref={addressRef}
              style={[GlobalStyles.inputStyleModal, address ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
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
              style={[GlobalStyles.inputStyleModal, documentNumber ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
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
              style={[GlobalStyles.inputStyleModal, company ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
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
              style={[GlobalStyles.inputStyleModal, companyAddress ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
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
              style={[GlobalStyles.inputStyleModal, companyContact ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
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

          <View style={[GlobalStyles.rowCenterSpaceBetween, { width: SIZES.cardWidth, marginTop: mvs(20), marginBottom: mvs(20), paddingHorizontal: ms(10) }]} >
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose} >
              <Text style={GlobalStyles.txtR14DG} >Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.cancelBtn, backgroundColor: COLORS.theme, shadowColor: COLORS.theme }}
              onPress={() => handleSave}
            >
              <Text style={GlobalStyles.txtR14White} >Save</Text>
            </TouchableOpacity>
          </View>

        </CustomInnerContainer>

      </View>
    </Modal>
  )
}

export default AddMembersModal

