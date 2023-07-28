import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader, CustomStatusBar } from '../../components/custom'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { RoomsCountGetByUserId, TotalDepositeGetByUserId } from '../../services/config/apiMethods/CommonApis'
import { VictoryPie } from 'victory-native';
import { Donut } from './components'
import { COLORS } from '../../styles/theme'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { ms, mvs } from 'react-native-size-matters'
import { BarChart } from 'react-native-charts-wrapper'
import { styles } from './styles'
import CommonSvg from '../../components/svg/CommonSvg'
import screenNames from '../../constants/screenNames'
import { RS } from '../../constants/enums'
import { CommonBottomTab } from '../../components/uiCommon'

type Props = {}


const chartData = [
  { label: "Venezuela", value: "250" },
  { label: "Saudi", value: "260" },
  { label: "Canada", value: "180" },
  { label: "Iran", value: "140" },
  { label: "Russia", value: "115" },
  { label: "UAE", value: "100" },
  { label: "US", value: "30" },
  { label: "China", value: "30" },
];

const chartConfig = {
  type: "column2D",
  width: "100%",
  height: "400",
  dataFormat: "json",
  dataSource: {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subCaption: "In MMbbl = One Million barrels",
      xAxisName: "Country",
      yAxisName: "Reserves (MMbbl)",
      numberSuffix: "K",
      theme: "fusion",
      exportEnabled: 1 // to enable the export chart functionality
    },
    data: chartData
  }
};


const Analytics = (props: Props) => {

  const { USER_ID } = useSelector((state: any) => state.user);
  const navigation = useNavigation<any>();

  const [roomsCountData, setRoomsCountData] = useState<any>({});
  const [totalDeposite, setTotalDeposite] = useState('')

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();

    });

    return () => {
      subscribe;
    };
  }, [])

  const getData = () => {

    RoomsCountGetByUserId(USER_ID).then(response => {
      setRoomsCountData(response)
    })

    TotalDepositeGetByUserId(USER_ID).then(response => {
      setTotalDeposite(response?.totalDeposite.toFixed(2))
    })
  }

  const RoomCountChart = () => {
    return (
      <CustomCardContainer containerStyle={[GlobalStyles.rowCenterSpaceBetween, { paddingVertical: mvs(5) }]}>

        <Donut
          percentage={roomsCountData.occupiedRooms}
          color={COLORS.theme}
          max={roomsCountData.totalnoOfRooms}
        />

        <View>
          <View style={{ alignItems: 'center' }} >
            <Text style={GlobalStyles.txtM16THEME} >{roomsCountData?.occupiedRooms}</Text>
            <View>
              <Text style={GlobalStyles.txtM12Grey} >Occupied Units</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginVertical: mvs(8) }} >
            <Text style={GlobalStyles.txtM16THEME} >{roomsCountData?.availableRooms}</Text>
            <View>
              <Text style={GlobalStyles.txtM12Grey} >Available Units</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }} >
            <Text style={GlobalStyles.txtM16THEME} >{roomsCountData?.totalnoOfRooms}</Text>
            <View>
              <Text style={GlobalStyles.txtM12Grey} >Total Units</Text>
            </View>
          </View>
        </View>

      </CustomCardContainer>
    )
  }

  const CollectionExpenseChart = () => {
    return (
      <CustomCardContainer containerStyle={{ marginTop: mvs(20) }}>

        {/* <ReactNativeFusionCharts
          chartConfig={chartConfig}
        /> */}

        {/* <BarChart
          data={{
            dataSets: [{  values: [{  y: 10000,marker:'JAN' }],config:{stackLabels:["jan","feb"]} }]
          }}
          xAxis={{position:'BOTTOM',labelCount:4,}}
          yAxis={{left:{position:'OUTSIDE_CHART'},right:undefined}}
          style={{ height: mvs(100) }}
          scaleYEnabled={false}
        /> */}

      </CustomCardContainer>
    )
  }

  const options = [

    {
      id: '3',
      title: 'Collection',
      image: <CommonSvg.HomeCollectionSvg />,
      onPress: () => {
        navigation.navigate(screenNames.COLLECTION_REPORT);
      }
    },
    {
      id: '4',
      title: 'Expenses',
      image: <CommonSvg.HomeExpensesSvg />,
      onPress: () => {
        navigation.navigate(screenNames.EXPENSE_REPORT);
      }
    },
    {
      id: '6',
      title: 'Ledger',
      image: <CommonSvg.HomeAnalyticsSvg />,
      onPress: () => {
        navigation.navigate(screenNames.LEDGER_REPORT);
      }
    },


  ]

  const CollectionExpenseLedgerCardComponent = () => {
    return (
      <View style={styles.cardContainer} >
        <FlatList
          data={options}
          keyExtractor={(item) => `-${item.id}`}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          bounces={false}
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: mvs(20), paddingBottom: mvs(10) }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity activeOpacity={0.8} style={styles.categoryContainer} onPress={item.onPress} >
                <View style={{ height: mvs(40) }} >
                  {item.image}
                </View>

                <View style={{ marginTop: mvs(15) }} >
                  <Text style={GlobalStyles.txtR14DG} >{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Analytics' />
      <ScrollView bounces={false} style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: mvs(70) }}>


        <RoomCountChart />

        <CollectionExpenseChart />

        <CollectionExpenseLedgerCardComponent />

        <CustomCardContainer containerStyle={[{ paddingHorizontal: ms(20) }]}>
          <TouchableOpacity onPress={()=>navigation.navigate(screenNames.DEPOSITE_REPORT)}
            style={[GlobalStyles.rowCenterSpaceBetween]}>
            <View style={GlobalStyles.rowCenter} >
              <CommonSvg.DepositeSvg />
              <View style={{ marginLeft: ms(25) }} >
                <Text style={GlobalStyles.txtR14DG} >Total Deposites</Text>
              </View>
            </View>
            <View >
              <Text style={GlobalStyles.txtR16THEME} >{RS}{totalDeposite}</Text>
            </View>
          </TouchableOpacity>
        </CustomCardContainer>

        <CustomCardContainer containerStyle={[{ paddingHorizontal: ms(20) }]}>
          <TouchableOpacity onPress={()=>navigation.navigate(screenNames.POLICE_REPORT)}
            style={[GlobalStyles.rowCenterSpaceBetween]}>
            <View style={GlobalStyles.rowCenter} >
              <CommonSvg.PoliceReportSvg />
              <View style={{ marginLeft: ms(25) }} >
                <Text style={GlobalStyles.txtR14DG} >Police Report</Text>
              </View>
            </View>
          </TouchableOpacity>
        </CustomCardContainer>

      </ScrollView>
      <CommonBottomTab />

    </CustomContainer>
  )
}

export default Analytics