import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CommonSvg from '../../../components/svg/CommonSvg'
import { mvs } from 'react-native-size-matters'
import { styles } from '../styles'
import { GlobalStyles } from '../../../styles/GlobaStyles'
import { useNavigation } from '@react-navigation/native'
import screenNames from '../../../constants/screenNames'


const Cards = () => {

  const navigation = useNavigation<any>();

  const options = [
    {
      id: '1',
      title: 'Properties',
      image: <CommonSvg.HomePropertySvg />,
      onPress: () => {
        navigation.navigate(screenNames.PROPERTY);
      }

    },
    {
      id: '2',
      title: 'Tenants',
      image: <CommonSvg.HomeTenantSvg />,
      onPress: () => {
        navigation.navigate(screenNames.MY_TENANT);
      }
    },
    {
      id: '3',
      title: 'Collection',
      image: <CommonSvg.HomeCollectionSvg />,
      onPress: () => {
        navigation.navigate(screenNames.COLLECTION);
      }
    },
    {
      id: '4',
      title: 'Expenses',
      image: <CommonSvg.HomeExpensesSvg />,
      onPress: () => {
        navigation.navigate(screenNames.EXPENSES);
      }
    },
    {
      id: '6',
      title: 'Analytics',
      image: <CommonSvg.HomeAnalyticsSvg />,
      onPress: () => {
        navigation.navigate(screenNames.ANALYTICS);
      }
    },
    {
      id: '7',
      title: 'Subscription',
      image: <CommonSvg.HomeSubscriptionSvg />,
      onPress: () => {
        navigation.navigate(screenNames.SUBSCRIPTION);
      }
    },

  ]

  return (
    <View >

      <FlatList
        data={options}
        keyExtractor={(item) => `-${item.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        contentContainerStyle={{ paddingTop: mvs(20), paddingBottom: mvs(10) }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity activeOpacity={0.8} style={styles.categoryContainer} onPress={item.onPress} >
              <View style={{ height: mvs(40) }} >
                {item.image}
              </View>

              <View style={{ marginTop: mvs(15) }} >
                <Text style={GlobalStyles.txtR14DG} >{item.title}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default Cards