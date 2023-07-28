import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { styles } from '../styles'
import { GlobalStyles } from '../../../styles/GlobaStyles'
import { COLORS, SIZES } from '../../../styles/theme'
import { ms, mvs } from 'react-native-size-matters'
import Icons from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import { GetRoomsListByPropertyIds, PropertiesGetAllById } from '../../../services/config/apiMethods/CommonApis'

type Props = {
    propertyIds?: any[],
    unitIds?: any[],
    visibleFunction: (visible: boolean) => void,
    applyFilter?: (pids: any[], uIds: any[]) => void
}

const FILTER_BTN = {
    PROPERTY: 'PROPERTY',
    UNITS: 'UNITS'
}

const PropertyUnitFilter = ({ propertyIds, unitIds ,visibleFunction, applyFilter }: Props) => {

    const [selectedFilter, setSelectedFilter] = useState(FILTER_BTN.PROPERTY);
    const [propertyData, setPropertyData] = useState<any>([]);
    const [tenantData, setTenantData] = useState<any>([]);
    const [unitsData, setUnitsData] = useState<any>([])
    const { USER_ID } = useSelector((state: any) => state.user);

    const [selectedPropertyIds, setSelectedPropertyIds] = useState<any>(propertyIds)
    const [tenantIds, setTenantIds] = useState<any>([])
    const [selectedUnitIds, setSelectedUnitIds] = useState<any>(unitIds)

    useEffect(() => {

        PropertiesGetAllById(USER_ID)
            .then(response => {
                setPropertyData(response);
        })

    }, [])






    const handleSelectUnit = (btn: any) => {

        GetRoomsListByPropertyIds(selectedPropertyIds).then(response=>{
            // console.log("Rooms by Property Id===>",response);
            setUnitsData(response);
        })

        setSelectedFilter(btn)
    }


    const handleClearFilter = (btn: any) => {
        visibleFunction(false);
        applyFilter([], [])
    }

    const handleApplyFilter = (btn: any) => {

        visibleFunction(false);
        applyFilter(selectedPropertyIds, selectedUnitIds)
    }



    const checkIsSelectedProperty = useCallback((item: any) => {

        const i = selectedPropertyIds.findIndex(i => i == item.id);
        return i > -1;
    }, [selectedPropertyIds]);

    const handleSelectedProperty = (item: any, index: number) => {
        const i = selectedPropertyIds.findIndex(i => i == item.id);
        const data: any[] = [...selectedPropertyIds];
        console.log(i)
        if (i > -1) {

            data.splice(i, 1);

        } else {
            data.push(item?.id)

        }
     
        setSelectedPropertyIds(data)
    }

    const checkIsSelectedUnits = useCallback((item: any) => {

        const i = selectedUnitIds.findIndex(i => i == item.id);
        return i > -1;
    }, [selectedUnitIds]);

    const handleSelectedUnits = (item: any, index: number) => {
        const i = selectedUnitIds.findIndex(i => i == item.id);
        const data: any[] = [...selectedUnitIds];
        console.log(i)
        if (i > -1) {

            data.splice(i, 1);

        } else {
            data.push(item?.id)

        }
      
        setSelectedUnitIds(data)
    }

    return (
        <View style={styles.filterContainer} >

            <View style={[GlobalStyles.rowCenter, { width: SIZES.width, height: '100%', }]} >

                <View style={styles.propertyLabelView} >
                    <TouchableOpacity style={styles.propertyLableContainer} onPress={() => {
                        setSelectedFilter(FILTER_BTN.PROPERTY)
                    }}  >
                        <Text style={selectedFilter == FILTER_BTN.PROPERTY ? GlobalStyles.txtR16THEME : GlobalStyles.txtR16Grey} >Properties</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.propertyLableContainer} onPress={() => handleSelectUnit(FILTER_BTN.UNITS)} >
                        <Text style={selectedFilter == FILTER_BTN.UNITS ? GlobalStyles.txtR16THEME : GlobalStyles.txtR16Grey} >Units</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.propertyListView} >
                    {
                        selectedFilter == FILTER_BTN.PROPERTY &&
                        <FlatList
                            data={propertyData}
                            keyExtractor={(item) => `properties-${item.id}`}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: ms(10) }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => handleSelectedProperty(item, index)}
                                        style={styles.properyFlatrow} >
                                        <View style={{
                                            ...styles.tickView,
                                            backgroundColor: checkIsSelectedProperty(item) ? COLORS.theme : COLORS.white,
                                            borderColor: checkIsSelectedProperty(item) ? COLORS.theme : COLORS.greyTxt,
                                        }} >
                                            <Icons name='check' size={20} color={COLORS.white} />
                                        </View>
                                        <Text style={{ ...GlobalStyles.txtR12Grey, width: '90%', color: checkIsSelectedProperty(item) ? COLORS.theme : COLORS.greyTxt }} numberOfLines={1} >{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    }

                    {
                        selectedFilter == FILTER_BTN.UNITS &&
                        <FlatList
                            data={unitsData}
                            keyExtractor={(item) => `units-${item.id}`}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: ms(10) }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => handleSelectedUnits(item, index)}
                                        style={styles.properyFlatrow} >
                                        <View style={{
                                            ...styles.tickView,
                                            backgroundColor: checkIsSelectedUnits(item) ? COLORS.theme : COLORS.white,
                                            borderColor: checkIsSelectedUnits(item) ? COLORS.theme : COLORS.greyTxt,
                                        }} >
                                            <Icons name='check' size={20} color={COLORS.white} />
                                        </View>
                                        <Text style={{ ...GlobalStyles.txtR12Grey, width: '90%', color: checkIsSelectedUnits(item) ? COLORS.theme : COLORS.greyTxt }} 
                                            numberOfLines={1} >{item?.propertyName} {item?.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    }
                </View>

            </View>

            <View style={styles.applyBottomView} >
                <TouchableOpacity style={styles.clearBtn} onPress={handleClearFilter} >
                    <Text style={GlobalStyles.txtR14THEME} >Clear Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} onPress={handleApplyFilter}>
                    <Text style={GlobalStyles.txtR14White} >Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PropertyUnitFilter