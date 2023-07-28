import { View, Text, TouchableOpacity, TextInput, Keyboard, FlatList } from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader, CustomImageView, CustomStatusBar, CustomThemeButton } from '../../components/custom'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { PropertiesGetAllById, TenantsAssignedListGetByUserId, TenantsAvailableListGetByUserId, TenantsGetAllByUserId, TenantsGetByPropertyId } from '../../services/config/apiMethods/CommonApis'
import SelectDropdown from 'react-native-select-dropdown'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { COLORS, SIZES } from '../../styles/theme'
import CommonSvg from '../../components/svg/CommonSvg'
import { ms, mvs } from 'react-native-size-matters'
import { styles } from './styles'
import Icons from 'react-native-vector-icons/Feather'
import { CommonBottomTab } from '../../components/uiCommon'
import { useKeyboardVisible } from '../../components/hooks'
import { POSTMethod } from '../../services/config/apiMethods/CommonMethods'

type Props = {}

const PoliceReport = (props: Props) => {

  const isKeyboard = useKeyboardVisible()
  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const [propertiesData, setPropertiesData] = useState<any>([]);
  const [tenantData, setTenantData] = useState<any>([]);
  const [tenantDataCopy, setTenantDataCopy] = useState<any>([])

  const [selectedTenantIds, setselectedTenantIds] = useState<any>([]);
  const [isAllSelect, setIsAllSelect] = useState(false)

  const [search, setSearch] = useState('');

  const [searchVisible, setSearchVisible] = useReducer(s => !s, false);

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
        const data: any = [{ id: 0, name: 'All Properties' }, ...response]
        // console.log("Properties==>", data)
        setPropertiesData(data);
      })

    TenantsAssignedListGetByUserId(USER_ID).then(response => {

      setTenantData(response);
      setTenantDataCopy(response);

    })
  }

  const getTenantDataByPropertyId = (propertyId: any) => {

    if (propertyId == 0) {
      getData()
    } else {
      TenantsGetByPropertyId(propertyId).then(response => {
        setTenantData(response)
        setTenantDataCopy(response)
      })
    }

  }

  const handleAllSelect = (all: boolean) => {


    setIsAllSelect(all);

    let data: any[] = [...selectedTenantIds];

    if (all) {
      for (var i = 0; i < tenantData.length; i++) {

        const index = data.findIndex(s => s == tenantData[i].id);
        if (index > -1) {
          // data.splice(index, 1);
        } else {
          data.push(tenantData[i].id)
        }
      }
    } else {
      data = []
    }

    setselectedTenantIds(data)

  }

  const checkIsSelectedTenant = (item: any) => {

    const i = selectedTenantIds.findIndex(i => i == item.id);
    return i > -1;
  }


  const handleSelectTenant = (item: any) => {

    const i = selectedTenantIds.findIndex(i => i == item.id);
    const data: any[] = [...selectedTenantIds];
    if (i > -1) {
      data.splice(i, 1);
    } else {
      data.push(item?.id)
    }
    setselectedTenantIds(data)

  };

  const handlePoliceReport = () => {

    const request={
      "tenantId": selectedTenantIds,
      "usersId": USER_ID
    }

    POSTMethod("/police_report/selected-tenant-report",request).then(response=>{
       
    })

  }

  const handleSearch = (txt: string) => {

    setSearch(txt)
    let text = txt.toLowerCase();
    let states = tenantData;
    let filteredName = states.filter((item) => {
      return item.name.toLowerCase().match(text) || item?.mobileNo.toLowerCase().match(text)
    })
    if (!text || text === '') {
      setTenantData(tenantDataCopy)
    } else if (Array.isArray(filteredName)) {
      setTenantData(filteredName)
    }

  }




  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Police Report' >
        {
          isAllSelect ?
            <TouchableOpacity onPress={() => handleAllSelect(false)}
              style={GlobalStyles.rowCenter} >
              <View style={{ ...styles.tickView, alignSelf: 'flex-end', backgroundColor: COLORS.theme, borderColor: COLORS.theme }} >
                <Icons name='check' size={20} color={COLORS.white} />
              </View>
              <Text style={{ ...GlobalStyles.txtR16Grey, color: COLORS.theme }} >Deselect All</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => handleAllSelect(true)} style={GlobalStyles.rowCenter} >
              <View style={{
                ...styles.tickView, alignSelf: 'flex-end',
                backgroundColor: COLORS.white,
                borderColor: COLORS.greyTxt,
              }} >
                <Icons name='check' size={20} color={COLORS.white} />
              </View>
              <Text style={{ ...GlobalStyles.txtR16Grey, color: COLORS.greyTxt }} >Select All</Text>
            </TouchableOpacity>
        }


      </CustomHeader>

      {
        searchVisible ?
          <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), width: SIZES.width, marginBottom: mvs(10) }]} >
            <TextInput
              value={search}
              style={[GlobalStyles.dropDownStyle, search == "" ? GlobalStyles.txtR12Grey : GlobalStyles.txtM12THEME,
              { paddingVertical: 0, width: SIZES.cardWidth - ms(70) }]}
              onChangeText={(txt) => {
                handleSearch(txt)
              }}
              autoCapitalize='none'
              placeholderTextColor={COLORS.greyTxt}
              placeholder='Search by name/mobile number'
              onSubmitEditing={Keyboard.dismiss}
              keyboardType='default'
            />
            <TouchableOpacity style={styles.searchBtn} onPress={setSearchVisible}>
              <CommonSvg.SearchSvg />
            </TouchableOpacity>

          </View>
          :
          <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), width: SIZES.width, marginBottom: mvs(10) }]} >

            <SelectDropdown
              dropdownStyle={GlobalStyles.dropDownStyleRow}
              rowTextStyle={GlobalStyles.txtR14THEME}
              defaultButtonText={propertiesData[0]?.name}
              data={propertiesData}
              buttonTextStyle={{
                ...GlobalStyles.txtM16THEME,
                color: COLORS.theme,
                textAlign: 'left',
              }}
              buttonStyle={[GlobalStyles.dropDownStyle, { width: SIZES.cardWidth - ms(70) }]}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {

                return item.name;
              }}
              onSelect={(selectedItem, index) => {
                getTenantDataByPropertyId(selectedItem.id);
                // handleSelectedProperty(selectedItem);
              }}
              renderDropdownIcon={() => (
                <CommonSvg.ArrowDownSvg />
              )}
            />

            <TouchableOpacity style={styles.searchBtn} onPress={setSearchVisible}>
              <CommonSvg.SearchSvg />
            </TouchableOpacity>

          </View>
      }


      <FlatList
        data={tenantData}
        keyExtractor={(item) => `tenants-${item.id}`}
        showsVerticalScrollIndicator={false}
        // bounces={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ paddingBottom: mvs(170) }}
        renderItem={({ item, index }) => {
          return (
            <CustomCardContainer>
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleSelectTenant(item)}
                style={GlobalStyles.rowCenter} >
                <CustomImageView
                  imageUrl={item.profilePic}
                  imageStyle={{ height: ms(25), width: ms(25) }}
                  containerStyle={{ height: ms(35), width: ms(35) }}
                />

                <View style={{ width: '70%', marginLeft: ms(20) }} >
                  <Text style={GlobalStyles.txtR14DG} numberOfLines={1} adjustsFontSizeToFit>{item.name}</Text>
                </View>

                <View style={{
                  ...styles.tickView,
                  alignSelf: 'flex-end',
                  backgroundColor: checkIsSelectedTenant(item) ? COLORS.theme : COLORS.white,
                  borderColor: checkIsSelectedTenant(item) ? COLORS.theme : COLORS.greyTxt,
                }} >
                  <Icons name='check' size={20} color={COLORS.white} />
                </View>
              </TouchableOpacity>
            </CustomCardContainer>
          )
        }}
      />

      {
        selectedTenantIds.length > 0 && !isKeyboard &&
        <View style={styles.getPoliceReportBottomBtn} >
          <CustomThemeButton
            title='POLICE REPORT'
            containerStyle={{ width: SIZES.cardWidth, }}
            onPress={handlePoliceReport}
          />
        </View>

      }



      <CommonBottomTab />


    </CustomContainer>

  )
}

export default PoliceReport