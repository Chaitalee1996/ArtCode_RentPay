import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomContainer, CustomHeader, CustomInnerContainer, CustomStatusBar, CustomTextInput, CustomThemeButton } from '../../components/custom'
import { CommonBottomTab } from '../../components/uiCommon'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import SelectDropdown from 'react-native-select-dropdown'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { useNavigation } from '@react-navigation/native'
import { CategoriesGetAllById, PropertiesGetAllById } from '../../services/config/apiMethods/CommonApis'
import { COLORS, SIZES } from '../../styles/theme'
import CommonSvg from '../../components/svg/CommonSvg'
import { ms, mvs } from 'react-native-size-matters'
import moment from 'moment'
import CommonCalendar from '../../components/uiCommon/CommonCalendar'
import { POSTMethod } from '../../services/config/apiMethods/CommonMethods'
import { showError, showSuccess } from '../../components/uiCommon/FlashToast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ManageCategoryModal from './components/ManageCategoryModal'

type Props = {}

const NewExpense = (props: Props) => {

  const { USER_ID } = useSelector((state: any) => state.user);
  const navigation = useNavigation<any>();

  const [dateVisible, setDateVisible] = useState(false);
  const [categoryModalVisible, setcategoryModalVisible] = useState(false);
  const [displayDate, setDisplayDate] = useState(new Date())

  const [propertiesData, setPropertiesData] = useState<any>([]);
  const [categoryData, setCategoryData] = useState([]);

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(null);
  const [expenseCategoryId, setExpenseCategoryId] = useState(0);
  const [name, setName] = useState('');
  const [propertyId, setPropertyId] = useState(0);

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

        setPropertiesData(response);
      })

    CategoriesGetAllById(USER_ID)
      .then(response => {

        setCategoryData(response);
      })


  }


  const handleCreate = () => {

    if (amount == '' || date == null || expenseCategoryId == 0 || name == "" || propertyId == 0) {
      showError("Please enter required fields!")
    } else {



      const request = {
        "amount": amount,
        "date": date,
        "expenseCategoryId": expenseCategoryId,
        "name": name,
        "propertyId": propertyId,
        "usersId": USER_ID
      }

      console.log(request);

      POSTMethod('/expense', request).then(response => {
        if (response.success) {
          navigation.goBack();
          showSuccess(response.message)
        } else {
          showError(response.message)
        }
      });

    }

  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Expenses' />
     


      <CustomInnerContainer>



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
              console.log(selectedItem)
              setPropertyId(selectedItem.id)
            }}
            renderDropdownIcon={() => (
              <CommonSvg.ArrowDownSvg />
            )}
          />
        </View>

        {/* SELECT CATEGORY */}
        <View style={{ marginTop: mvs(10) }} >
          <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), marginBottom: mvs(2) }]} >
            <Text style={GlobalStyles.txtR12Grey} >Select Category *</Text>
            <TouchableOpacity onPress={() => setcategoryModalVisible(true)}>
              <Text style={GlobalStyles.txtR14THEME} >Manage Category</Text>
            </TouchableOpacity>
          </View>

          <SelectDropdown
            dropdownStyle={{
              borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
              backgroundColor: COLORS.white
            }}
            rowTextStyle={GlobalStyles.txtR14THEME}
            defaultButtonText={'Select Category'}
            data={categoryData}
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
              console.log(selectedItem)
              setExpenseCategoryId(selectedItem.id)
            }}
            renderDropdownIcon={() => (
              <CommonSvg.ArrowDownSvg />
            )}
          />
        </View>

        {/* EXPENSE ENTER */}
        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Expense *</Text>
          </View>

          <CustomTextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={'Tanker/Elictricity/Bill/Salary'}

          />
        </View>

        {/* AMOUNT ENTER */}
        <View style={{ marginTop: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Amount *</Text>
          </View>

          <CustomTextInput
            value={amount}
            onChangeText={(text) => setAmount(text)}
            placeholder={'Enter amount'}
            keboardType={'number-pad'}
          />
        </View>

        {/* EXPENSE DATE */}
        <View style={{ marginVertical: mvs(10) }}>
          <View style={{ marginLeft: ms(20), marginBottom: mvs(2), }} >
            <Text style={GlobalStyles.txtR12Grey} >Expense Date *</Text>
          </View>

          <TouchableOpacity onPress={() => setDateVisible(true)} activeOpacity={0.8}
            style={[GlobalStyles.inputStyle, GlobalStyles.rowCenterSpaceBetween]} >

            <Text style={GlobalStyles.txtM16THEME} >{date == null ? 'Select Date' : date}</Text>
            <CommonSvg.CalendarSvg />
          </TouchableOpacity>



        </View>

        <CustomThemeButton
          title='Create'
          containerStyle={{ width: SIZES.cardWidth }}
          onPress={handleCreate}
        />

      </CustomInnerContainer>

      <CommonCalendar
        value={date}
        isVisible={dateVisible}
        displayDate={displayDate}
        onCancel={(visible) => {
          setDateVisible(visible)
        }}
        onConfirm={(date) => {
          setDate(moment(date).format('DD-MM-YYYY'));
          setDateVisible(false);
          setDisplayDate(date)
          console.log(date)
        }}
      />

      {
        categoryModalVisible &&

        <ManageCategoryModal
          visible={categoryModalVisible}
          visibleFunction={(visible) => {
            getData()
            setcategoryModalVisible(visible)
          }}
        // categoryData={categoryData}
        />
      }

      <CommonBottomTab />
    </CustomContainer>
  )
}

export default NewExpense
