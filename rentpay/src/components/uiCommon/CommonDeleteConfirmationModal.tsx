import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { GlobalStyles } from '../../styles/GlobaStyles';
import { COLORS } from '../../styles/theme';
import { mvs } from 'react-native-size-matters';

type Props = {
    visible: boolean,
    visibleFunction: (visible: boolean) => void,
    yesOnPress: () => void,
    title?:string;
    mainTitle?:string;
    yesLabel?:string
}

const CommonDeleteConfirmationModal = ({ visible, visibleFunction, yesOnPress,title,mainTitle,yesLabel }: Props) => {

    const [modalVisible, setModalVisible] = useState<any>(visible);


    const handleClose = () => {
        visibleFunction(false)
        setModalVisible(false)
    }

    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={modalVisible}
            onRequestClose={() => {
                handleClose()
            }}>

            <View style={[StyleSheet.absoluteFillObject, GlobalStyles.ModalContainer]}>
                <View style={GlobalStyles.modalInnerContainer} >
                    <View>
                        <Text style={{...GlobalStyles.txtR16DG,textAlign:'center'}}  numberOfLines={2} >{mainTitle?mainTitle: `Are you sure you want to delete ${title} ?`}</Text>
                    </View>

                    <View style={{...GlobalStyles.rowCenter,width:'100%',marginTop:mvs(20)}} >

                        <TouchableOpacity style={{...GlobalStyles.alignJustifyCenter,width:'49%'}}  onPress={handleClose}>
                            <Text style={GlobalStyles.txtR16Grey} >No</Text>
                        </TouchableOpacity>

                        <Text style={GlobalStyles.txtM20Grey} >|</Text>

                        <TouchableOpacity style={{...GlobalStyles.alignJustifyCenter,width:'50%'}} onPress={yesOnPress}>
                            <Text style={{...GlobalStyles.txtR16Grey,color:COLORS.delete}} >{yesLabel?yesLabel:'Delete'}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CommonDeleteConfirmationModal