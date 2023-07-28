import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ms, mvs } from 'react-native-size-matters'
import { COLORS, SIZES } from '../../styles/theme'
import CommonSvg from '../svg/CommonSvg'
import TabIcon from '../../navigation/TabIcon'
import { useNavigation } from '@react-navigation/native'
import screenNames from '../../constants/screenNames'
import { useKeyboardVisible } from '../hooks'

type Props = {}

const CommonBottomTab = (props: Props) => {

    const navigation = useNavigation<any>();
    const isKeyboardVisible = useKeyboardVisible();

    const options = [
        {
            id: '1',
            title: 'Home',
            onPress: () => {
                navigation.navigate(screenNames.HOME)
            }
        },
        {
            id: '2',
            title: 'Collection',
            onPress: () => {
                navigation.navigate(screenNames.COLLECTION)
            }
        },
        {
            id: '3',
            title: 'Expense',
            onPress: () => {
                navigation.navigate(screenNames.EXPENSES)
            }
        },
        {
            id: '4',
            title: 'Setting',
            onPress: () => {
                navigation.navigate(screenNames.SETTING)
            }
        },

    ]

    if(isKeyboardVisible){
        return <></>
    }

    return (
        <View style={styles.container} >

            <TouchableOpacity onPress={options[0].onPress}>
                <TabIcon
                    focused={false}
                    title={options[0].title}
                    icon={
                        <CommonSvg.HomeTabSvg
                            color={COLORS.tabTxt}
                        />
                    }
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={options[1].onPress}>
                <TabIcon
                    focused={false}
                    title={options[1].title}
                    icon={
                        <CommonSvg.CollectionTabSvg
                            color={COLORS.tabTxt}
                        />
                    }
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={options[2].onPress}>
                <TabIcon
                    focused={false}
                    title={options[2].title}
                    icon={
                        <CommonSvg.ExpenseTabSvg
                            color={COLORS.tabTxt}
                        />
                    }
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={options[3].onPress}>
                <TabIcon
                    focused={false}
                    title={options[3].title}
                    icon={
                        <CommonSvg.SettingTabSvg
                            color={COLORS.tabTxt}
                        />
                    }
                />
            </TouchableOpacity>

            {/* <FlatList
                data={options}
                keyExtractor={(item) => `tab-${item.id}`}
                showsVerticalScrollIndicator={false}
                horizontal
                contentContainerStyle={{}}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={item.onPress}>
                            <TabIcon
                                focused={false}
                                title={item.title}
                                icon={
                                    <CommonSvg.HomeTabSvg
                                        color={COLORS.tabTxt}
                                    />
                                }
                            />
                        </TouchableOpacity>
                    )
                }}
            /> */}


            {/* <CommonSvg.HomeTabSvg color={COLORS.tabTxt}/> 
            <CommonSvg.HomeTabSvg /> 
            <CommonSvg.HomeTabSvg /> 
            <CommonSvg.HomeTabSvg />  */}
        </View>
    )
}

export default CommonBottomTab

const styles = StyleSheet.create({
    container: {
        height: mvs(70),
        width: SIZES.width,
        backgroundColor: COLORS.white,
        position: 'absolute',
        bottom: 0,
        shadowColor: COLORS.black,
        shadowOpacity: 0.7,
        shadowRadius: 10,
        shadowOffset: {
            width: 3,
            height: 5
        },
        elevation: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: ms(27)
    }
})