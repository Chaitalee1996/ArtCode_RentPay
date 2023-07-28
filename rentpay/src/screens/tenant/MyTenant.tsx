import { View, Text, TouchableOpacity, TextInput, Keyboard, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { __refreshingChange } from '../../services/redux/loadingSlice';
import { TenantsGetAllByUserId } from '../../services/config/apiMethods/CommonApis';
import { CustomContainer, CustomHeader, CustomImageView, CustomStatusBar } from '../../components/custom';
import { CommonBottomTab } from '../../components/uiCommon';
import { GlobalStyles } from '../../styles/GlobaStyles';
import CommonSvg from '../../components/svg/CommonSvg';
import { ms, mvs } from 'react-native-size-matters';
import { DASHES, RS } from '../../constants/enums';
import { styles } from './styles';
import { COLORS } from '../../styles/theme';
import screenNames from '../../constants/screenNames';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';

type Props = {}

const MyTenant = (props: Props) => {

  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const { REFRESHING } = useSelector((state: any) => state.loading);
  const [tenantData, setTenantData] = useState<any>([]);
  const [tenantDataCopy, setTenantDataCopy] = useState<any>([])
  const [search, setSearch] = useState('');

  const [menuVisible, setMenuVisible] = useState(false)

  const [searchVisible, setSearchVisible] = useReducer(s => !s, false);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])


  const getData = () => {

    TenantsGetAllByUserId(USER_ID)
      .then(response => {
        const data = [{ id: 0, name: 'Add Tenant' }, ...response]
        console.log("Tenants==>", data)
        console.log("Tenants==>", data[1])
        setTenantData(data);
        setTenantDataCopy(data);
      })
  }

  const handleMenu = (visible: boolean) => setMenuVisible(visible);

  const sortByPropery = () => {
    const data = [...tenantData];

    data.sort(function (a, b) {
      if (a.propertyName && b.propertyName) {
        if (a?.propertyName.toLowerCase() < b?.propertyName.toLowerCase()) {
          return -1;
        }
        if (a?.propertyName.toLowerCase() > b?.propertyName.toLowerCase()) {
          return 1;
        }
        return 0;
      } else {
        return 0;
      }

    });

    setTenantData(data)
    setTenantDataCopy(data)
    handleMenu(false)
  }

  const sortByName = () => {

    const data = [...tenantData];

    data.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    setTenantData(data)
    setTenantDataCopy(data)

    handleMenu(false)
  }

  const handleSearch = (txt: string) => {

    setSearch(txt);

    let text = txt.toLowerCase();
    let states = tenantData;
    let filteredName = states.filter((item) => {
      if (item.id == 0) {
        return item.name;
      } else {
        return item.name.toLowerCase().match(text) || item?.mobileNo.toLowerCase().match(text)
      }

    })
    if (!text || text === '') {
      
      setTenantData(tenantDataCopy)
    } else if (Array.isArray(filteredName)) {
      // const data = [{ id: 0, name: 'Add Tenant' }, ...filteredName]
      setTenantData(filteredName)
    }



  };

  const onRefresh = () => {

    dispatch(__refreshingChange(true))
    getData();
    dispatch(__refreshingChange(false))

  }


  const headerComponent = () => {
    return (
      <View style={[GlobalStyles.headerContainer,]} >

        {
          searchVisible ?
            <View style={[GlobalStyles.rowCenter, , { paddingHorizontal: ms(15), width: '100%' }]} >
              <View style={[styles.searchContainer, GlobalStyles.rowCenterSpaceBetween]} >

                <TextInput
                  value={search}
                  style={[search == "" ? GlobalStyles.txtR10Grey : GlobalStyles.txtM12THEME, { paddingVertical: 0, width: '75%' }]}
                  onChangeText={(txt) => handleSearch(txt)}
                  autoCapitalize='none'
                  placeholderTextColor={COLORS.greyTxt}
                  placeholder='Search by name/mobile number'
                  onSubmitEditing={Keyboard.dismiss}
                  keyboardType='default'
                />
                <TouchableOpacity onPress={setSearchVisible}>
                  <CommonSvg.SearchSvg />
                </TouchableOpacity>
              </View>
              <Menu
                visible={menuVisible}
                anchor={
                  <TouchableOpacity onPress={() => handleMenu(true)} style={{ marginLeft: ms(20) }} >
                    <CommonSvg.FilterSvg />
                  </TouchableOpacity>
                }
                style={{ marginTop: mvs(30) }}
                onRequestClose={() => { handleMenu(false) }}>

                <MenuItem onPress={sortByPropery} style={GlobalStyles.menuContainer}>
                  <Text style={{ ...GlobalStyles.txtR12Grey }} >Sort By Property</Text>
                </MenuItem>

                <MenuDivider color={COLORS.greyTxt} />

                <MenuItem onPress={sortByName} style={GlobalStyles.menuContainer}>
                  <Text style={GlobalStyles.txtR12Grey} >Sort By Name</Text>
                </MenuItem>

              </Menu>
            </View>
            :
            <View style={[GlobalStyles.rowCenter, { paddingHorizontal: ms(15), width: '100%' }]} >
              <View style={[styles.textContainer, GlobalStyles.rowCenterSpaceBetween]} >
                <Text style={{ ...GlobalStyles.txtR24DG, width: '75%' }} >My Tenants</Text>
                <TouchableOpacity onPress={setSearchVisible}>
                  <CommonSvg.SearchSvg />
                </TouchableOpacity>
              </View>

              <Menu
                visible={menuVisible}
                anchor={
                  <TouchableOpacity onPress={() => handleMenu(true)} style={{ marginLeft: ms(20) }} >
                    <CommonSvg.FilterSvg />
                  </TouchableOpacity>
                }
                style={{ marginTop: mvs(30) }}
                onRequestClose={() => { handleMenu(false) }}>

                <MenuItem onPress={sortByPropery} style={GlobalStyles.menuContainer}>
                  <Text style={{ ...GlobalStyles.txtR12Grey }} >Sort By Property</Text>
                </MenuItem>

                <MenuDivider color={COLORS.greyTxt} />

                <MenuItem onPress={sortByName} style={GlobalStyles.menuContainer}>
                  <Text style={GlobalStyles.txtR12Grey} >Sort By Name</Text>
                </MenuItem>

              </Menu>

            </View>
        }
        <View style={GlobalStyles.dottedLineContainer} >
          <Text style={{ ...GlobalStyles.txtM16Grey, }} numberOfLines={1} adjustsFontSizeToFit>{DASHES}</Text>
        </View>
      </View>
    )
  }


  const TenantListComponent = () => {

    return (
      <FlatList
        data={tenantData}
        // bounces={false}
        keyExtractor={(item) => `tenants-${item.id}`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
          refreshing={REFRESHING}
          onRefresh={onRefresh}
          tintColor={COLORS.theme}
          colors={[COLORS.theme]}
          />
        }
        contentContainerStyle={{ marginTop: mvs(10), paddingBottom: mvs(70) }}
        numColumns={2}
        renderItem={({ item, index }) => {

          if (index == 0) {
            return (
              <TouchableOpacity style={styles.addNewTenantContainer}
                onPress={() => navigation.navigate(screenNames.NEW_TENANT)} >
                <View style={styles.plusView} >
                  <Text style={{ ...GlobalStyles.txtM24THEME, fontSize: ms(30) }} >+</Text>
                </View>
                <View style={{ marginTop: mvs(10) }} >
                  <Text style={GlobalStyles.txtM14Grey} >Add New Tenant</Text>
                </View>
              </TouchableOpacity>
            )
          } else {
            return (
              <TouchableOpacity onPress={() => navigation.navigate(screenNames.TENANT_INFO, { tenantId: item.tenantId })}
                style={styles.tenantContainer} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <CustomImageView imageUrl={item.profilePic} />
                  <View style={{ marginLeft: ms(10) }} >
                    <Text style={GlobalStyles.txtR14Grey} >{item.name.split(" ")[0]}</Text>
                    <Text style={{ ...GlobalStyles.txtR12Grey, marginTop: mvs(5) }} >{item.roomName}</Text>
                  </View>
                </View>
                <View style={{ marginTop: mvs(8), marginBottom: mvs(4) }} >
                  {
                    item.propertyName ?
                      <Text style={GlobalStyles.txtR12Grey} >{item.propertyName}</Text>
                      :
                      <Text style={GlobalStyles.txtR12Grey} >Property Not Assigned</Text>
                  }

                </View>
                <View style={[GlobalStyles.rowCenterSpaceBetween, { width: '100%' }]} >
                  <View>
                    <Text style={GlobalStyles.txtR12Grey}>Rent : {item.rentAmount == null ? "-" : `${RS}${item.rentAmount}`}</Text>
                  </View>
                  <View>
                    <Text style={GlobalStyles.txtR12Grey}>Due on : {item.rentDate == null ? "-" : `${item.rentDate}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }

        }}
      />
    )
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}

      {headerComponent()}


      <TenantListComponent />

      <CommonBottomTab />


    </CustomContainer>
  )
}

export default MyTenant