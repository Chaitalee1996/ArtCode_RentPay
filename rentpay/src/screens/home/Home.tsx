import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomContainer, CustomStatusBar } from '../../components/custom'
import { ms, mvs } from 'react-native-size-matters'
import { COLORS } from '../../styles/theme'
import { styles } from './styles'
import { GlobalStyles } from '../../styles/GlobaStyles'
import CommonSvg from '../../components/svg/CommonSvg'
import { Cards, ProfileHeader } from './components'
import { TenantInfoCard } from '../../components/uiCommon'
import { TENANT_INFO } from '../../constants/dummyData'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { PendingRentTenantListCurrentMonthGetById, TenantListById, UserInfoGetById } from '../../services/config/apiMethods/CommonApis'
import screenNames from '../../constants/screenNames'
import { RS } from '../../constants/enums'

type Props = {}

const btn = {
  today: 'today',
  week: 'week',
  month: 'month',
}

const Home = (props: Props) => {

  const { USER_ID } = useSelector((state: any) => state.user);
  const [selectedBtn, setSelectedBtn] = useState(btn.today);
  const [userData, setUserData] = useState({});
  const [tenantData, setTenantData] = useState([]);
  const navigation = useNavigation<any>();

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
      setUserData(response)
      console.log(response);
    })
    PendingRentTenantListCurrentMonthGetById(USER_ID).then(response => {
      setTenantData(response)
      
    })
  }


  const handleSelectedBtn = (selectedBtn: string) => {
    setSelectedBtn(selectedBtn);
  }

  const PendingRent = () => {
    return (
      <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), }]} >
        <View>
          <Text style={GlobalStyles.txtR16DG} >Pending Rent</Text>
        </View>
        <View style={GlobalStyles.rowCenter} >
          <CommonSvg.CollectionSmallSvg />
          <Text style={{ ...GlobalStyles.txtM16DG, marginLeft: ms(5) }} > {RS}{tenantData?.Total}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(screenNames.COLLECTION)}>
          <Text style={GlobalStyles.txtM12Grey} >View all</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const TimePeriodButton = () => {
    return (
      <View style={[GlobalStyles.rowCenter, { paddingHorizontal: ms(20), marginTop: mvs(5) }]} >
        <TouchableOpacity onPress={() => handleSelectedBtn(btn.today)}
          style={{ ...styles.todayBtn, backgroundColor: selectedBtn == btn.today ? "#E6E9FF" : COLORS.transparent }} >
          <Text style={{
            ...GlobalStyles.txtM14Grey,
            color: selectedBtn == btn.today ? COLORS.theme : COLORS.greyTxt
          }} >Today</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectedBtn(btn.week)}
          style={{ ...styles.todayBtn, backgroundColor: selectedBtn == btn.week ? "#E6E9FF" : COLORS.transparent }} >
          <Text style={{
            ...GlobalStyles.txtM14Grey,
            color: selectedBtn == btn.week ? COLORS.theme : COLORS.greyTxt
          }} >Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectedBtn(btn.month)}
          style={{ ...styles.todayBtn, backgroundColor: selectedBtn == btn.month ? "#E6E9FF" : COLORS.transparent }} >
          <Text style={{
            ...GlobalStyles.txtM14Grey,
            color: selectedBtn == btn.month ? COLORS.theme : COLORS.greyTxt
          }} >Month</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      <ProfileHeader data={userData} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >


        <Cards />

        <PendingRent />

        <TimePeriodButton />

        <TenantInfoCard data={tenantData?.List}  />
      </ScrollView>

    </CustomContainer>
  )
}

export default Home