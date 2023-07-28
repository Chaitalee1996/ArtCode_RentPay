import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { CustomContainer, CustomHeader, CustomInnerContainer, CustomRangeSlider, CustomTextInput, CustomThemeButton } from '../../components/custom'
import { CommonBottomTab } from '../../components/uiCommon'
import { styles } from './styles'
import images from '../../constants/images'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { ms, mvs } from 'react-native-size-matters'
import { COLORS, SIZES } from '../../styles/theme'
import RangeSlider from 'rn-range-slider';

import BottomRange from './components/BottomRange'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { SubscriptionPlanGetAll, SubscriptionPlanGetByUserId } from '../../services/config/apiMethods/CommonApis'
import { FlatList } from 'react-native'
import moment from 'moment'
import { GETMethod } from '../../services/config/apiMethods/CommonMethods'
import { PayModal } from './components'

type Props = {}

const btn = {
  NO: 'NOT',
  UPDATE: 'UPDATE',
  PLAN: 'PLAN'
}

const Subscription = (props: Props) => {

  const [selectedView, setSelectedView] = useState(btn.UPDATE);
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(1000);

  const [subscriptionData, setSubscriptionData] = useState<any>([]);
  const [allSubscriptionData, setAllSubscriptionData] = useState<any>([])
  const [selectedPlan, setSelectedPlan] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const [payModalVisible, setPayModalVisible] = useState(false)


  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);




  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])

  const getData = () => {

    SubscriptionPlanGetByUserId(USER_ID).then(response => {
      console.log(response)
      setSubscriptionData(response)
    })
    SubscriptionPlanGetAll().then(response => {
      console.log("All Plans ===>", response)
      setAllSubscriptionData(response)
    })

    GETMethod(`/assign_subscription/total-amount/${USER_ID}`).then(response => {
      setTotalAmount(response)
    })

  }

  const amountReturn = (item: any) => {

    const price = item.listingPrice * item.duration * low;
    const discount = item.price * item.duration * low;

    return [price, discount];
  }



  const NoPlan = () => {
    return (
      <View style={styles.container} >
        <Image source={images.oops} />

        <View style={{ marginTop: mvs(15) }} >
          <Text style={GlobalStyles.txtSB16Grey} >No Subscriptions Yet!</Text>
        </View>

        <View style={{ marginTop: mvs(5) }} >
          <Text style={{ ...GlobalStyles.txtR14Grey, textAlign: 'center' }} >Oh no! This place looks empty! Create your First subscription and manage it with ease!</Text>
        </View>

        <CustomThemeButton
          title={"Add New Subscription"}
          containerStyle={{ width: SIZES.cardWidth - ms(40), marginVertical: mvs(20), }}
          onPress={() => {

          }}
        />
      </View>
    )
  }
  const UpdatePlan = () => {
    return (
      <View style={styles.container}>
        <Image source={images.wow} />

        <View style={{ marginTop: mvs(20) }} >
          <Text style={{ ...GlobalStyles.txtR22DG, textAlign: 'center' }} >Wow! you have {subscriptionData?.subscriptionDuration == 12 ? "Yearly" : "Monthly"} subscription.</Text>
        </View>

        <View style={{ marginTop: mvs(20) }} >
          <Text style={{ ...GlobalStyles.txtR20DG, textAlign: 'center' }} >Subscribe for</Text>
          <Text style={{ ...GlobalStyles.txtM20THEME, textAlign: 'center' }} >{subscriptionData?.noOfRooms}</Text>
        </View>

        <View style={{ marginTop: mvs(5) }} >
          <Text style={GlobalStyles.txtM16Grey} >Room/Flat/Unit</Text>
        </View>
        <View style={{ marginVertical: mvs(5) }}>
          <Text style={GlobalStyles.txtM12Grey} >Expire on {moment(subscriptionData?.expiryDate).format("DD MMM YYYY")}</Text>
        </View>

        <View>
          <Text style={GlobalStyles.txtR16DG} >Remaining balance</Text>
          <Text style={{ ...GlobalStyles.txtM20THEME, textAlign: 'center' }} >₹ {totalAmount}</Text>
        </View>

        <CustomThemeButton
          title={"Update Subscription"}
          containerStyle={{ width: SIZES.cardWidth - ms(40), marginVertical: mvs(20), }}
          onPress={() => {
            setSelectedView(btn.PLAN)
          }}
        />
      </View>
    )
  }
  const Plans = () => {
    return (
      <View style={{ ...styles.container, paddingTop: mvs(10) }}>
        <View style={{ width: '90%' }} >
          <Text style={{ ...GlobalStyles.txtR12Grey, }} numberOfLines={1} >How many Room/Flats/Unit do you want to manage</Text>
          <CustomTextInput
            value={`${low}`}
            onChangeText={(text) => setLow(Number(text))}
            placeholder={'Enter Number'}
            keboardType={'number-pad'}
          />
        </View>

        <CustomRangeSlider
          handleLowHigh={(low, high) => setLow(low)}
        />

        <PlansList />
      </View>
    )
  }

  const PlansList = () => {
    return (
      <View>
        <FlatList
          data={allSubscriptionData}
          keyExtractor={(item) => `subscription-${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: mvs(20) }}

          ListFooterComponent={<CustomThemeButton
            title={"PAY"}
            containerStyle={{ width: SIZES.cardWidth - ms(40), marginVertical: mvs(20), }}
            onPress={() => {
              setPayModalVisible(true)
            }}
          />}
          renderItem={({ item, index }) => {

            if (item.listingPrice != 0) {
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => { setSelectedPlan(item) }} style={[styles.planCard,
                { borderColor: selectedPlan?.id == item.id ? COLORS.theme : COLORS.greyTxt }]} >
                  <View>
                    <Text style={GlobalStyles.txtR14THEME} >{item.duration} months</Text>
                  </View>

                  <View style={{ marginTop: mvs(5) }} >
                    {
                      item.discount == 0 ?
                        <Text style={GlobalStyles.txtM18THEME} >₹ {amountReturn(item)[0]}</Text>
                        :
                        <Text style={GlobalStyles.txtM18THEME} >₹ {amountReturn(item)[0]} {"  "}
                          <Text style={{ ...GlobalStyles.txtM18Grey, textDecorationLine: 'line-through' }} >₹ {amountReturn(item)[1]}</Text></Text>
                    }

                  </View>

                  <View style={{ marginBottom: mvs(45) }} >
                    <Text style={GlobalStyles.txtR14THEME} >{item.rateMsg}</Text>
                  </View>

                  <View style={[styles.cardBottomView, { backgroundColor: selectedPlan?.id == item.id ? COLORS.theme : COLORS.greyTxt }]} >
                    <Text style={GlobalStyles.txtM14White} >{item.discountMsg}</Text>
                  </View>


                </TouchableOpacity>
              )
            }

          }}
        />


      </View>
    )
  }


  return (
    <CustomContainer>
      <CustomHeader title='Subscription Plan' />

      <CustomInnerContainer scrollable={true} containerStyle={{ paddingBottom: mvs(80) }}>

        {
          selectedView == btn.NO ?
            <NoPlan />
            :
            <>
              {
                selectedView == btn.UPDATE ?
                  <UpdatePlan />
                  :
                  <>
                    {Plans()}
                  </>

              }
            </>
        }

      </CustomInnerContainer>

      {
        payModalVisible &&
        <PayModal
          visible={payModalVisible}
          visibleFunction={(visible) => {
            setPayModalVisible(visible)
          }}
          amount={amountReturn(selectedPlan)[0]}
          remainingBalance={totalAmount}
        />
      }
,k
      <CommonBottomTab />
    </CustomContainer>
  )
}

export default Subscription