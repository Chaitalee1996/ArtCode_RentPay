import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { GlobalStyles } from '../../styles/GlobaStyles';
import { COLORS, SIZES } from '../../styles/theme';
import { ms, mvs } from 'react-native-size-matters';
import CommonCloseBtn from './CommonCloseBtn';
import Icons from 'react-native-vector-icons/Entypo'
import Share from 'react-native-share';


type Props = {
    visible: boolean,
    visibleFunction: (visible: boolean) => void,
    imageUrl: string

}



const CommonViewQrCodeModal = ({ visible, visibleFunction, imageUrl }: Props) => {

    const [modalVisible, setModalVisible] = useState<any>(visible);

    const handleClose = () => {
        visibleFunction(false)
        setModalVisible(false)
    }

    const handleShare = async () => {
        const response = await Share.open({ url: imageUrl });
        console.log(response);
    }

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={modalVisible}
            onRequestClose={() => {
                handleClose()
            }}>

            <View style={[StyleSheet.absoluteFillObject, GlobalStyles.ModalContainer]}>

                <View style={styles.modalInnerContainer} >
                    <View style={{ position: 'absolute', top: mvs(15), right: ms(15) }} >
                        <CommonCloseBtn onPress={handleClose} />
                    </View>

                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.imageStyle}
                    />

                    <TouchableOpacity onPress={handleShare} style={[GlobalStyles.rowCenter, styles.shareBtn]} >
                        <Icons name='share' size={20} color={COLORS.theme} />
                        <Text style={{ ...GlobalStyles.txtR14THEME, marginLeft: ms(5) }} >Share QR Code</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}

export default CommonViewQrCodeModal

const styles = StyleSheet.create({
    modalInnerContainer: {
        backgroundColor: COLORS.white,
        width: SIZES.cardWidth - ms(40),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: mvs(20),
        borderRadius: SIZES.radius12
    },
    imageStyle: {
        height: mvs(210),
        width: ms(200),
        resizeMode: 'cover'
    },
    shareBtn: {
        paddingHorizontal: ms(10),
        borderWidth: ms(1),
        borderColor: COLORS.theme,
        borderRadius: ms(2),
        paddingVertical: mvs(5)
    }
})