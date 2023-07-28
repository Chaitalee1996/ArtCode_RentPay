import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../styles';
import { CommonCloseBtn } from '../../../components/uiCommon';
import { ms, mvs } from 'react-native-size-matters';
import { GlobalStyles } from '../../../styles/GlobaStyles';
import { CustomTextInput, CustomThemeButton } from '../../../components/custom';
import { SIZES } from '../../../styles/theme';
import CommonSvg from '../../../components/svg/CommonSvg';
import { useSelector } from 'react-redux';
import { CategoriesGetAllById } from '../../../services/config/apiMethods/CommonApis';
import { DELMethod, POSTMethod, PUTMethod } from '../../../services/config/apiMethods/CommonMethods';
import { showError, showSuccess } from '../../../components/uiCommon/FlashToast';

type Props = {
    visible: boolean,
    visibleFunction: (visible: boolean) => void,
    // categoryData: any[],
}


const ManageCategoryModal = ({ visible, visibleFunction, }: Props) => {

    const [modalVisible, setModalVisible] = useState<any>(visible);
    const [categoryName, setCategoryName] = useState('');
    const { USER_ID } = useSelector((state: any) => state.user);
    const [categoryData, setCategoryData] = useState<any>([]);
    const [selectedCategoryData, setSelectedCategoryData] = useState({})

    useEffect(() => {

        if (visible) {
            getData()
        }


    }, [])

    const getData = () => {
        CategoriesGetAllById(USER_ID)
            .then(response => {

                setCategoryData(response);
            })

    }

    const handleClose = () => {
        visibleFunction(false)
        setModalVisible(false)
    }


    const handleCreate = () => {

        if (selectedCategoryData.hasOwnProperty('name')) {
            updateCategory()
        } else {

            const request = {
                "name": categoryName,
                "usersId": USER_ID
            }

            POSTMethod('/expense_category', request).then(response => {
                if (response.success) {
                    showSuccess(response.message);
                    handleClose()
                } else {
                    showError(response.message)
                }
            })
        }
    }

    const updateCategory = () => {
        const request = {
            "name": categoryName,
            "usersId": USER_ID
        }

        PUTMethod(`/expense_category/${selectedCategoryData?.id}`, request).then(response => {
            if (response.success) {
                showSuccess(response.message);
                handleClose()
            } else {
                showError(response.message)
            }
        })

    }

    const deleteCategory = (id: any) => {

        DELMethod(`/expense_category/${id}`).then(response => {
            if (response.success) {
                showSuccess(response.message);
                handleClose()
            } else {
                showError(response.message)
            }
        })
    }

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={modalVisible}
            onRequestClose={() => {
                handleClose()
            }}>

            <View style={[StyleSheet.absoluteFillObject, styles.ModalContainer]}>
                <View style={styles.modalInnerContainer} >
                    <View style={styles.closeBtnContainer} >
                        <CommonCloseBtn onPress={() => {
                            handleClose()
                        }} />
                    </View>

                    {/* Category ENTER */}
                    <View style={{ marginTop: mvs(10), paddingHorizontal: ms(10), }}>
                        <View style={{ marginBottom: mvs(2), }} >
                            <Text style={GlobalStyles.txtR12Grey} >Category Name</Text>
                        </View>

                        <CustomTextInput
                            value={categoryName}
                            onChangeText={(text) => setCategoryName(text)}
                            placeholder={'Enter category name'}

                        />
                    </View>

                    <CustomThemeButton
                        title={selectedCategoryData.hasOwnProperty('name') ? 'Update' : 'Create'}
                        containerStyle={{ width: SIZES.cardWidth - ms(40), marginTop: mvs(20), marginBottom: mvs(20) }}
                        onPress={handleCreate}
                    />

                    <View style={{ ...styles.flatLine, width: SIZES.width, marginLeft: 0 }} />

                    <View style={{ marginTop: mvs(10), alignSelf: 'flex-start', paddingHorizontal: ms(15), }} >
                        <Text style={GlobalStyles.txtR12THEME} >Category List</Text>
                    </View>

                    <FlatList
                        data={categoryData}
                        keyExtractor={(item) => `category-${item.id}`}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: mvs(10) }}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[GlobalStyles.rowCenterSpaceBetween, { width: SIZES.cardWidth, marginBottom: mvs(15) }]} >
                                    <View>
                                        <Text style={GlobalStyles.txtR16Grey} >{item.name}</Text>
                                    </View>
                                    <View style={GlobalStyles.rowCenter} >
                                        <TouchableOpacity onPress={() => {
                                            setSelectedCategoryData(item);
                                            setCategoryName(item.name);
                                        }} >
                                            <CommonSvg.EditSvg />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteCategory(item.id)}
                                            style={{ marginLeft: ms(20) }} >
                                            <CommonSvg.DeleteSvg />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />

                </View>
            </View>
        </Modal>
    )
}

export default ManageCategoryModal