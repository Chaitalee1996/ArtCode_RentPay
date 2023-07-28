import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../styles'
import CommonSvg from '../../../components/svg/CommonSvg'
import { COLORS } from '../../../styles/theme'

type Props = {
    onPress: () => void
}

const FilterButton = ({onPress}: Props) => {
    return (
        <TouchableOpacity style={styles.filterBottomBtn} onPress={onPress} >
            <CommonSvg.FilterSvg color={COLORS.white} />
        </TouchableOpacity>
    )
}

export default FilterButton