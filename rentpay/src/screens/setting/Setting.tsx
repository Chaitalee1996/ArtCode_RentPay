import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CustomCardContainer, CustomContainer, CustomHeader } from '../../components/custom'
import { styles } from './styles'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { useNavigation } from '@react-navigation/native'
import { UserInfoGetById } from '../../services/config/apiMethods/CommonApis'
import { useDispatch, useSelector } from 'react-redux'
import CommonSvg from '../../components/svg/CommonSvg'
import { ms, mvs } from 'react-native-size-matters'
import SwitchToggle from "react-native-switch-toggle";
import { COLORS, SIZES } from '../../styles/theme'
import axiosInstance from '../../services/config/helpers/axiosInterceptor'
import { showError, showSuccess } from '../../components/uiCommon/FlashToast'
import screenNames from '../../constants/screenNames'
import { CommonCloseBtn, CommonDeleteConfirmationModal } from '../../components/uiCommon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ENUMS_ASYNCH } from '../../constants/enums'
import { __userIdChange } from '../../services/redux/userSlice'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet'

type Props = {}

const Setting = (props: Props) => {

  const navigation = useNavigation<any>();
  const { USER_ID } = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState<any>({});
  const [visible, setVisible] = useState(true);
  const [photoData, setPhotoData] = useState<any>(null);
  const photoRef = useRef(null);

  const dispatch = useDispatch<any>();

  const [logoutVisible, setLogoutVisible] = useState(false)

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])

  const getData = () => {
    UserInfoGetById(`/users/${USER_ID}`).then(response => {
      setVisible(response?.sendNotification);
      setUserData(response)
      console.log("UserInfoGetById==>", response)
    })
  }

  const handleNotificationOnOff = () => {
    axiosInstance.put(`/users/update-notification/${USER_ID}?notification=${!visible}`)
      .then(response => {
        if (response.data.success) {
          setVisible(!visible);
          showSuccess(response.data.message)
        } else {
          showError(response.data.message);
        }
      }).catch(err => {
        console.log(err)
      })

  }

  const options = [
    {
      id: '1',
      name: 'Subscription Plan',
      desc: userData?.subscriptionName,
      onPress: () => {
        navigation.navigate(screenNames.SUBSCRIPTION);
      }
    },
    {
      id: '10',
      name: 'Disable Properties',
      desc: "Manage Property status",
      onPress: () => {
        navigation.navigate(screenNames.DISABLE_PROPERTIES);
      }
    },
    {
      id: '2',
      name: 'Notification',
      desc: "ON/OFF",
      onPress: () => {

      }
    },
    {
      id: '3',
      name: 'Support',
      desc: 'Raise Tickets',
      onPress: () => {
        navigation.navigate(screenNames.SUPPORT);
      }
    },
    {
      id: '4',
      name: 'Rate Us',
      desc: "Rate our Service",
      onPress: () => {

      }
    },
    {
      id: '5',
      name: 'Share App',
      desc: "Share to Friends and Family",
      onPress: () => {

      }
    },
    {
      id: '6',
      name: 'Terms and Condition',
      onPress: () => {
        navigation.navigate(screenNames.TERMS)
      }
    },
    {
      id: '7',
      name: 'Privacy and Policy',
      onPress: () => {
        navigation.navigate(screenNames.POLICY)
      }
    },
    {
      id: '8',
      name: 'Logout',
      onPress: () => {
        setLogoutVisible(true)
      }
    },

  ]

  var photoOptions = [
    {
      name: 'Take from camera',
      icon: <Icon color={COLORS.theme} size={21} name="camera" />,
      onPress: () => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          //cropping: true,
        })
          .then(response => {
            setPhotoData(response);
            photoRef.current.close()
          })
          .catch(e => console.log("Image Error", e.message))
      },
    },
    {
      name: 'Choose from Gallery',
      icon: <Icon name="image" color={COLORS.theme} size={21} />,
      onPress: () => {
        ImagePicker.openPicker({
          multiple: false,
          waitAnimationEnd: false,
          includeExif: true,
          forceJpg: true,
          compressImageQuality: 0.8,
          maxFiles: 1,
          mediaType: 'photo',
          includeBase64: true,

        })
          .then(response => {
            setPhotoData(response)
            photoRef.current.close()
          })
          .catch(e => console.log("Image Error", e.message))
      },
    },
  ];

  const ProfileComponent = () => {
    return (
      <CustomCardContainer>
        <View style={[styles.profileView, GlobalStyles.rowCenter]} >
          <View style={{ width: '30%' }} >
            {
              userData?.profilePic ?

                <Image source={{ uri: userData?.profilePic }} style={styles.imageStyle} />

                :
                <View style={styles.imageStyle} />

            }

            <TouchableOpacity onPress={()=>photoRef.current.open()}
              style={styles.imageEdit} >
              <CommonSvg.ProfileEditSvg />
            </TouchableOpacity>

          </View>

          <View style={{ marginLeft: ms(20), alignSelf: 'flex-start', width: '70%' }} >

            <View>
              <Text style={GlobalStyles.txtM16DG} >{userData?.name}</Text>
            </View>
            <View>
              <Text style={GlobalStyles.txtR16DG} >{userData?.mobileNo}</Text>
            </View>
            <View style={{}}>
              <Text style={{ ...GlobalStyles.txtR14DG, width: '100%' }} numberOfLines={2} adjustsFontSizeToFit>{userData?.address}-{userData?.state}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate(screenNames.PROFILE_EDIT)}
              style={styles.profileEdit} >
              <CommonSvg.ProfileEditSvg />
            </TouchableOpacity>

          </View>



        </View>
      </CustomCardContainer>
    )
  }


  return (
    <CustomContainer>

      <CustomHeader title='Setting' />

      <FlatList
        data={options}
        keyExtractor={(item) => `list-${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ProfileComponent />}
        contentContainerStyle={{ paddingBottom: mvs(120), }}
        renderItem={({ item, index }) => {
          return (
            <CustomCardContainer containerStyle={{ paddingVertical: mvs(10), marginTop: mvs(15) }}>
              <TouchableOpacity disabled={item.name == "Notification" ? true : false}
                style={item.name == "Notification" ? GlobalStyles.rowCenterSpaceBetween : {}} onPress={item.onPress}>


                <View>
                  <Text style={GlobalStyles.txtR16DG} >{item?.name}</Text>

                  {
                    item?.desc &&
                    <View>
                      <Text style={GlobalStyles.txtR12Grey} >{item?.desc}</Text>
                    </View>
                  }
                </View>

                {
                  item.name == "Notification" &&
                  <View>

                    <SwitchToggle
                      switchOn={visible}
                      onPress={handleNotificationOnOff}
                      backgroundColorOn={COLORS.theme}
                      backgroundColorOff='#C4C4C4'
                      containerStyle={{

                        width: ms(60),
                        height: mvs(30),
                        borderRadius: SIZES.radius15,
                        padding: ms(5),
                      }}
                      circleStyle={{
                        width: ms(25),
                        height: ms(25),
                        borderRadius: SIZES.radius12,
                      }}
                    />

                  </View>
                }

              </TouchableOpacity>

            </CustomCardContainer>
          )
        }}
      />



      <RBSheet
        ref={photoRef}
        height={190}
        openDuration={250}
        dragFromTopOnly
        closeOnDragDown
        customStyles={{
          container: {
            backgroundColor: COLORS.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        }}>
        <View style={{ paddingHorizontal: 20, }}>
          {photoOptions.map(({ name, onPress, icon }) => (
            <TouchableOpacity
              onPress={onPress}
              style={{
                flexDirection: 'row',
                paddingTop: 20,
                alignItems: 'center',
              }}
              key={name}>
              {icon}
              <Text style={[GlobalStyles.txtM14THEME, { marginHorizontal: ms(10) }]}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>

      {
        logoutVisible &&
        <CommonDeleteConfirmationModal
          visible={logoutVisible}
          visibleFunction={(visible) => {
            setLogoutVisible(false)
          }}
          yesOnPress={async () => {
            setLogoutVisible(false)
            dispatch(__userIdChange(0));
            await AsyncStorage.removeItem(ENUMS_ASYNCH.ACCESS_TOKEN);
            await AsyncStorage.removeItem(ENUMS_ASYNCH.USER_ID);
            navigation.replace(screenNames.LOGIN)
          }}
          mainTitle={"Are you sure want to log out ?"}
          yesLabel={"Yes"}
        />
      }


    </CustomContainer>
  )
}

export default Setting