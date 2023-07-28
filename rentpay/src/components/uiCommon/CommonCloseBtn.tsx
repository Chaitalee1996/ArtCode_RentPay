import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/Ionicons'
import { COLORS, SIZES } from '../../styles/theme'
import { ms } from 'react-native-size-matters'

type Props = {
    containeStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    color?: string
}

const CommonCloseBtn = ({ color, containeStyle, onPress }: Props) => {
    return (
        <TouchableOpacity style={[styles.closeBtn, containeStyle]} onPress={onPress}>
            <Icons name='md-close' size={22} color={color ? color : COLORS.white} />
        </TouchableOpacity>
    )
}

export default CommonCloseBtn

const styles = StyleSheet.create({
    closeBtn: {
        height: ms(25),
        width: ms(25),
        borderRadius: SIZES.radius15,
        backgroundColor: "#87859A",
        alignItems: 'center',
        justifyContent: 'center',
    }
})