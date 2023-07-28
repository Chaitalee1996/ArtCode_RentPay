import { View, Text, Linking, Platform, RefreshControl } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader, CustomRefreshControl, CustomStatusBar } from '../../components/custom'
import { GlobalStyles } from '../../styles/GlobaStyles'
import CommonSvg from '../../components/svg/CommonSvg'
import { TouchableOpacity } from 'react-native'
import { ms, mvs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { PropertiesGetAllById } from '../../services/config/apiMethods/CommonApis'
import screenNames from '../../constants/screenNames'
import { FlatList } from 'react-native'
import { CommonBottomTab } from '../../components/uiCommon'
import { COLORS } from '../../styles/theme'
import { showError } from '../../components/uiCommon/FlashToast'
import { __refreshingChange } from '../../services/redux/loadingSlice'

type Props = {}

const Properties = (props: Props) => {

  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const { REFRESHING } = useSelector((state: any) => state.loading);
  const [propertiesData, setPropertiesData] = useState<any>([]);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])


  const getData = () => {

    PropertiesGetAllById(USER_ID)
      .then(response => {

        console.log("Properties==>", response)
        setPropertiesData(response);
      })

  }


  const onRefresh = () => {

    dispatch(__refreshingChange(true))
    getData();
    dispatch(__refreshingChange(false))

  }

  const handlePhone = (phone: any) => {

    Platform.OS == 'android' ?
      Linking.openURL(`tel:+91 ${phone}`) :
      Linking.openURL(`tel:${phone}`)


  }

  const PropertyListComponent = () => {
    return (
      <View>
        <FlatList
          data={propertiesData}
          keyExtractor={(item) => `property-${item.id}`}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={REFRESHING}
              onRefresh={onRefresh}
              tintColor={COLORS.theme}
              colors={[COLORS.theme]}
            />
          }
          contentContainerStyle={{ paddingBottom: mvs(170) }}
          renderItem={({ item, index }) => {
            return (
              <CustomCardContainer containerStyle={{ paddingHorizontal: ms(0), }}>
                <TouchableOpacity onPress={() => navigation.navigate(screenNames.PROPERTY_DETAILS, { id: item.id })}>
                  <View style={{ alignItems: 'flex-start', flexDirection: 'row', paddingHorizontal: ms(20) }} >
                    <CommonSvg.PropertyCardBigSvg />
                    <View style={{ marginLeft: ms(10) }} >
                      <Text style={GlobalStyles.txtR16DG} >{item.name}</Text>
                      <Text style={GlobalStyles.txtR12Grey} numberOfLines={2} >{item.address}</Text>
                    </View>
                  </View>

                  <View style={[GlobalStyles.rowCenterSpaceBetween, { marginTop: mvs(20), paddingHorizontal: ms(20) }]} >
                    <View>
                      <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{item.noOfRooms}</Text>
                      <Text style={GlobalStyles.txtR14Grey} >Total</Text>
                      <Text style={GlobalStyles.txtR14Grey} >Units</Text>
                    </View>
                    <View>
                      <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{item.occupiedRooms}</Text>
                      <Text style={GlobalStyles.txtR14Grey} >Occupied</Text>
                      <Text style={{ ...GlobalStyles.txtR14Grey, textAlign: 'center' }} >Units</Text>
                    </View>
                    <View>
                      <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{item.availableRooms}</Text>
                      <Text style={GlobalStyles.txtR14Grey} >Available</Text>
                      <Text style={{ ...GlobalStyles.txtR14Grey, textAlign: 'center' }} >Units</Text>
                    </View>
                  </View>

                  <View style={GlobalStyles.flatLine} />

                  <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20) }]}>
                    <View>
                      <Text style={GlobalStyles.txtR16DG} >Propery Manager</Text>
                      <Text style={GlobalStyles.txtM14Grey} >{item.managerName}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handlePhone(item.managerContactNumber)}>
                      <CommonSvg.PhoneSvg />
                    </TouchableOpacity>
                  </View>


                </TouchableOpacity>

              </CustomCardContainer>
            )
          }}
        />
      </View>
    )
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Property'>
        <TouchableOpacity style={{ ...GlobalStyles.rowCenter, top: -mvs(10) }}
          onPress={() => {
            navigation.navigate(screenNames.NEW_PROPERTY);
          }} >

          <CommonSvg.HomePropertySvg />
          <View style={{ marginLeft: ms(5) }} >
            <Text style={GlobalStyles.txtM18THEME} >New</Text>
          </View>
        </TouchableOpacity>
      </CustomHeader>


      <PropertyListComponent />

      <CommonBottomTab />

    </CustomContainer>
  )
}

export default Properties