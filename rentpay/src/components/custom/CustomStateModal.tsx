import { FlatList, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { COLORS, SIZES } from '../../styles/theme'
import { ms, mvs } from 'react-native-size-matters'
import { STATES_DEISTRICT } from '../../constants/dummyData'
import CommonSvg from '../svg/CommonSvg'
import Icons from 'react-native-vector-icons/AntDesign'

type Props = {
    visible: boolean,
    visibleFunction: (visible: boolean) => void,
    onSelect?: (selected: string) => void
}

const CustomStateModal = ({ visible, visibleFunction, onSelect }: Props) => {

    const [modalVisible, setModalVisible] = useState<any>(visible);
    const [stateData, setStateData] = useState(STATES_DEISTRICT.states);
    const [search, setSearch] = useState('')

    const handleOnSelect = (state: string) => {
        onSelect(state);
        handleClose()
    }
    
    const handleSearch = (txt: string) => {
        let text = txt.toLowerCase();
        let states = stateData;
        let filteredName = states.filter((item) => {
            return item.state.toLowerCase().match(text)
        })
        if (!text || text === '') {
            setStateData(STATES_DEISTRICT.states)
        } else if (Array.isArray(filteredName)) {
            setStateData(filteredName)
        }

    }

    const handleClose = () => {
        visibleFunction(false)
        setModalVisible(false)
    }

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={modalVisible}
            onRequestClose={() => {
                handleClose()
            }}>

            <View style={[StyleSheet.absoluteFillObject, GlobalStyles.ModalContainer]}>
                <View style={{ ...styles.modalInnerContainer, width: SIZES.cardWidth, paddingVertical: mvs(0), height: mvs(300) }} >
                    <TouchableOpacity style={styles.selectTenantView} onPress={handleClose} >
                        <Text style={GlobalStyles.txtM16White} >SELECT STATE</Text>
                    </TouchableOpacity>

                    <View style={[styles.searchView, GlobalStyles.rowCenter]} >
                        <TextInput
                            value={search}
                            style={[styles.inputBox, search ? GlobalStyles.txtM14THEME : GlobalStyles.txtR14Grey]}
                            onChangeText={(txt) => {
                                handleSearch(txt);
                                setSearch(txt)
                            }}
                            autoCapitalize='none'
                            placeholder='Search state'
                            onSubmitEditing={Keyboard.dismiss}
                            keyboardType='default'
                        />

                        <Icons name='search1' size={22} color={COLORS.theme} />
                    </View>

                    <FlatList
                        data={stateData}
                        keyExtractor={(item, index) => `states-${index}`}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{ paddingTop: mvs(10) }}
                        ItemSeparatorComponent={() => <View style={{ ...GlobalStyles.flatLine, marginVertical: mvs(0), }} />}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.stateRowView} onPress={()=>handleOnSelect(item.state)}>
                                    <Text style={GlobalStyles.txtR14THEME} >{item.state}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />


                </View>
            </View>
        </Modal>
    )
}

export default CustomStateModal

const styles = StyleSheet.create({
    modalInnerContainer: {
        backgroundColor: COLORS.white,
        width: SIZES.width,
        alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingVertical: mvs(20),

        borderRadius: SIZES.radius12
    },
    selectTenantView: {
        height: mvs(40),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.theme,
        borderTopStartRadius: SIZES.radius,
        borderTopEndRadius: SIZES.radius,
        position: 'absolute',
        top: 0
    },
    searchView: {
        marginTop: mvs(40),
        height: mvs(40),
        backgroundColor: COLORS.white,
        width: SIZES.cardWidth,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.theme,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3,
        elevation: 15,
        // marginBottom:mvs(10),
    },
    inputBox: {
        width: '70%'
    },
    stateRowView: {
        paddingVertical: mvs(5),
        paddingHorizontal: ms(20)
    }
})