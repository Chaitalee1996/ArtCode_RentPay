import { View, Text, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CustomContainer, CustomInnerContainer, CustomStatusBar, CustomSwitch, CustomThemeButton } from '../../components/custom'
import CommonSvg from '../../components/svg/CommonSvg'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { ms, mvs } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'
import { DASHES } from '../../constants/enums'
import { useSelector } from 'react-redux'
import { AssetsGetAll, PropertiesGetAllById, RoomListGetByPropertyId, RoomsAvailableGetByPropertyId } from '../../services/config/apiMethods/CommonApis'
import SelectDropdown from 'react-native-select-dropdown'
import { COLORS, SIZES } from '../../styles/theme'
import { showError, showSuccess } from '../../components/uiCommon/FlashToast'
import CommonCalendar from '../../components/uiCommon/CommonCalendar'
import moment from 'moment'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/AntDesign'
import { POSTMethod } from '../../services/config/apiMethods/CommonMethods'
import screenNames from '../../constants/screenNames'

type Props = {}

const AssignProperty = (props: Props) => {

    const tenantData = useRoute()?.params?.tenantData;
    // console.log(tenantData)
    const { USER_ID } = useSelector((state: any) => state.user);
    const navigation = useNavigation<any>();
    const [propertiesData, setPropertiesData] = useState<any>([]);
    const [propertyId, setPropertyId] = useState(0);
    const [roomsData, setRoomsData] = useState<any>([]);
    const [roomId, setRoomId] = useState(0);

    const [assetCount, setAssetCount] = useState(1)

    const [assetsData, setAssetsData] = useState<any>([]);
    const [selectedAsset, setSelectedAsset] = useState({});
    const [selectedAssetRequestData, setSelectedAssetRequestData] = useState([])

    const [perUnitCharge, setPerUnitCharge] = useState(0);
    const [currentUnit, setCurrentUnit] = useState(0)

    const [amount, setAmount] = useState('')
    const [deposite, setDeposite] = useState('');
    const [rentDate, setRentDate] = useState('');
    const [possessionDate, setPossessionDate] = useState(null)
    const [displayDate, setDisplayDate] = useState(new Date());

    const [rentAdvanceSwitch, setRentAdvanceSwitch] = useState(false);
    const [electricitySwitch, setElectricitySwitch] = useState(false);
    const [assetsSwitch, setAssetsSwitch] = useState(false)

    const [dateVisible, setDateVisible] = useState(false);

    const amountRef = useRef<TextInput>();
    const depositeRef = useRef<TextInput>();
    const rentDateRef = useRef<TextInput>();
    const currentUnitRef = useRef<TextInput>();


    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            getData();
        });

        return () => {
            subscribe;
        };
    }, [])

    const getData = () => {
        PropertiesGetAllById(USER_ID)
            .then(response => {
                //   const data: any = [{ id: 0, name: 'All Properties' }, ...response]
                // console.log("Properties==>", data)
                setPropertiesData(response);
            })

        AssetsGetAll().then(response => {
            setAssetsData(response)
        });
    }

    const getRoomsData = (pId: any) => {

        RoomsAvailableGetByPropertyId(pId).then(response => {
            console.log(response);
            if (response.length > 0) {
                setRoomsData(response)
            } else {
                showError("No Rooms Available for this property")
            }

        });

    }

    const handleAddAsset = () => {

        if (selectedAsset.hasOwnProperty('id')) {
            const data: any = [...selectedAssetRequestData, {
                "id": selectedAsset?.id,
                "name": selectedAsset?.name,
                "quantity": assetCount
            }]

            console.log("Added Asset Data==>", data)
            setAssetCount(1)
            setSelectedAssetRequestData(data);
        }

    }

    const handleAssign = () => {

        if (propertyId == 0) {
            showError('Please select a property')
        } else if (roomId == 0) {
            showError('Please select a room')
        } else if (amount == "") {
            showError('Please enter rent amount')
        } else if (rentDate == "") {
            showError('Please enter rent date')
        } else if (possessionDate == null) {
            showError('Please enter possession date')
        } else if (assetsData && selectedAssetRequestData.length < 1) {
            showError('Please add assets')
        } else {
            const request = {
                "advanceRent": rentAdvanceSwitch,
                "assets": assetsSwitch,
                "assetsRequests": selectedAssetRequestData,
                "currentUnit": electricitySwitch ? currentUnit : 0,
                "deposite": deposite,
                "electricityBillByOwner": electricitySwitch,
                "perUnitCharge": electricitySwitch ? perUnitCharge : 0,
                "possessionDate": moment(possessionDate).format('DD-MM-YYYY'),
                "propertyId": propertyId,
                "rentAmount": amount,
                "rentDate": rentDate,
                "roomId": roomId,
                "tenantId": tenantData?.id,
                "usersId": USER_ID
            }


            console.log("Save Request===>", request)

            POSTMethod('/assign_property', request).then((response) => {
                console.log(response)
                if (response.success) {
                    showSuccess(response.message)
                    navigation.navigate(screenNames.MY_TENANT)
                } else {
                    showError(response.message)
                }
            })
        }
    }

    const headerComponent = () => {
        return (
            <View style={[GlobalStyles.headerContainer, , { height: mvs(100) }]} >
                <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20) }]} >

                    <View style={{ alignItems: 'center', height: mvs(60), justifyContent: 'space-between' }} >
                        <CommonSvg.HomePropertySvg />
                        <Text style={GlobalStyles.txtR12Grey} >Assign Property</Text>
                    </View>

                    <View>
                        <Text style={GlobalStyles.txtM18Grey} >{tenantData?.name}</Text>
                    </View>
                </View>
                <View style={GlobalStyles.dottedLineContainer} >
                    <Text style={{ ...GlobalStyles.txtM16Grey, }} numberOfLines={1} adjustsFontSizeToFit>{DASHES}</Text>
                </View>
            </View>
        )
    }

    return (
        <CustomContainer>
            <CustomStatusBar />

            {/* HEADER */}
            {headerComponent()}

            <CustomInnerContainer scrollable={true}>

                {/* SELECT PROPERTY */}
                <View >
                    <View style={{ marginLeft: ms(20), marginBottom: mvs(2) }} >
                        <Text style={GlobalStyles.txtR12Grey} >Select Property *</Text>
                    </View>

                    <SelectDropdown
                        dropdownStyle={{
                            borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                            backgroundColor: COLORS.white
                        }}
                        rowTextStyle={GlobalStyles.txtR14THEME}
                        defaultButtonText={"Select Property"}
                        data={propertiesData}
                        buttonTextStyle={[propertyId != 0 ? GlobalStyles.txtM16THEME : GlobalStyles.txtM14Grey, { textAlign: 'left', }]}
                        buttonStyle={[GlobalStyles.dropDownStyle,]}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                        }}
                        rowTextForSelection={(item, index) => {

                            return item.name;
                        }}
                        onSelect={(selectedItem, index) => {
                            setPropertyId(selectedItem.id)
                            getRoomsData(selectedItem.id)
                        }}
                        renderDropdownIcon={() => (
                            <CommonSvg.ArrowDownSvg />
                        )}
                    />
                </View>

                {/* SELECT Room */}
                <View style={{ marginTop: mvs(10) }} >
                    <View style={{ marginLeft: ms(20), marginBottom: mvs(2) }} >
                        <Text style={GlobalStyles.txtR12Grey} >Select Room *</Text>
                    </View>

                    <SelectDropdown
                        dropdownStyle={GlobalStyles.dropDownStyleRow}
                        rowTextStyle={GlobalStyles.txtR14THEME}
                        defaultButtonText={"Select Room"}
                        disabled={propertyId != 0 ? false : true}
                        data={roomsData}
                        buttonTextStyle={[roomId != 0 ? GlobalStyles.txtM16THEME : GlobalStyles.txtM14Grey, { textAlign: 'left', }]}
                        buttonStyle={[GlobalStyles.dropDownStyle,]}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                        }}
                        rowTextForSelection={(item, index) => {

                            return item.name;
                        }}
                        onSelect={(selectedItem, index) => {
                            setRoomId(selectedItem.id)
                        }}
                        renderDropdownIcon={() => (
                            <CommonSvg.ArrowDownSvg />
                        )}
                    />
                </View>

                {/* ENTER AMOUNT */}
                <View style={{ marginTop: mvs(10) }}>
                    <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
                        <Text style={GlobalStyles.txtR12Grey} >Rent Amount *</Text>
                    </View>
                    <TextInput
                        value={`${amount}`}
                        ref={amountRef}
                        style={[GlobalStyles.inputStyle, amount ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
                        onChangeText={(txt: any) => setAmount(txt)}
                        autoCapitalize='none'
                        placeholder={'Enter Rent Amount'}
                        maxLength={10}
                        placeholderTextColor={COLORS.greyTxt}
                        onSubmitEditing={() => {
                            depositeRef?.current.focus()
                        }}
                        keyboardType='number-pad'
                    />

                </View>

                {/* ENTER DEPOSITE */}
                <View style={{ marginTop: mvs(10) }}>
                    <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
                        <Text style={GlobalStyles.txtR12Grey} >Deposite Amount *</Text>
                    </View>
                    <TextInput
                        value={`${deposite}`}
                        ref={depositeRef}
                        style={[GlobalStyles.inputStyle, deposite ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
                        onChangeText={(txt: any) => setDeposite(txt)}
                        autoCapitalize='none'
                        placeholder={'Enter Deposite Amount'}
                        maxLength={10}
                        placeholderTextColor={COLORS.greyTxt}
                        onSubmitEditing={() => {
                            rentDateRef?.current.focus()
                        }}
                        keyboardType='number-pad'
                    />

                </View>

                {/* ENTER DATE */}
                <View style={{ marginTop: mvs(10) }}>
                    <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
                        <Text style={GlobalStyles.txtR12Grey} >Rent Date *</Text>
                    </View>
                    <TextInput
                        value={`${rentDate}`}
                        ref={rentDateRef}
                        style={[GlobalStyles.inputStyle, rentDate ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME,]}
                        onChangeText={(txt: any) => setRentDate(txt)}
                        autoCapitalize='none'
                        placeholder={'Enter Rent Date'}
                        maxLength={10}
                        placeholderTextColor={COLORS.greyTxt}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                        keyboardType='number-pad'
                    />

                </View>

                {/* POSSESSION DATE */}
                <View style={{ marginVertical: mvs(10) }}>
                    <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
                        <Text style={GlobalStyles.txtR12Grey} >Possession Date *</Text>
                    </View>

                    <TouchableOpacity onPress={() => setDateVisible(true)} activeOpacity={0.8}
                        style={[GlobalStyles.inputStyle, GlobalStyles.rowCenterSpaceBetween]} >

                        <Text style={possessionDate == null ? GlobalStyles.txtR14Grey : GlobalStyles.txtM16THEME} >
                            {possessionDate == null ? 'Select Date' : moment(possessionDate).format('DD MMM YYYY')}</Text>
                        <CommonSvg.CalendarSvg />
                    </TouchableOpacity>



                </View>

                <View style={[GlobalStyles.rowCenterSpaceBetween, GlobalStyles.ph20, { marginTop: mvs(10) }]} >
                    <View>
                        <Text style={GlobalStyles.txtR16THEME} >Rent Advance</Text>
                    </View>
                    <CustomSwitch
                        visible={rentAdvanceSwitch}
                        handleNotificationOnOff={(visible) => {
                            setRentAdvanceSwitch(visible)
                        }}
                    />
                </View>

                <View style={[GlobalStyles.rowCenterSpaceBetween, GlobalStyles.ph20, { marginTop: mvs(10) }]} >
                    <View>
                        <Text style={GlobalStyles.txtR16THEME} >Elecricity Bill pay by owner</Text>
                    </View>
                    <CustomSwitch
                        visible={electricitySwitch}
                        handleNotificationOnOff={(visible) => {
                            setElectricitySwitch(visible)
                        }}
                    />
                </View>

                {
                    electricitySwitch &&
                    <View style={{ marginTop: mvs(10) }} >
                        <View style={[GlobalStyles.rowCenterSpaceBetween, GlobalStyles.ph20]} >
                            <View>
                                <Text style={GlobalStyles.txtR16THEME} >Per Unit Charge</Text>
                            </View>
                            <TextInput
                                value={`${perUnitCharge}`}
                                style={[styles.unitInputStyle, GlobalStyles.txtM16THEME]}
                                onChangeText={(txt: any) => setPerUnitCharge(txt)}
                                autoCapitalize='none'
                                onSubmitEditing={() => {
                                    currentUnitRef?.current?.focus()
                                }}
                                keyboardType='number-pad'
                            />
                        </View>
                        <View style={[GlobalStyles.rowCenterSpaceBetween, GlobalStyles.ph20, { marginTop: mvs(10) }]} >
                            <View>
                                <Text style={GlobalStyles.txtR16THEME} >Current Unit</Text>
                            </View>
                            <TextInput
                                value={`${currentUnit}`}
                                ref={currentUnitRef}
                                style={[styles.unitInputStyle, GlobalStyles.txtM16THEME]}
                                onChangeText={(txt: any) => setCurrentUnit(txt)}
                                autoCapitalize='none'
                                onSubmitEditing={() => {
                                    Keyboard.dismiss()
                                }}
                                keyboardType='number-pad'
                            />
                        </View>
                    </View>
                }

                <View style={[GlobalStyles.rowCenterSpaceBetween, GlobalStyles.ph20, { marginTop: mvs(10) }]} >
                    <View>
                        <Text style={GlobalStyles.txtR16THEME} >Assets</Text>
                    </View>
                    <CustomSwitch
                        visible={assetsSwitch}
                        handleNotificationOnOff={(visible) => {
                            setAssetsSwitch(visible)
                        }}
                    />

                </View>

                {
                    assetsSwitch &&
                    <View style={{ marginTop: mvs(10) }} >
                        <View style={[GlobalStyles.rowCenterSpaceBetween, GlobalStyles.ph20]} >
                            <SelectDropdown
                                dropdownStyle={GlobalStyles.dropDownStyleRow}
                                rowTextStyle={GlobalStyles.txtR14THEME}
                                defaultButtonText={"Select Asset"}
                                data={assetsData}
                                buttonTextStyle={[selectedAsset.hasOwnProperty('id') ? GlobalStyles.txtM16THEME : GlobalStyles.txtM14Grey, { textAlign: 'left', }]}
                                buttonStyle={[GlobalStyles.dropDownStyle, { width: SIZES.cardWidth / 1.8, height: mvs(40) }]}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.name;
                                }}
                                rowTextForSelection={(item, index) => {

                                    return item.name;
                                }}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem)
                                    setSelectedAsset(selectedItem)
                                }}
                                renderDropdownIcon={() => (
                                    <Icon name='down' size={20} color={COLORS.theme} />
                                )}
                            />

                            <View style={[GlobalStyles.rowCenterSpaceBetween, { marginLeft: ms(20) }]} >
                                <TouchableOpacity onPress={() => {
                                    if (assetCount != 1) {
                                        setAssetCount(prev => prev - 1);
                                    }
                                }}
                                    style={styles.assetPlusView} >
                                    <Icon name='minus' size={18} color={COLORS.theme} />
                                </TouchableOpacity>
                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}  >
                                    <Text style={GlobalStyles.txtM14THEME} >{assetCount}</Text>
                                </View>
                                <TouchableOpacity onPress={() => setAssetCount(prev => prev + 1)}
                                    style={styles.assetPlusView}>
                                    <Icon name='plus' size={18} color={COLORS.theme} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.addAssetBtn} onPress={handleAddAsset} >
                            <Text style={GlobalStyles.txtM14White} >Add Asset</Text>
                        </TouchableOpacity>

                        <FlatList
                            data={selectedAssetRequestData}
                            keyExtractor={(item: any, index) => `-${item.id}${index}`}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{}}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={[styles.assetRowContainer, GlobalStyles.rowCenterSpaceBetween]} >
                                        <Text style={GlobalStyles.txtM14DG} >{item.name}
                                            <Text style={GlobalStyles.txtR14Grey} >{` (Qty: ${item.quantity})`}</Text></Text>
                                        <TouchableOpacity onPress={() => {
                                            const data = [...selectedAssetRequestData]
                                            data.splice(index, 1);
                                            setSelectedAssetRequestData(data)
                                        }}>
                                            <CommonSvg.DeleteSmallSvg />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                        />

                    </View>

                }

                <CustomThemeButton
                    title='Assign'
                    containerStyle={{ width: SIZES.cardWidth, marginTop: mvs(30), marginBottom: mvs(70) }}
                    onPress={handleAssign}
                />


            </CustomInnerContainer>

            <CommonCalendar
                value={possessionDate}
                isVisible={dateVisible}
                displayDate={displayDate}
                onCancel={(visible) => {
                    setDateVisible(visible)
                }}
                onConfirm={(date) => {
                    setPossessionDate(date);
                    setDateVisible(false);
                    setDisplayDate(date)
                }}
            />

        </CustomContainer>

    )
}

export default AssignProperty