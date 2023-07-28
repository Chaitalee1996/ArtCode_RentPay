import { View, Text } from 'react-native'
import React from 'react'
import CommonSvg from '../../../components/svg/CommonSvg'
import { mvs } from 'react-native-size-matters'

type Props = {}

const NoReportDataComponent = (props: Props) => {
  return (
    <View style={{alignSelf:'center',marginTop:mvs(100)}} >
      <CommonSvg.NoReportSvg/>
    </View>
  )
}

export default NoReportDataComponent