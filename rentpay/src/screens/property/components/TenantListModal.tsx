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
import { CategoriesGetAllById, PropertyTypeListGetByUserId, TenantsAvailableListGetByUserId } from '../../../services/config/apiMethods/CommonApis';
import { DELMethod, POSTMethod, PUTMethod } from '../../../services/config/apiMethods/CommonMethods';
import { showError, showSuccess } from '../../../components/uiCommon/FlashToast';
import { useNavigation } from '@react-navigation/native';

type Props = {
    visible: boolean,
    visibleFunction: (visible: boolean) => void,
    availableTenants:any
    // categoryData: any[],
}

const TenantListModal = ({ visible, visibleFunction,availableTenants }: Props) => {

    const [modalVisible, setModalVisible] = useState<any>(visible);
    const { USER_ID } = useSelector((state: any) => state.user);
    const navigation = useNavigation<any>();


  



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

                <View style={{ ...styles.modalInnerContainer, width: SIZES.cardWidth, paddingVertical: mvs(0), height: mvs(300) }} >

                    <View style={styles.closeView} >
                        <CommonCloseBtn onPress={handleClose} />
                    </View>

                    <View style={styles.selectTenantView} >
                        <Text style={GlobalStyles.txtM16White} >SELECT TENANT</Text>
                    </View>

                    <FlatList
                        data={availableTenants}
                        keyExtractor={(item) => `tenant-${item.id}`}
                        bounces={false}
                        // showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={()=><View style={{...GlobalStyles.flatLine,marginVertical:mvs(0)}}/>}
                        style={{marginTop: mvs(40), width: SIZES.cardWidth}}
                        contentContainerStyle={{ paddingBottom:mvs(10) }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.tenantListRow} onPress={()=>null} >
                                    <Text style={GlobalStyles.txtR14THEME} numberOfLines={1} adjustsFontSizeToFit >{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />

                </View>

            </View>
        </Modal>
    )
}

export default TenantListModal