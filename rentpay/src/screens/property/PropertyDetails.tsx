import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader, CustomStatusBar } from '../../components/custom';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import CommonSvg from '../../components/svg/CommonSvg';
import { ms, mvs } from 'react-native-size-matters';
import { GlobalStyles } from '../../styles/GlobaStyles';
import screenNames from '../../constants/screenNames';
import { PropertiesGetAllById, PropertyGetById, RoomListGetByPropertyId, TenantsAvailableListGetByUserId, TenantsGetByPropertyId } from '../../services/config/apiMethods/CommonApis';
import { HandlePhone, } from '../../services/config/helpers/handlePhone';
import { ROOM_STATUS, RS } from '../../constants/enums';
import CommonPhoneDial from '../../components/uiCommon/CommonPhoneDial';
import { COLORS } from '../../styles/theme';
import { CommonBottomTab } from '../../components/uiCommon';
import TenantListModal from './components/TenantListModal';

const PropertyDetails = () => {

    const navigation = useNavigation<any>();
    const { USER_ID } = useSelector((state: any) => state.user);
    const [propertiesData, setPropertiesData] = useState<any>([]);
    const [tenantData, setTenantData] = useState<any>([])
    const [availableTenantData, setAvailableTenantData] = useState([])

    const [tenantListModalVisible, setTenantListModalVisible] = useState(false)

    const PropertyId = useRoute().params.id;

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            getData();
        });

        return () => {
            subscribe;
        };
    }, [])


    const getData = () => {

        PropertyGetById(PropertyId)
            .then(response => {

                setPropertiesData(response);
            })

        RoomListGetByPropertyId(PropertyId).then(response => {

            setTenantData(response);
        })

        TenantsAvailableListGetByUserId(USER_ID).then(response => {
            console.log(response)
            setAvailableTenantData(response)
        })

    }

    const PropertyDetailsComponent = () => {
        return (
            <CustomCardContainer containerStyle={{ paddingHorizontal: ms(0), }}>
                <View>

                    <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20) }]} >
                        <View>
                            <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{propertiesData?.noOfRooms}</Text>
                            <Text style={GlobalStyles.txtR14Grey} >Total</Text>
                            <Text style={GlobalStyles.txtR14Grey} >Units</Text>
                        </View>
                        <View>
                            <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{propertiesData?.occupiedRooms}</Text>
                            <Text style={GlobalStyles.txtR14Grey} >Occupied</Text>
                            <Text style={{ ...GlobalStyles.txtR14Grey, textAlign: 'center' }} >Units</Text>
                        </View>
                        <View>
                            <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{propertiesData?.availableRooms}</Text>
                            <Text style={GlobalStyles.txtR14Grey} >Available</Text>
                            <Text style={{ ...GlobalStyles.txtR14Grey, textAlign: 'center' }} >Units</Text>
                        </View>
                    </View>

                    <View style={GlobalStyles.flatLine} />

                    <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20) }]}>
                        <View>
                            <Text style={GlobalStyles.txtR16DG} >Propery Manager</Text>
                            <Text style={GlobalStyles.txtM14Grey} >{propertiesData?.managerName}</Text>
                        </View>
                        <CommonPhoneDial phone={propertiesData?.managerContactNumber} />

                    </View>


                </View>

            </CustomCardContainer>
        )
    }

    const TenantListComponent = () => {
        return (
            <FlatList
                data={tenantData}
                keyExtractor={(item) => `tenant-${item.id}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: mvs(70) }}
                ListHeaderComponent={<PropertyDetailsComponent />}
                renderItem={({ item, index }) => {
                    return (
                        <CustomCardContainer>
                            <View style={GlobalStyles.rowCenter} >
                                <View >
                                    <Text style={GlobalStyles.txtR16DG} >{item.roomName}</Text>
                                </View>
                                <TouchableOpacity style={{ width: '62%', marginLeft: ms(15), }} onPress={() => {
                                    if (item.roomStatus == ROOM_STATUS.AVAILABLE) {
                                        setTenantListModalVisible(true)
                                    } else {
                                        navigation.navigate(screenNames.ASSIGN_PROPERTY, { id: item.tenantId })
                                    }

                                }} >
                                    <Text style={GlobalStyles.txtR14DG} >{item.roomStatus == ROOM_STATUS.AVAILABLE ? "Available" : item.tenantName}</Text>
                                    <View style={GlobalStyles.rowCenter} >
                                        <Text style={GlobalStyles.txtR12Grey} >Rent:{`${RS}${item.rentAmount}` || "-"}</Text>
                                        <Text style={{ ...GlobalStyles.txtR12Grey, marginLeft: ms(10) }} >Rent On:{item.rentDate || "-"}</Text>
                                    </View>

                                </TouchableOpacity>

                                <CommonPhoneDial phone={item.mobileNo} />

                            </View>
                        </CustomCardContainer>
                    )
                }}
            />
        )
    }

    return (
        <CustomContainer>
            <CustomStatusBar />

            {/* header */}
            <CustomHeader
                title={propertiesData?.name}
                description={propertiesData?.address}
                containerStyle={{ height: mvs(100) }}
            >
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        navigation.navigate(screenNames.EDIT_PROPERTY, { id: PropertyId });
                    }} >

                    <CommonSvg.EditSvg />
                    <View style={{ marginTop: mvs(5) }} >
                        <Text style={GlobalStyles.txtM16THEME} >Edit</Text>
                    </View>
                </TouchableOpacity>
            </CustomHeader>





            <TenantListComponent />


            {
                tenantListModalVisible &&

                <TenantListModal
                    visible={tenantListModalVisible}
                    visibleFunction={(visible)=>{
                        setTenantListModalVisible(visible)
                    }}
                    availableTenants={availableTenantData}
                />

            }


            <CommonBottomTab />

        </CustomContainer>
    )
}

export default PropertyDetails

const styles = StyleSheet.create({})