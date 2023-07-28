import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader, CustomStatusBar } from '../../components/custom'
import { CommonBottomTab, CommonCloseBtn, CommonDeleteConfirmationModal } from '../../components/uiCommon'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { DisablePropertiesGetByUserId, PropertyStatusUpdateDisable } from '../../services/config/apiMethods/CommonApis'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native'
import { COLORS } from '../../styles/theme'
import { __refreshingChange } from '../../services/redux/loadingSlice'
import { mvs } from 'react-native-size-matters'
import screenNames from '../../constants/screenNames'
import { ms } from 'react-native-size-matters'
import { TouchableOpacity } from 'react-native'
import CommonSvg from '../../components/svg/CommonSvg'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { styles } from './styles'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { showError, showSuccess } from '../../components/uiCommon/FlashToast'
import { DELMethod } from '../../services/config/apiMethods/CommonMethods'

type Props = {}

const DisableProperties = (props: Props) => {

  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const { REFRESHING } = useSelector((state: any) => state.loading);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const [propertiesData, setPropertiesData] = useState<any>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>({})

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

    DisablePropertiesGetByUserId(USER_ID).then(response => {
      setPropertiesData(response)
    })
  }


  const handleRestoreProperty = (id: number) => {

    PropertyStatusUpdateDisable(`/property/update-property-status/${id}?status=false`)
      .then(response => {
        if (response.success) {
          getData();
          showSuccess(response.message);
        } else {
          showError(response.message)
        }
      })

  }
  const handleDeleteProperty = () => {
    DELMethod(`/property/${selectedProperty?.id}`).then(response => {
      if (response.success) {
        getData();
        setDeleteModalVisible(false)
        showSuccess(response.message);
      } else {
        setDeleteModalVisible(false)
        showError(response.message);
      }
    });
  }

  const onRefresh = () => {

    dispatch(__refreshingChange(true))
    getData();
    dispatch(__refreshingChange(false))

  }


  const PropertyListComponent = () => {
    return (
      <View>
        <FlatList
          data={propertiesData}
          keyExtractor={(item) => `property-${item.id}`}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={REFRESHING}
              onRefresh={onRefresh}
              tintColor={COLORS.theme}
              colors={[COLORS.theme]}
            />
          }
          contentContainerStyle={{ paddingBottom: mvs(170), marginTop: mvs(10) }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ marginBottom: mvs(40),marginTop:mvs(10) }} >
                <View style={styles.closeBtnDisable} >
                  <CommonCloseBtn onPress={() => {
                    setSelectedProperty(item)
                    setDeleteModalVisible(true)
                  }} containeStyle={{ backgroundColor: COLORS.delete }} />
                </View>
                <CustomCardContainer containerStyle={{ paddingHorizontal: ms(0), marginTop: mvs(0), paddingVertical: mvs(0), paddingTop: mvs(15) }}>
                  <View style={{ alignItems: 'flex-start', flexDirection: 'row', paddingHorizontal: ms(20) }} >
                    <CommonSvg.PropertyCardBigSvg />
                    <View style={{ marginLeft: ms(10) }} >
                      <Text style={GlobalStyles.txtR16DG} >{item.name}</Text>
                      <Text style={GlobalStyles.txtR12Grey} numberOfLines={2} >{item.address}</Text>
                    </View>
                  </View>

                  <View style={[GlobalStyles.rowCenterSpaceBetween, { marginTop: mvs(20), marginBottom: mvs(45), paddingHorizontal: ms(20) }]} >
                    <View>
                      <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{item.totalnoOfRooms}</Text>
                      <Text style={GlobalStyles.txtR14Grey} >Total</Text>
                      <Text style={GlobalStyles.txtR14Grey} >Units</Text>
                    </View>
                    <View>
                      <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{item.occupiedRooms}</Text>
                      <Text style={GlobalStyles.txtR14Grey} >Occupied</Text>
                      <Text style={{ ...GlobalStyles.txtR14Grey, textAlign: 'center' }} >Units</Text>
                    </View>
                    <View>
                      <Text style={{ ...GlobalStyles.txtM16THEME, textAlign: 'center' }} >{item.availableRooms}</Text>
                      <Text style={GlobalStyles.txtR14Grey} >Available</Text>
                      <Text style={{ ...GlobalStyles.txtR14Grey, textAlign: 'center' }} >Units</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.restoreContainer} onPress={() => handleRestoreProperty(item.id)} >
                    <View style={GlobalStyles.rowCenter} >
                      <Icons name='restore' size={30} color={COLORS.white} />
                      <Text style={{ ...GlobalStyles.txtM16White, marginLeft: ms(15) }} >RESTORE PROPERTY</Text>
                    </View>
                  </TouchableOpacity>



                </CustomCardContainer>
              </View>
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
      <CustomHeader title='Disable Property' />

      <PropertyListComponent />

      {
        deleteModalVisible &&
        <CommonDeleteConfirmationModal
          visible={deleteModalVisible}
          visibleFunction={(visible) => {
            setDeleteModalVisible(visible)
          }}
          title={selectedProperty?.name}
          yesOnPress={() => {
            handleDeleteProperty()
          }}
        />
      }

      <CommonBottomTab />
    </CustomContainer>

  )
}

export default DisableProperties 