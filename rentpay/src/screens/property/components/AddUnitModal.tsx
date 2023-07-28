import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles';
import { CommonCloseBtn } from '../../../components/uiCommon';
import { ms, mvs } from 'react-native-size-matters';
import { GlobalStyles } from '../../../styles/GlobaStyles';
import { CustomRangeSlider, CustomTextInput, CustomThemeButton } from '../../../components/custom';
import { COLORS, SIZES } from '../../../styles/theme';
import CommonSvg from '../../../components/svg/CommonSvg';
import { useSelector } from 'react-redux';
import { CategoriesGetAllById, PropertyTypeListGetByUserId } from '../../../services/config/apiMethods/CommonApis';
import { DELMethod, POSTMethod, PUTMethod } from '../../../services/config/apiMethods/CommonMethods';
import { showError, showSuccess } from '../../../components/uiCommon/FlashToast';

type Props = {
    visible: boolean,
    visibleFunction: (visible: boolean) => void,
    generateOnPress: (roomName: string, roomCount: number) => void,

    // categoryData: any[],
}


const AddUnitModal = ({ visible, visibleFunction, generateOnPress }: Props) => {

    const [modalVisible, setModalVisible] = useState<any>(visible);
    const [roomName, setRoomName] = useState('');
    const [low, setLow] = useState(1)


    const handleClose = () => {
        visibleFunction(false)
        setModalVisible(false)
    }

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={modalVisible}
            onRequestClose={() => {
                handleClose()
            }}>

            <View style={[StyleSheet.absoluteFillObject, styles.ModalContainer]}>
                <View style={styles.modalInnerContainer} >


                    <View style={{ marginTop: mvs(30) }}>
                        <View style={{ marginBottom: mvs(2), }} >
                            <Text style={GlobalStyles.txtR12Grey} >How many Units do you have *</Text>
                        </View>

                        <CustomTextInput
                            value={`${low}`}
                            onChangeText={(text) => setLow(Number(text))}
                            placeholder={'Enter Number'}
                            keboardType={'number-pad'}
                            style={{ width: SIZES.cardWidth - ms(40) }}
                        />
                    </View>

                    <View style={{ marginTop: mvs(10), alignSelf: 'center' }}>

                        <CustomRangeSlider value={low == '' || 0 ? 1 : low} handleLowHigh={(low, high) => setLow(low)}
                            style={{ width: SIZES.cardWidth }} />


                    </View>



                    <View style={{ marginTop: mvs(10) }}>
                        <View style={{ marginBottom: mvs(2), }} >
                            <Text style={GlobalStyles.txtR12Grey} >Room Name *</Text>
                        </View>

                        <CustomTextInput
                            value={roomName}
                            onChangeText={(text) => setRoomName(text)}
                            placeholder={'e.g Room/Flat/Kholi'}
                            style={{ width: SIZES.cardWidth - ms(40) }}
                        />
                    </View>

                    <View style={[GlobalStyles.rowCenterSpaceBetween, { width: SIZES.cardWidth - ms(40), marginTop: mvs(20) }]} >
                        <TouchableOpacity style={styles.cancelBtn} onPress={handleClose} >
                            <Text style={GlobalStyles.txtR14DG} >Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.cancelBtn, backgroundColor: COLORS.theme, shadowColor: COLORS.theme }}
                            onPress={() => {
                                generateOnPress(roomName, low);
                                handleClose()
                            }}
                        >
                            <Text style={GlobalStyles.txtR14White} >Update Unit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddUnitModal