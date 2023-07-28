import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles'
import { GlobalStyles } from '../../../styles/GlobaStyles'
import CommonSvg from '../../../components/svg/CommonSvg'
import { ms } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import screenNames from '../../../constants/screenNames'

type Props={
    data:any
}

const ProfileHeader = ({data}:Props) => {

  const navigation=useNavigation<any>();
  
  return (
    <View style={[styles.headerContainer,]} >
        <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), }]}>
          <View style={{ width: '60%' }} >
            <Text style={GlobalStyles.txtR16Grey} >Welcome,</Text>
            <Text style={{ ...GlobalStyles.txtM22THEME, width: '100%' }} numberOfLines={1} >{data?.name}</Text>
          </View>
          <TouchableOpacity>
            <CommonSvg.HomeBarCodeSvg />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate(screenNames.NOTIFICATION)}>
            <CommonSvg.NotificationSvg />
          </TouchableOpacity>
        </View>

        <View style={styles.dottedLine} />
      </View>
  )
}

export default ProfileHeader