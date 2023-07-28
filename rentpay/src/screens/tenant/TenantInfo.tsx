import { View, Text, TouchableOpacity, Linking, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CustomContainer, CustomImageView, CustomInnerContainer, CustomStatusBar } from '../../components/custom'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { DASHES } from '../../constants/enums'
import CommonSvg from '../../components/svg/CommonSvg'
import { ms, mvs } from 'react-native-size-matters'
import { CommonBottomTab, CommonViewQrCodeModal } from '../../components/uiCommon'
import { useSelector } from 'react-redux'
import { TenantInfoGetByTenantId, TenantPoliceReportByTenantId, TenantQrCodeGenerateByTenantId, UserInfoGetById } from '../../services/config/apiMethods/CommonApis'
import { COLORS } from '../../styles/theme'
import { styles } from './styles'
import Share from 'react-native-share';
import { HandlePhone } from '../../services/config/helpers/handlePhone'
import screenNames from '../../constants/screenNames'
import { CollectRentModal } from './component'

type Props = {}

const TenantInfo = (props: Props) => {

  const tenantId = useRoute()?.params?.tenantId;
  console.log("tenantId: " + tenantId);

  const { USER_ID } = useSelector((state: any) => state.user);
  const navigation = useNavigation<any>();

  const [tenanntData, setTenanntData] = useState<any>({});
  const [tenantQrCode, setTenantQrCode] = useState('');

  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [collectRentModalVisible, setCollectRentModalVisible] = useState(false)

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])

  const getData = () => {
    TenantInfoGetByTenantId(tenantId).then(response => {
      setTenanntData(response);
      // {"address": "chaka", "companyAddress": "chakan", "companyContactNo": "8600865500", 
      // "documentNo": "abc", "documents": [], "emergencyMobileNo": null, "emergencyName": null, 
      // "id": 226, "memberOfTenant": 0, "members": [], "mobileNo": "8600865525", "name": "atulgkre", 
      // "profilePic": "http://rentfiles.visionitsoftware.in/rentpayfiles/tenant/8600865525_RentPay_2023_5_5_16_28_649.jpg", "propertyId": 169, "propertyName": "Bhagatwasti", "roomId": 5518, 
      // "roomName": "Room-12", "usersId": 118, "usersName": "Atul Gore", "workingCompany": "qbvcc"}
      console.log(response);
    })
    
  }

  const handleViewQrCode = () => {
    TenantQrCodeGenerateByTenantId(tenantId).then(response => {
      const image = 'data:image/png;base64,' + response.bytes
      setTenantQrCode(image);
      setQrCodeModalVisible(true)
    })
  }

  const handleShare = async () => {

    const data =
      `Personal Info:-\n\tTenant Name\t\t: ${tenanntData?.name}\n\tMobile No.\t\t\t: ${tenanntData?.mobileNo}\n\tAddress\t\t\t\t: ${tenanntData?.address}\n\nWorking Details:-\n\tCompany Name\t\t: ${tenanntData?.workingCompany}\n\tAddress\t\t\t\t: ${tenanntData?.companyAddress}\n\tContact No\t\t\t: ${tenanntData?.companyContactNo}`

    const response = await Share.open({ message: data });
    console.log(response);

  }

  const handlePoliceReport = async () => {

    TenantPoliceReportByTenantId(tenantId).then(async (response) => {
      const share = await Share.open({ url: response });
      console.log(response);
    })

  }


  const headerComponent = () => {
    return (
      <View style={[GlobalStyles.headerContainer, , { height: mvs(100) }]} >
        <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20) }]} >
          <>
            {
              tenanntData?.propertyId == null ?
                <TouchableOpacity onPress={() => navigation.navigate(screenNames.ASSIGN_PROPERTY, { tenantData: tenanntData })} style={{ alignItems: 'center', height: mvs(60), justifyContent: 'space-between' }} >
                  <CommonSvg.HomePropertySvg />
                  <Text style={GlobalStyles.txtR12Grey} >Assign Property</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => null} style={{ alignItems: 'center', height: mvs(60), justifyContent: 'space-between' }} >
                  <CommonSvg.HomePropertySvg />
                  <Text style={GlobalStyles.txtR12Grey} >Vacant Property</Text>
                </TouchableOpacity>
            }
          </>

          <TouchableOpacity onPress={() => setCollectRentModalVisible(true)}
            disabled={tenanntData?.propertyId == null ? true : false}
            style={{ alignItems: 'center', height: mvs(60), justifyContent: 'space-between', opacity: tenanntData?.propertyId == null ? 0.4 : 1 }} >
            <CommonSvg.HomeCollectionSvg />
            <Text style={GlobalStyles.txtR12Grey} >Collect Rent</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null} style={{ alignItems: 'center', height: mvs(60), justifyContent: 'space-between' }} >
            <CommonSvg.EditUserSvg />
            <Text style={GlobalStyles.txtR12Grey} >Edit Tenants</Text>
          </TouchableOpacity>
        </View>
        <View style={GlobalStyles.dottedLineContainer} >
          <Text style={{ ...GlobalStyles.txtM16Grey, }} numberOfLines={1} adjustsFontSizeToFit>{DASHES}</Text>
        </View>
      </View>
    )
  }

  const ProfileComponent = () => {
    return (
      <View style={{ ...GlobalStyles.rowCenter, paddingHorizontal: ms(15) }} >

        <CustomImageView
          containerStyle={{ height: ms(80), width: ms(80), }}
          imageStyle={{ height: ms(60), width: ms(60) }}
          imageUrl={tenanntData?.profilePic}
        />

        <View style={{ marginLeft: ms(15), alignSelf: 'flex-start', justifyContent: 'space-between', width: '60%' }} >
          <Text style={GlobalStyles.txtR16DG} >{tenanntData?.name}</Text>
          <View style={{ marginVertical: mvs(5) }} >
            <Text style={GlobalStyles.txtR16Grey} >{tenanntData?.mobileNo}</Text>
          </View>
          <Text style={GlobalStyles.txtR16Grey} >{tenanntData?.roomName} {tenanntData?.propertyName}</Text>
        </View>

        <TouchableOpacity onPress={() => HandlePhone(tenanntData.mobileNo)}>
          <CommonSvg.PhoneSvg />
        </TouchableOpacity>


      </View>
    )
  }

  const PersonalInfo = () => {

    return (
      <View style={{ marginTop: mvs(20), paddingHorizontal: ms(15) }} >

        <View>
          <Text style={GlobalStyles.txtR16THEME} >Personal Info</Text>
        </View>

        <View style={{ marginVertical: mvs(5) }} >
          <Text style={GlobalStyles.txtR14Grey} >Permanent Address</Text>
        </View>
        <View>
          <Text style={GlobalStyles.txtR14DG} >{tenanntData?.address}</Text>
        </View>

        <View style={{ marginVertical: mvs(5) }} >
          <Text style={GlobalStyles.txtR14Grey} >Document Number</Text>
        </View>

        <View>
          <Text style={GlobalStyles.txtR14DG} >{tenanntData?.documentNo}</Text>
        </View>

      </View>
    )
  }

  const DocumentComponent = () => {
    return (
      <View style={{ marginTop: mvs(10) }} >

        <View style={{ paddingHorizontal: ms(15) }} >
          <Text style={GlobalStyles.txtR14Grey} >Documents</Text>
        </View>

        <FlatList
          data={tenanntData?.documents}
          keyExtractor={(item) => `documents-${item.id}`}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ marginTop: mvs(10), paddingLeft: ms(15) }}
          renderItem={({ item, index }) => {
            return (
              <CustomImageView
                containerStyle={{ height: ms(80), width: ms(80), marginRight: ms(15), marginBottom: mvs(10), }}
                imageStyle={{ height: ms(60), width: ms(60) }}
                imageUrl={item?.imageUrl}
              />
            )
          }}
        />

      </View>
    )
  }

  const WorkingInfo = () => {
    return (
      <View style={{ marginTop: mvs(10), paddingHorizontal: ms(15) }} >

        <View>
          <Text style={GlobalStyles.txtR16THEME} >Working details</Text>
        </View>

        <View style={{ marginVertical: mvs(5) }} >
          <Text style={GlobalStyles.txtR14Grey} >Company office</Text>
        </View>
        <View>
          <Text style={GlobalStyles.txtR14DG} >{tenanntData?.workingCompany}</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenanntData?.companyAddress}</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenanntData?.companyContactNo}</Text>
        </View>

      </View>
    )
  }


  const ShareQrPoliceReportComponent = () => {
    return (
      <View style={[styles.shareContainer, GlobalStyles.rowCenterSpaceBetween]} >
        <TouchableOpacity onPress={handleShare} style={{ alignItems: 'center' }}>
          <CommonSvg.ShareSvg />
          <Text style={GlobalStyles.txtR12THEME} >Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleViewQrCode} style={{ alignItems: 'center' }}>
          <CommonSvg.HomeBarCodeSvg />
          <Text style={GlobalStyles.txtR12THEME} >View Code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePoliceReport} style={{ alignItems: 'center' }}>
          <CommonSvg.PoliceReportSvg />
          <Text style={GlobalStyles.txtR12THEME} >Police Report</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* HEADER */}
      {headerComponent()}

      <CustomInnerContainer containerStyle={{}} scrollable={true}>

        <ProfileComponent />

        <PersonalInfo />

        {
          tenanntData?.documents && tenanntData?.documents?.length > 0 &&
          <DocumentComponent />
        }

        <WorkingInfo />

        <ShareQrPoliceReportComponent />


      </CustomInnerContainer>

      {
        qrCodeModalVisible &&
        <CommonViewQrCodeModal
          visible={qrCodeModalVisible}
          visibleFunction={(visible) => {
            setQrCodeModalVisible(visible)
          }}
          imageUrl={tenantQrCode}
        />
      }

      {
        collectRentModalVisible &&
        <CollectRentModal
          visible={collectRentModalVisible}
          visibleFunction={(visible) => {
            setCollectRentModalVisible(visible)
          }}
          data={tenanntData}
        />
      }

      <CommonBottomTab />

    </CustomContainer>
  )
}

export default TenantInfo