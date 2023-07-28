import { Keyboard, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../styles/theme'
import { ms, mvs } from 'react-native-size-matters'
import { GlobalStyles } from '../../styles/GlobaStyles'

type Props = {
    value: string,
    style?: StyleProp<ViewStyle>,
    onChangeText?: (value: any) => void,
    placeholder?: string,
    keboardType?: string,
    maxLength?: number,
    multiline?: boolean,
    numberOfLines?:number

}

const CustomTextInput = ({
    value, style, onChangeText, placeholder, keboardType, maxLength,multiline,numberOfLines
}: Props) => {
    return (
        <TextInput
            value={value}
            style={[styles.inputStyle,value? GlobalStyles.txtM16THEME:GlobalStyles.txtR14THEME,style]}
            onChangeText={(txt: any) => onChangeText(txt)}
            autoCapitalize='none'
            placeholder={placeholder}
            placeholderTextColor={COLORS.greyTxt}
            maxLength={maxLength}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onSubmitEditing={Keyboard.dismiss}
            keyboardType={keboardType ? keboardType : 'default'}
        />
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputStyle: {
        height: mvs(45),
        width: SIZES.cardWidth,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: ms(15),
        marginTop: mvs(5),
        alignSelf: 'center',
        borderRadius: SIZES.radius,
        borderWidth: ms(1),
        borderColor: COLORS.lightWhite,

    }
})