import { View, Text, TouchableOpacity, Linking, Platform } from 'react-native'
import React from 'react'
import CommonSvg from '../svg/CommonSvg'
import { showError } from './FlashToast'

type Props = {
    phone: string
}

const CommonPhoneDial = ({ phone }: Props) => {

    const handlePhone = () => {
        // console.log(phone);
        // Linking.canOpenURL(`tel:+91 ${phone}`).then(response => {
        //     console.log(response)
        //     if (response) {
                Platform.OS == 'android' ?
                    Linking.openURL(`tel:+91 ${phone}`) :
                    Linking.openURL(`tel:${phone}`)
        //     } else {
        //         showError("Mobile Number is not available")
        //     }

        // })
    }

    return (
        <TouchableOpacity onPress={handlePhone}>
            <CommonSvg.PhoneSvg />
        </TouchableOpacity>
    )
}

export default CommonPhoneDial