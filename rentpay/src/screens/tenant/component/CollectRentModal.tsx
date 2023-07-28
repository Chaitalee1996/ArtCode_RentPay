import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles';
import { COLORS, SIZES } from '../../../styles/theme';
import { CommonCloseBtn } from '../../../components/uiCommon';
import { GlobalStyles } from '../../../styles/GlobaStyles';
import { CustomImageView, CustomThemeButton } from '../../../components/custom';
import CommonSvg from '../../../components/svg/CommonSvg';
import moment from 'moment';
import { PAID_STATUS, RS } from '../../../constants/enums';
import { PaidHistoryGetByTenatIdAndPaidStatus, TenantDetailsGetByUserIdAndTenantId } from '../../../services/config/apiMethods/CommonApis';
import { useSelector } from 'react-redux';
import { HandlePhone } from '../../../services/config/helpers/handlePhone';
import SelectDropdown from 'react-native-select-dropdown';
import { ms, mvs } from 'react-native-size-matters';
import { MONTHS } from '../../../constants/dummyData';
import { showError, showSuccess } from '../../../components/uiCommon/FlashToast';
import { POSTMethod } from '../../../services/config/apiMethods/CommonMethods';
import dayjs from 'dayjs';

type Props = {
    visible: boolean,
    visibleFunction: (visible: boolean) => void,
    data: any
}

const CollectRentModal = ({ visible, visibleFunction, data }: Props) => {

    const [modalVisible, setModalVisible] = useState<any>(visible);
    const [selectedMonth, setSelectedMonth] = useState<any>({})
    const [tenantData, setTenantData] = useState<any>({});
    const [amount, setAmount] = useState('0');
    const [paidHistoryData, setPaidHistoryData] = useState<any>([]);
    const [currentReading, setCurrentReading] = useState('0')


    const { USER_ID } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (visible) {
            getData();
        }
    }, [])


    const getData = () => {

        TenantDetailsGetByUserIdAndTenantId(USER_ID, data.id).then(response => {
            console.log("TENANT DETAILS modal===>", response)
            setTenantData(response);
        })

        PaidHistoryGetByTenatIdAndPaidStatus(data.id, PAID_STATUS.PAID).then(response => {
            console.log("Paid History===>", response)
            setPaidHistoryData(response);
        })
    }

    const handleCollect = () => {

        if (selectedMonth.hasOwnProperty('id') == false) {
            showError('Please Select Month')
        } else if (amount == "0") {
            showError("Please enter amount")
        } else {
            const request = {
                "currentReading": Number(currentReading),
                "electricityBillAmount": Number(currentReading) * tenantData?.perUnitCharge,
                "month": selectedMonth?.name,
                "paidAmount": amount,
                "previousReading": tenantData?.currentUnit,
                "propertyId": tenantData?.propertyId,
                "rentAmount": tenantData?.rentAmount,
                "roomId": tenantData?.roomId,
                "tenantId": data.id,
                "usersId": USER_ID
            }

            console.log("rent Collection request===>", request)

            POSTMethod('/rent_collection', request).then(response => {
                if (response.success) {
                    showSuccess(response.message)
                    handleClose()
                } else {
                    showError(response.message)
                }
            })
        }

    }

    const RentDepositeRowComponent = () => {
        return (
            <View style={styles.rentDepositeRowView} >
                <View style={[GlobalStyles.rowCenter, { width: SIZES.cardWidth, alignSelf: 'center' }]}>
                    <View style={styles.rentRow} >
                        <Text style={GlobalStyles.txtM14THEME} >{RS}{tenantData?.rentAmount}</Text>
                        <Text style={GlobalStyles.txtR12Grey} >Rent</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.rentRow} >
                        <Text style={GlobalStyles.txtM14THEME} >{RS}{tenantData?.deposite}</Text>
                        <Text style={GlobalStyles.txtR12Grey} >Deposite</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.rentRow} >
                        <Text style={GlobalStyles.txtM14THEME} >{tenantData?.memberOfTenant}</Text>
                        <Text style={GlobalStyles.txtR12Grey} >Members</Text>
                    </View>
                </View>
            </View>
        )
    }

    const ElectricityView = () => {
        return (
            <View style={{ marginTop: mvs(10) }}>
                <View style={{ marginLeft: ms(20), }} >
                    <Text style={GlobalStyles.txtR12Grey} >Electricity Charges</Text>
                </View>


                <View style={styles.rentDepositeRowView} >
                    <View style={[GlobalStyles.rowCenter, { width: SIZES.cardWidth, alignSelf: 'center' }]}>
                        <View style={styles.rentRow} >
                            <Text style={GlobalStyles.txtM14THEME} >0</Text>
                            <Text style={GlobalStyles.txtR12Grey} >Previous Reading</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.rentRow} >
                            {/* <Text style={GlobalStyles.txtM14THEME} >0</Text> */}
                            <TextInput
                                value={`${currentReading}`}
                                style={[currentReading ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,
                                { width: '100%', paddingVertical: 0, textAlign: 'center', height: '50%' }]}
                                onChangeText={(txt) => setCurrentReading(txt)}
                                autoCapitalize='none'
                                placeholder=''
                                onSubmitEditing={Keyboard.dismiss}
                                keyboardType='number-pad'
                            />
                            <Text style={GlobalStyles.txtR12Grey} >Current Reading</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.rentRow} >
                            <Text style={GlobalStyles.txtM14THEME} >{RS}{Number(currentReading) * tenantData?.perUnitCharge}</Text>
                            <Text style={GlobalStyles.txtR12Grey} >Bill Amount</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const PaidHistoryComponent = () => {
        return (
            <View style={{ marginTop: mvs(10) }}>
                <View style={{ marginLeft: ms(20), }} >
                    <Text style={GlobalStyles.txtM14THEME} >Paid history</Text>
                </View>

                <FlatList
                    data={paidHistoryData}
                    keyExtractor={(item, index) => `paid-${index}`}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{ marginTop: mvs(10) }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[GlobalStyles.rowCenterSpaceBetween, { alignSelf: 'center', width: SIZES.cardWidth - ms(20), marginBottom: mvs(10) }]} >
                                <View style={GlobalStyles.rowCenter} >
                                    <View style={{ marginRight: ms(10) }} >
                                        <Text style={GlobalStyles.txtM14Grey} >{item.month}</Text>
                                    </View>
                                    <Text style={GlobalStyles.txtR12Grey} >({moment(item.collectionDate).format('DD MMM')})</Text>
                                </View>
                                <View>
                                    <Text style={GlobalStyles.txtM14THEME} >{RS}{item.paidAmount}</Text>
                                </View>
                            </View>
                        )
                    }}
                />


            </View>
        )
    }

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
                <View style={styles.collectModalInnerContainer} >
                    <View style={styles.closeBtn} >
                        <CommonCloseBtn
                            onPress={handleClose}
                            containeStyle={{ backgroundColor: COLORS.white }}
                            color={COLORS.greyTxt}
                        />
                    </View>

                    <View style={[GlobalStyles.rowCenterSpaceBetween, styles.cardContainer]} >

                        <CustomImageView imageUrl={tenantData?.profilePic} />

                        <View style={{ width: '60%' }} >
                            <View>
                                <Text style={GlobalStyles.txtR14DG} >{tenantData?.name}</Text>
                            </View>
                            <View>
                                <Text style={GlobalStyles.txtR12Grey} numberOfLines={1} >
                                    {tenantData?.propertyName && tenantData?.propertyName.length > 40 ? tenantData?.propertyName.substring(0, 60) + "..." : tenantData?.propertyName}</Text>
                            </View>
                            <View style={{ ...GlobalStyles.rowCenterSpaceBetween, width: '100%', }} >
                                <Text style={GlobalStyles.txtR12Grey} >Rent : {RS}{tenantData?.rentAmount}</Text>
                                <Text style={GlobalStyles.txtR12Grey} >Due On : {moment(tenantData?.dueDate).format("DD MMM")}</Text>
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => HandlePhone(tenantData?.mobileNo)}>
                            <CommonSvg.PhoneSvg />
                        </TouchableOpacity>

                    </View>
                    <View>

                        <View style={styles.collectRentView} >
                            <ScrollView style={{ flex: 1 }} bounces={false} contentContainerStyle={{paddingBottom:mvs(100)}} showsVerticalScrollIndicator={false}>


                                {/* SELECT MONTH */}
                                <View >
                                    <View style={{ marginLeft: ms(20), }} >
                                        <Text style={GlobalStyles.txtR12Grey} >Select Month *</Text>
                                    </View>

                                    <SelectDropdown
                                        dropdownStyle={GlobalStyles.dropDownStyleRow}
                                        rowTextStyle={GlobalStyles.txtR14THEME}
                                        defaultButtonText={"Select Month"}
                                        data={MONTHS}
                                        buttonTextStyle={[selectedMonth.hasOwnProperty('id') ? GlobalStyles.txtM16THEME : GlobalStyles.txtM14Grey, { textAlign: 'left', }]}
                                        buttonStyle={[GlobalStyles.dropDownStyle,]}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem.name;
                                        }}
                                        rowTextForSelection={(item, index) => {

                                            return item.name;
                                        }}
                                        onSelect={(selectedItem, index) => {
                                            setSelectedMonth(selectedItem)
                                        }}
                                        renderDropdownIcon={() => (
                                            <CommonSvg.ArrowDownSvg />
                                        )}
                                    />
                                </View>

                                {
                                    tenantData?.electricityBillByOwner &&
                                    <>
                                        {ElectricityView()}
                                    </>
                                }

                                {/* ENTER AMOUNT */}
                                <View style={{ marginTop: mvs(10) }}>
                                    <View style={{ marginLeft: ms(20), }} >
                                        <Text style={GlobalStyles.txtR12Grey} >Rent Amount *</Text>
                                    </View>
                                    <TextInput
                                        value={`${amount}`}
                                        style={[GlobalStyles.inputStyle, amount ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
                                        onChangeText={(txt: any) => setAmount(txt)}
                                        autoCapitalize='none'
                                        placeholder={'Enter Rent Amount'}
                                        maxLength={10}
                                        placeholderTextColor={COLORS.greyTxt}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss()
                                        }}
                                        keyboardType='number-pad'
                                    />

                                </View>

                                <RentDepositeRowComponent />

                                <PaidHistoryComponent />

                                <CustomThemeButton
                                    title='Collect'
                                    containerStyle={{ width: SIZES.cardWidth, marginTop: mvs(20), marginBottom: mvs(80) }}
                                    onPress={handleCollect}
                                />


                            </ScrollView>

                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CollectRentModal