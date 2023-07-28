import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobaStyles'
import { ms, mvs } from 'react-native-size-matters'
import { RS } from '../../../constants/enums'
import CommonSvg from '../../../components/svg/CommonSvg'
import { SIZES } from '../../../styles/theme'

type Props = {
    label?: string,
    amount?: any,
    exportOnPress?: () => void
}

const TotalAndExportComponent = ({
    label, amount, exportOnPress
}: Props) => {
    return (
        <View style={[GlobalStyles.rowCenterSpaceBetween, 
            { paddingHorizontal: ms(20), paddingVertical: mvs(15),width:SIZES.width,alignSelf:'center' }]} >
            <View style={GlobalStyles.rowCenter} >
                <Text style={GlobalStyles.txtR16DG} >{label}</Text>
                <View style={{marginLeft:ms(20)}} >
                    <Text style={GlobalStyles.txtM16THEME} >{RS}{amount}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={exportOnPress}>
                <CommonSvg.ExportSvg />
            </TouchableOpacity>
        </View>
    )
}

export default TotalAndExportComponent