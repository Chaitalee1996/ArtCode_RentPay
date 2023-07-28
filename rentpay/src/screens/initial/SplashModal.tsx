import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import CommonSvg from '../../components/svg/CommonSvg'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES } from '../../styles/theme'
import { StatusBar } from 'react-native'
import { ms, mvs } from 'react-native-size-matters'
import { styles } from './styles'
import screenNames from '../../constants/screenNames'
import { GlobalStyles } from '../../styles/GlobaStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ENUMS_ASYNCH } from '../../constants/enums'

type Props = {}

const SplashModal = (props: Props) => {
  const [active, setActive] = useState(0);
  const navigation = useNavigation();

  const flatRef = useRef<FlatList>(null);

  const onViewRef = React.useRef((viewableItems: any) => {
    setActive(viewableItems.viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleActive = index => {
    if (index == 3) {
      handleSkip()
    } else {
      setActive(index);
      flatRef.current?.scrollToIndex({
        index: index,
        animated: true,
        viewOffset: 0,
      });
    }
  };
  const handleSkip = async() => {
    await AsyncStorage.setItem(ENUMS_ASYNCH.SPLASH_MODAL, ENUMS_ASYNCH.SPLASH_MODAL);
    navigation.replace(screenNames.LOGIN);

  };




  const options = [
    {
      id: '1',
      image: require('../../assets/images/sp2.png'),
      title: 'Rent Transactions Easily Manage'
    },
    {
      id: '2',
      image: require('../../assets/images/sp1.png'),
      title: 'Keep your records Safe on Cloud'
    },
    {
      id: '3',
      image: require('../../assets/images/sp3.png'),
      title: 'Advanced Analytics'
    },
  ]
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }} >
      <StatusBar translucent backgroundColor={COLORS.transparent} barStyle="dark-content" />
      <FlatList
        data={options}
        ref={flatRef}
        keyExtractor={item => `images-${item.id}`}
        pagingEnabled
        scrollEnabled={true}
        horizontal
        //contentContainerStyle={{paddingTop:mvs(25)}}
        initialScrollIndex={active}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: SIZES.width, flex: 1 }}>
              <View style={{ marginTop: index == 1 ? mvs(25) : 0 }} >
                <Image source={item.image} style={styles.imageStyle} />
              </View>
              <View style={styles.bottomContainer} >
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: mvs(50) }} >
                  <View style={{ width: '60%' }} >
                    <Text style={{ ...GlobalStyles.txtR24White, textAlign: 'center', }} >{item.title}</Text>
                  </View>
                  <View style={{ width: '80%', marginTop: mvs(35) }} >
                    <Text style={{ ...GlobalStyles.txtR14White, textAlign: 'center', }} >RentPay helps you to manage your property
                      rent, Expenses and your Tenants.</Text>
                  </View>

                </View>
                <View style={styles.bottomSkipContainer} >
                  <TouchableOpacity onPress={handleSkip}>
                    <Text style={GlobalStyles.txtR16White} >Skip</Text>
                  </TouchableOpacity>
                  <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, }} >
                      {
                        options.map((data, i) => {
                          return (
                            <View style={{
                              height: mvs(10),
                              width: ms(10),
                              borderRadius: 30,
                              marginLeft: 5,
                              backgroundColor: active == i ? COLORS.white : "#2D2FB6",
                            }} />
                          )
                        })
                      }
                    </ScrollView>
                  </View>
                  <TouchableOpacity onPress={() => handleActive(index + 1)}>
                    <Text style={GlobalStyles.txtR16White} >Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
      />

    </View>
  )
}

export default SplashModal