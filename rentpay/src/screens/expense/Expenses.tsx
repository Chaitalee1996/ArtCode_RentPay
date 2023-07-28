import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader, CustomStatusBar } from '../../components/custom'
import { GlobalStyles } from '../../styles/GlobaStyles'
import CommonSvg from '../../components/svg/CommonSvg'
import { ms, mvs } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { ExpenseGetByPropertyIdAndUserId, PropertiesGetAllById } from '../../services/config/apiMethods/CommonApis'
import SelectDropdown from 'react-native-select-dropdown'
import { COLORS } from '../../styles/theme'
import { styles } from './styles'
import moment from 'moment'
import screenNames from '../../constants/screenNames'
import { Swipeable } from 'react-native-gesture-handler'

type Props = {}

const btn = {
  All: 'All',
  CATEGORY: 'Category',
}

const Expenses = (props: Props) => {

  const swipeRef = useRef<Swipeable>();
  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const [propertiesData, setPropertiesData] = useState<any>([]);
  const [selectedBtn, setSelectedBtn] = useState(btn.All)
  const [expenseData, setExpenseData] = useState<any>([]);

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

    ExpenseGetByPropertyIdAndUserId(USER_ID, 0).then(response => {
      console.log("ExpenseData==>", JSON.stringify(response));
      setExpenseData(response);
    })

  }

  const handleSelectedProperty = (selectedItem: any) => {
    ExpenseGetByPropertyIdAndUserId(USER_ID, selectedItem.id).then(response => {
      console.log("Property==>", JSON.stringify(response));
      setExpenseData(response);
    })
  }

  const handleSelectedBtn = (selectedBtn: string) => {
    setSelectedBtn(selectedBtn);
  }

  const renderSwipeDelete = () => {
    return (
      <View style={styles.deleteContainer} >
        <TouchableOpacity onPress={() => {
          //  swipeRef.current?.close()

          swipeRef.current?.close()
        }}
          style={{ width: ms(100), alignItems: 'center', justifyContent: 'center', }} >
          <CommonSvg.DeleteSvg />
        </TouchableOpacity>
      </View>
    )
  }

  const TabButtons = () => {
    return (
      <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), marginVertical: mvs(15) }]} >
        <TouchableOpacity onPress={() => handleSelectedBtn(btn.All)}>
          <Text style={{ ...GlobalStyles.txtR16Grey, color: selectedBtn == btn.All ? COLORS.theme : COLORS.greyTxt }} >All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectedBtn(btn.CATEGORY)}>
          <Text style={{ ...GlobalStyles.txtR16Grey, color: selectedBtn == btn.CATEGORY ? COLORS.theme : COLORS.greyTxt }} >Category Wise</Text>
        </TouchableOpacity>
        <View>
          <Text style={GlobalStyles.txtM16THEME} >₹{expenseData?.yearlyTotal}</Text>
          <Text style={{ ...GlobalStyles.txtR10Grey, textAlign: 'right' }} >This Year</Text>
        </View>
      </View>
    )
  }

  const AllBtnComponent = () => {
    return (
      <FlatList
        data={expenseData?.list || []}
        bounces={false}
        keyExtractor={(item) => `-${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: mvs(100) }}
        renderItem={({ item, index }) => {
          return (

            <View style={[styles.expenseFlatTitle, { marginBottom: mvs(10) }]} >
              <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingLeft: ms(20) }]}>
                <View>
                  <Text style={GlobalStyles.txtM14Grey} >{item.name}</Text>
                </View>
                <View style={styles.flatLine} />
              </View>

              {
                item.subList.map((data: any, ind) => {
                  return (
                    <Swipeable
                      key={`${data.id}`}
                      ref={swipeRef}
                      renderRightActions={renderSwipeDelete}
                      onSwipeableOpen={() => {
                        // console.log('item.stockId==>', item.stockId)
                        console.log("Swipe===>", data.id)
                      }} >
                      <CustomCardContainer containerStyle={{}}>
                        <View style={GlobalStyles.rowCenterSpaceBetween}>
                          <Text style={GlobalStyles.txtM14DG} >{data.name}</Text>
                          <Text style={GlobalStyles.txtM16THEME} >{data.amount}</Text>
                        </View>


                        <Text style={GlobalStyles.txtR12DG} >{data.expenseCategoryName}</Text>

                        <View style={GlobalStyles.rowCenterSpaceBetween}>
                          <Text style={GlobalStyles.txtR12DG} >{data.propertyName}</Text>
                          <Text style={GlobalStyles.txtR12DG} >{(data.date)}</Text>
                        </View>

                      </CustomCardContainer>
                    </Swipeable>
                  )
                })
              }
            </View>
          )
        }}
      />
    )
  }
  
  const CategoryBtnComponent = () => {
    return (
      <View>

      </View>
    )
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Expenses'>
        <TouchableOpacity style={GlobalStyles.rowCenter}
          onPress={() => {
            navigation.navigate(screenNames.NEW_EXPENSE);
          }} >

          <CommonSvg.HomeExpensesSvg />
          <View style={{ marginLeft: ms(5) }} >
            <Text style={GlobalStyles.txtM18THEME} >New</Text>
          </View>
        </TouchableOpacity>
      </CustomHeader>

      <SelectDropdown
        dropdownStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: COLORS.white }}
        rowTextStyle={GlobalStyles.txtR14THEME}
        defaultButtonText={propertiesData[0]?.name}
        data={propertiesData}
        buttonTextStyle={{
          ...GlobalStyles.txtM16THEME,
          color: COLORS.theme,
          textAlign: 'left',
        }}
        buttonStyle={[GlobalStyles.dropDownStyle,]}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {

          return item.name;
        }}
        onSelect={(selectedItem, index) => {
          handleSelectedProperty(selectedItem);
        }}
        renderDropdownIcon={() => (
          <CommonSvg.ArrowDownSvg />
        )}
      />

      <TabButtons />

      {
        selectedBtn == btn.All ?
          <AllBtnComponent />
          :
          <CategoryBtnComponent />
      }
      {/* TODO:categoryWise filter */}




    </CustomContainer>
  )
}

export default Expenses