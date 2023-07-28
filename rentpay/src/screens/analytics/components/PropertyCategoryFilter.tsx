import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { styles } from '../styles'
import { GlobalStyles } from '../../../styles/GlobaStyles'
import { COLORS, SIZES } from '../../../styles/theme'
import { ms, mvs } from 'react-native-size-matters'
import Icons from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import { CategoriesGetAllById, GetRoomsListByPropertyIds, PropertiesGetAllById } from '../../../services/config/apiMethods/CommonApis'

type Props = {
    propertyIds?: any[],
    unitIds?: any[],
    expenseCategoryIds?: any[],
    visibleFunction: (visible: boolean) => void,
    applyFilter?: (pids: any[], uIds: any[],exIds:any[]) => void
}

const FILTER_BTN = {
    PROPERTY: 'PROPERTY',
    CATEGORY: 'CATEGORY'
}


const PropertyCategoryFilter =({ propertyIds, unitIds ,visibleFunction, applyFilter ,expenseCategoryIds}: Props) => {

  const [selectedFilter, setSelectedFilter] = useState(FILTER_BTN.PROPERTY);
  const [propertyData, setPropertyData] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<any>([])
  const [tenantData, setTenantData] = useState<any>([]);
  const [unitsData, setUnitsData] = useState<any>([])
  const { USER_ID } = useSelector((state: any) => state.user);

  const [selectedPropertyIds, setSelectedPropertyIds] = useState<any>(propertyIds)
  const [tenantIds, setTenantIds] = useState<any>([])
  const [selectedUnitIds, setSelectedUnitIds] = useState<any>(unitIds);
  const [selectedExpenseCategoryIds, setSelectedExpenseCategoryIds] = useState<any>(expenseCategoryIds);

  useEffect(() => {

      PropertiesGetAllById(USER_ID)
          .then(response => {
              setPropertyData(response);
      })

  }, [])


  const handleSelectCategories = (btn: any) => {

     CategoriesGetAllById(USER_ID).then(response => {
      setCategoryData(response)
     })

      setSelectedFilter(btn)
  }
  // const handleSelectUnit = (btn: any) => {

  //     GetRoomsListByPropertyIds(selectedPropertyIds).then(response=>{
  //         // console.log("Rooms by Property Id===>",response);
  //         setUnitsData(response);
  //     })

  //     setSelectedFilter(btn)
  // }


  const handleClearFilter = (btn: any) => {
      visibleFunction(false);
      applyFilter([], [],[])
  }

  const handleApplyFilter = (btn: any) => {

      visibleFunction(false);
      applyFilter(selectedPropertyIds, selectedUnitIds,selectedExpenseCategoryIds)
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

  const checkIsSelectedCategories = useCallback((item: any) => {

      const i = selectedExpenseCategoryIds.findIndex(i => i == item.id);
      return i > -1;
  }, [selectedExpenseCategoryIds]);

  const handleSelectedCategories = (item: any, index: number) => {
      const i = selectedExpenseCategoryIds.findIndex(i => i == item.id);
      const data: any[] = [...selectedExpenseCategoryIds];
      console.log(i)
      if (i > -1) {

          data.splice(i, 1);

      } else {
          data.push(item?.id)

      }
    
      setSelectedExpenseCategoryIds(data)
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
                  <TouchableOpacity style={styles.propertyLableContainer} onPress={() => handleSelectCategories(FILTER_BTN.CATEGORY)} >
                      <Text style={selectedFilter == FILTER_BTN.CATEGORY ? GlobalStyles.txtR16THEME : GlobalStyles.txtR16Grey} >Categories</Text>
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
                      selectedFilter == FILTER_BTN.CATEGORY &&
                      <FlatList
                          data={categoryData}
                          keyExtractor={(item) => `category-${item.id}`}
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={{ paddingLeft: ms(10) }}
                          renderItem={({ item, index }) => {
                              return (
                                  <TouchableOpacity onPress={() => handleSelectedCategories(item, index)}
                                      style={styles.properyFlatrow} >
                                      <View style={{
                                          ...styles.tickView,
                                          backgroundColor: checkIsSelectedCategories(item) ? COLORS.theme : COLORS.white,
                                          borderColor: checkIsSelectedCategories(item) ? COLORS.theme : COLORS.greyTxt,
                                      }} >
                                          <Icons name='check' size={20} color={COLORS.white} />
                                      </View>
                                      <Text style={{ ...GlobalStyles.txtR12Grey, width: '90%', color: checkIsSelectedCategories(item) ? COLORS.theme : COLORS.greyTxt }} 
                                          numberOfLines={1} >{item?.name}</Text>
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

export default PropertyCategoryFilter