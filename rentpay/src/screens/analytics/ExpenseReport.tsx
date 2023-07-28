import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader, CustomStatusBar } from '../../components/custom'
import { FilterButton, ListHeader, NoReportDataComponent, PropertyCategoryFilter, PropertyUnitFilter, TotalAndExportComponent } from './components'
import { CommonBottomTab } from '../../components/uiCommon'
import { POSTMethod } from '../../services/config/apiMethods/CommonMethods'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { COLORS } from '../../styles/theme'
import { ms, mvs } from 'react-native-size-matters'
import moment from 'moment'
import CommonSvg from '../../components/svg/CommonSvg'
import CommonCalendar from '../../components/uiCommon/CommonCalendar'


type Props = {}

const ExpenseReport = (props: Props) => {

  const [expenseData, setExpenseData] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState('')
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [displayFromDate, setDisplayFromDate] = useState(new Date());
  const [displayToDate, setDisplayToDate] = useState(new Date());

  const [fromDateVisble, setFromDateVisble] = useState(false)
  const [toDateVisble, setToDateVisble] = useState(false)

  const [filterVisible, setFilterVisible] = useState(false);

  const [selectedPropertyIds, setSelectedPropertyIds] = useState<any>([])
  const [tenantIds, setTenantIds] = useState<any>([])
  const [unitIds, setUnitIds] = useState<any>([])
  const [selectedExpenseCategoryIds, setSelectedExpenseCategoryIds] = useState<any>([])

  const { USER_ID } = useSelector((state: any) => state.user);

  const handleReport = (start: any, end: any, pids?: any, uids?: any,exIds?:any) => {

    const request = {
      "endDate": `${end}`,
      "expenseCategoryIds": selectedExpenseCategoryIds,
      "paidStatus": "",
      "propertyIds": pids,
      "roomIds": uids,
      "startDate": `${start}`,
      "tenantId": 0,
      "tenantIds": [],
      "usersId": USER_ID
    }
    // console.log("request===>", request)

    POSTMethod('/report/expense', request).then(response => {
      setTotalAmount(response.data["Total Amount"]);
      setExpenseData(response.data["User Expense List"])
      console.log(JSON.stringify(response.data["User Expense List"]));
    })

  }

  const handleFromDateConfirm = (date: any) => {

    setFromDate(moment(date).format('DD-MM-YYYY'));
    setFromDateVisble(false);
    setDisplayFromDate(date)
    if(toDate){
      handleReport(moment(date).format('DD-MM-YYYY'),toDate,selectedPropertyIds,unitIds,selectedExpenseCategoryIds)
    }
  }

  const handleToDateConfirm = (date: any) => {
    setToDate(moment(date).format('DD-MM-YYYY'));
    setToDateVisble(false);
    setDisplayToDate(date)
    handleReport(fromDate,moment(date).format('DD-MM-YYYY'),selectedPropertyIds,unitIds,selectedExpenseCategoryIds)
  }

  const FromToDateComponent = () => {
    return (
      <CustomCardContainer containerStyle={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(30), paddingVertical: mvs(12), height: mvs(50) }]}>
        <TouchableOpacity onPress={() => setFromDateVisble(true)}>
          {
            fromDate ?
              <Text style={GlobalStyles.txtSB14THEME} >{moment(displayFromDate).format("DD MMM YYYY")}</Text>
              :
              <View style={GlobalStyles.rowCenter}>
                <Text style={GlobalStyles.txtR14DG} >From</Text>
                <View style={{ marginLeft: ms(20) }} >
                  <CommonSvg.CalendarSvg />
                </View>
              </View>
          }

        </TouchableOpacity>

        <View style={styles.dateLine} />

        <TouchableOpacity onPress={() => setToDateVisble(true)} >
          {
            toDate ?
              <Text style={GlobalStyles.txtSB14THEME} >{moment(displayToDate).format("DD MMM YYYY")}</Text>
              :
              <View style={GlobalStyles.rowCenter}>
                <View style={{ marginRight: ms(20) }} >
                  <CommonSvg.CalendarSvg />
                </View>
                <Text style={GlobalStyles.txtR14DG} >To</Text>
              </View>
          }

        </TouchableOpacity>
      </CustomCardContainer>
    )
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Expense Report' />

      {
        filterVisible
          ?
          <PropertyCategoryFilter
            propertyIds={selectedPropertyIds}
            unitIds={unitIds}
            visibleFunction={(visible) => {
              setFilterVisible(false)
            }}
            expenseCategoryIds={selectedExpenseCategoryIds}
            applyFilter={(pids: any[], uIds: any[],exIds:any[]) => {
              console.log("selected PropertyIds: " + pids)
              console.log("selected uids: " + uIds)
              setSelectedPropertyIds(pids)
              setUnitIds(uIds);
              handleReport(fromDate, toDate, pids, uIds,exIds)
            }}
          />
          :
          <View style={{ flex: 1 }} >

            <FromToDateComponent />

            {
              expenseData.length > 0
                ?
                <>
                  <TotalAndExportComponent
                    label={'Total Expenses'}
                    amount={totalAmount}
                    exportOnPress={() => {

                    }}
                  />

                  <ListHeader
                    data={["EXPENSES", "PROPERTY", "DATE", "COLLECTION"]}
                  />

                  <FlatList
                    data={expenseData}
                    keyExtractor={(item) => `expenses-${item.id}`}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{ paddingBottom: mvs(140) }}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={[GlobalStyles.rowCenter, styles.listRowContainer,
                        { backgroundColor: index % 2 == 1 ? COLORS.lightWhite : COLORS.white }]} >
                          <View style={{ ...styles.cellContainer, }} >
                            <Text style={{ ...GlobalStyles.txtR10DG, width: '98%' }}
                              numberOfLines={2} >{item.name}</Text>
                          </View>
                          <View style={styles.cellContainer} >
                            <Text style={{ ...GlobalStyles.txtR10DG, width: '100%' }}
                              numberOfLines={2} >{item?.propertyName}</Text>
                          </View>
                          <View style={styles.cellContainer} >
                            <Text style={{ ...GlobalStyles.txtR10DG, width: '100%' }}
                              numberOfLines={2} adjustsFontSizeToFit>{item?.date}</Text>
                          </View>
                          <View style={styles.cellContainer} >
                            <Text style={{ ...GlobalStyles.txtR10DG, width: '100%' }}
                              numberOfLines={2} adjustsFontSizeToFit>{item?.amount}</Text>
                          </View>
                        </View>
                      )
                    }}
                  />
                </>
                :
                <NoReportDataComponent />
            }

            <FilterButton onPress={() => setFilterVisible(true)} />
          </View>

      }


      <CommonCalendar
        value={fromDate}
        isVisible={fromDateVisble}
        displayDate={displayFromDate}
        onCancel={(visible) => {
          setFromDateVisble(visible)
        }}
        onConfirm={(date) => {
          handleFromDateConfirm(date)
        }}
        maximumDate={new Date()}
      />

      <CommonCalendar
        value={toDate}
        isVisible={toDateVisble}
        displayDate={displayToDate}
        onCancel={(visible) => {
          setToDateVisble(visible)
        }}
        onConfirm={(date) => {
          handleToDateConfirm(date)
        }}
        maximumDate={new Date()}
      />

      <CommonBottomTab />

      </CustomContainer>
  )
}

export default ExpenseReport