import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TenantDetailsGetByUserIdAndTenantId } from '../../services/config/apiMethods/CommonApis';
import { CustomContainer, CustomHeader, CustomStatusBar } from '../../components/custom';
import { ms } from 'react-native-size-matters';
import { GlobalStyles } from '../../styles/GlobaStyles';
import { RS } from '../../constants/enums';

type Props = {}

const MARGIN_TOP = ms(5)

const PropertyAssignDetails = (props: Props) => {

  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const [tenantData, setTenantData] = useState<any>({})

  const TenantId = useRoute()?.params?.id;

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])


  const getData = () => {

    TenantDetailsGetByUserIdAndTenantId(USER_ID, TenantId).then(response => {
      console.log("TENANT DETAILS===>", response)
      setTenantData(response);
    })

  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Assigned Property'>
      </CustomHeader>

      <View style={{ paddingHorizontal: ms(20) }} >

        <View>
          <Text style={GlobalStyles.txtM16THEME} >Property Info</Text>
        </View>

        <View style={{ marginTop: MARGIN_TOP }} >
          <Text style={GlobalStyles.txtR12Grey} >Property name</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenantData?.propertyName}</Text>
        </View>

        <View style={{ marginTop: MARGIN_TOP }} >
          <Text style={GlobalStyles.txtR12Grey} >Room</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenantData?.roomName}</Text>
        </View>
        <View style={{ marginTop: MARGIN_TOP }} >
          <Text style={GlobalStyles.txtR12Grey} >Rent Amount</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenantData?.rentAmount}</Text>
        </View>
        <View style={{ marginTop: MARGIN_TOP }} >
          <Text style={GlobalStyles.txtR12Grey} >Deposite</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenantData?.deposite}</Text>
        </View>
        <View style={{ marginTop: MARGIN_TOP }} >
          <Text style={GlobalStyles.txtR12Grey} >Rent Date</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenantData?.rentDate}</Text>
        </View>
        <View style={{ marginTop: MARGIN_TOP }} >
          <Text style={GlobalStyles.txtR12Grey} >Possession Date</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenantData?.possessionDate}</Text>
        </View>
        <View style={{ marginTop: MARGIN_TOP }} >
          <Text style={GlobalStyles.txtR12Grey} >Total Paid Rent</Text>
          <Text style={GlobalStyles.txtR14DG} >{tenantData?.totalPaidAmount}</Text>
        </View>
        {
          tenantData?.electricityBillByOwner &&
          <>

            <View style={{ marginTop: MARGIN_TOP }} >
              <Text style={GlobalStyles.txtM16THEME} >Electricity bill pay by owner</Text>
            </View>

            <View style={{ marginTop: MARGIN_TOP }} >
              <Text style={GlobalStyles.txtR14Grey} >Per Unit Charge: <Text style={GlobalStyles.txtR14DG} >{RS}{tenantData?.perUnitCharge}</Text></Text>
            </View>

            <View style={{ marginTop: MARGIN_TOP }} >
              <Text style={GlobalStyles.txtR14Grey} >Current Unit: <Text style={GlobalStyles.txtR14DG} >{tenantData?.currentUnit}</Text></Text>
            </View>

          </>

        }


      </View>

    </CustomContainer>
  )
}

export default PropertyAssignDetails