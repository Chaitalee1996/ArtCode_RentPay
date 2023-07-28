import { View, Text, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { CustomContainer, CustomStatusBar } from '../../components/custom'
import { styles } from './styles'
import { ms, mvs } from 'react-native-size-matters'
import { GlobalStyles } from '../../styles/GlobaStyles'
import CommonSvg from '../../components/svg/CommonSvg'
import { COLORS } from '../../styles/theme'
import { PendingRentTenantListCurrentMonthGetById, TenantListById } from '../../services/config/apiMethods/CommonApis'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { TenantInfoCard } from '../../components/uiCommon'
import { DASHES } from '../../constants/enums'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'

type Props = {}

const Collection = (props: Props) => {

  const [tenantData, setTenantData] = useState([]);
  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);

  const [search, setSearch] = useState('');

  const [menuVisible, setMenuVisible] = useState(false)

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

    PendingRentTenantListCurrentMonthGetById(USER_ID).then(response => {
      setTenantData(response)

    })
  }

  const handleMenu = (visible: boolean) => setMenuVisible(visible);

  const sortByPropery = () => {
    handleMenu(false)
  }

  const sortByName = () => {
    handleMenu(false)
  }

  const sortByDueDate = () => {
    handleMenu(false)
  }


  const SearchComponent = () => {
    return (
      <View style={[styles.searchContainer, GlobalStyles.rowCenterSpaceBetween]} >

        <TextInput
          value={search}
          style={[GlobalStyles.txtM12THEME, { paddingVertical: 0, width: '90%' }]}
          onChangeText={(txt) => setSearch(txt)}
          autoCapitalize='none'
          placeholderTextColor={COLORS.greyTxt}
          placeholder='Search by name/mobile number'
          onSubmitEditing={Keyboard.dismiss}
          keyboardType='default'
        />

        <CommonSvg.SearchSvg />
      </View>
    )
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
                  style={[search == "" ? GlobalStyles.txtR12Grey : GlobalStyles.txtM12THEME,
                  { paddingVertical: 0, width: '75%' }]}
                  onChangeText={(txt) => setSearch(txt)}
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

                <MenuDivider color={COLORS.greyTxt} />

                <MenuItem onPress={sortByDueDate} style={GlobalStyles.menuContainer}>
                  <Text style={GlobalStyles.txtR12Grey} >Sort By Due Date</Text>
                </MenuItem>

              </Menu>
            </View>
            :
            <View style={[GlobalStyles.rowCenter, { paddingHorizontal: ms(15), width: '100%' }]} >
              <View style={[styles.textContainer, GlobalStyles.rowCenterSpaceBetween]} >
                <Text style={{ ...GlobalStyles.txtR24DG, width: '75%' }} >Collection</Text>
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

                <MenuDivider color={COLORS.greyTxt} />

                <MenuItem onPress={sortByDueDate} style={GlobalStyles.menuContainer}>
                  <Text style={GlobalStyles.txtR12Grey} >Sort By Due Date</Text>
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

  return (
    <CustomContainer>
      <CustomStatusBar />
      {/* header */}
      {headerComponent()}
      {/* <View style={[GlobalStyles.headerContainer,]} >
        <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), }]}>
          {SearchComponent()}
          <CommonSvg.FilterSvg />
        </View>
        <View style={GlobalStyles.dottedLineContainer} >
          <Text style={{ ...GlobalStyles.txtM16Grey, }} numberOfLines={1} adjustsFontSizeToFit>{DASHES}</Text>
        </View>
      </View> */}

      {/* COLLECTION LIST  */}

      <TenantInfoCard 
        data={tenantData?.List}
      />


    </CustomContainer>
  )
}

export default Collection