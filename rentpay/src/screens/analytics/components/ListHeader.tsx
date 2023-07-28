import { View, Text } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../styles/GlobaStyles'
import { styles } from '../styles'

type Props = {
    data:any[],
}

const ListHeader = ({data}: Props) => {
    return (
        <View style={[GlobalStyles.rowCenter, styles.listHeaderContainer]} >
            <View style={styles.cellContainer} >
                <Text style={{ ...GlobalStyles.txtM12THEME, width: '100%' }} >{data[0]}</Text>
            </View>
            <View style={styles.cellContainer} >
                <Text style={{ ...GlobalStyles.txtM12THEME, width: '100%' }} >{data[1]}</Text>
            </View>
            <View style={styles.cellContainer} >
                <Text style={{ ...GlobalStyles.txtM12THEME, width: '100%' }} >{data[2]}</Text>
            </View>
            <View style={styles.cellContainer} >
                <Text style={{ ...GlobalStyles.txtM12THEME, width: '100%' }} >{data[3]}</Text>
            </View>
        </View>
    )
}

export default ListHeader