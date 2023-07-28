import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { styles } from '../styles';
import { GlobalStyles } from '../../../styles/GlobaStyles';
import { CommonCloseBtn } from '../../../components/uiCommon';
import { COLORS, SIZES } from '../../../styles/theme';
import { ms, mvs } from 'react-native-size-matters';
import { DASHES, RS } from '../../../constants/enums';
import { CustomThemeButton } from '../../../components/custom';

type Props = {
    visible: boolean,
    visibleFunction: (visible: boolean) => void,
    amount?: any;
    remainingBalance?: any
    // categoryData: any[],
}

const PayModal = ({ visible, visibleFunction, amount, remainingBalance }: Props) => {

    const [modalVisible, setModalVisible] = useState<any>(visible);
    const { USER_ID } = useSelector((state: any) => state.user);

    const totalAmount = amount < remainingBalance ? 0 : amount - remainingBalance;
    const gst = amount < remainingBalance ? 0 : (totalAmount / 100 * 18).toFixed(2);

    console.log("Total Amount===>", totalAmount);
    console.log("gst===>", gst);


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

            <View style={[StyleSheet.absoluteFillObject, GlobalStyles.ModalContainer]}>
                <View style={styles.modalInnerContainer} >
                    <View style={[GlobalStyles.rowCenterSpaceBetween,
                    { paddingHorizontal: ms(20), width: '100%', marginBottom: mvs(8) }]} >
                        <Text style={GlobalStyles.txtM14Grey} >Amount</Text>
                        <Text style={GlobalStyles.txtM14DG} >{RS}{amount}</Text>
                    </View>
                    <View style={[GlobalStyles.rowCenterSpaceBetween,
                    { paddingHorizontal: ms(20), width: '100%', marginBottom: mvs(5) }]} >
                        <Text style={GlobalStyles.txtM14Grey} >Remaining Balance</Text>
                        <Text style={{ ...GlobalStyles.txtM14DG, color: COLORS.green }} >{RS}{remainingBalance}</Text>
                    </View>

                    <View style={{ width: SIZES.cardWidth - ms(10), marginBottom: mvs(5), alignSelf: 'center' }} >
                        <Text style={{ ...GlobalStyles.txtR16Grey, width: '100%' }} numberOfLines={1}
                            adjustsFontSizeToFit >{DASHES}</Text>
                    </View>

                    <View style={[GlobalStyles.rowCenterSpaceBetween,
                    { paddingHorizontal: ms(20), width: '100%', marginBottom: mvs(10) }]} >
                        <Text style={GlobalStyles.txtM14Grey} >Total Amount</Text>
                        <Text style={GlobalStyles.txtM14DG} >{RS}{totalAmount}</Text>
                    </View>
                    <View style={[GlobalStyles.rowCenterSpaceBetween,
                    { paddingHorizontal: ms(20), width: '100%', marginBottom: mvs(10) }]} >
                        <Text style={GlobalStyles.txtM14Grey} >GST(18%)</Text>
                        <Text style={GlobalStyles.txtM14DG} >{RS}{gst}</Text>
                    </View>

                    <View style={{ ...GlobalStyles.flatLine, marginVertical: mvs(2) }} />

                    <View style={[GlobalStyles.rowCenterSpaceBetween,
                    { paddingHorizontal: ms(20), width: '100%', marginBottom: mvs(10), marginTop: mvs(10) }]} >
                        <Text style={GlobalStyles.txtM16Grey} >Payable Amount</Text>
                        <Text style={GlobalStyles.txtM16DG} >{RS}{Number(totalAmount) + Number(gst)}</Text>
                    </View>
                    {
                        totalAmount == 0 &&
                        <View style={{ paddingHorizontal: ms(20), width: '100%', marginBottom: mvs(10) }} >
                            <Text style={{ ...GlobalStyles.txtM14DG, color: COLORS.green,textAlign:'center'}} numberOfLines={2} >Reflected amount added in remaining balance {RS}{remainingBalance - amount}.</Text>
                        </View>

                    }

                    <CustomThemeButton
                        title={"PAY"}
                        containerStyle={{ width: SIZES.cardWidth - ms(40), marginTop: mvs(10), height: mvs(35), marginBottom: mvs(20) }}
                        onPress={() => {
                            handleClose( )
                        }}
                    />

                </View>
                <View style={styles.closeView} >
                    <CommonCloseBtn
                        containeStyle={{ backgroundColor: COLORS.theme }}
                        onPress={handleClose}
                    />
                </View>
            </View>
        </Modal>
    )

}

export default PayModal