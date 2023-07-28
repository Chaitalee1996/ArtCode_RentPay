import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader, CustomStatusBar } from '../../components/custom'
import { useNavigation } from '@react-navigation/native';
import { NotificationsGetByUserId } from '../../services/config/apiMethods/CommonApis';
import { useDispatch, useSelector } from 'react-redux';
import { ms, mvs } from 'react-native-size-matters';
import { COLORS, SIZES } from '../../styles/theme';
import { GlobalStyles } from '../../styles/GlobaStyles';
import moment from 'moment';
import { __refreshingChange } from '../../services/redux/loadingSlice';
import { CommonBottomTab } from '../../components/uiCommon';


const Notification = () => {

  const [notificationData, setNotificationData] = useState<any>([])
  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const { REFRESHING } = useSelector((state: any) => state.loading);
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

    NotificationsGetByUserId(USER_ID).then(response => {
      setNotificationData(response)
    })

  }

  const onRefresh = () => {
    dispatch(__refreshingChange(true))
    getData();
    dispatch(__refreshingChange(false))
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Notification' />

      <FlatList
        data={notificationData}
        keyExtractor={(item) => `notification-${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: mvs(10),paddingBottom:mvs(70) }}
        refreshControl={<RefreshControl
          refreshing={REFRESHING}
          onRefresh={onRefresh}
          tintColor={COLORS.theme}
          colors={[COLORS.theme]}
        />}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.notiContainer} >
              <View style={GlobalStyles.rowCenterSpaceBetween} >
                <Text style={GlobalStyles.txtR14DG} >{item.title}</Text>
                <Text style={GlobalStyles.txtR14Grey} >{moment(item.createdAt).format("DD MMM")}</Text>
              </View>
            </View>
          )
        }}
      />

      <CommonBottomTab/>
    </CustomContainer>
  )
}

const styles = StyleSheet.create({
  notiContainer: {

    marginBottom: mvs(10),
    width: SIZES.cardWidth,
    alignSelf: 'center',
    paddingHorizontal: ms(10),
    paddingVertical: mvs(15),
    borderRadius: SIZES.radius12,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkGrey,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 5,
  }
})

export default Notification