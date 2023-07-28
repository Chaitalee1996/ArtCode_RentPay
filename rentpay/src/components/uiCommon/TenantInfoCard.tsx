import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { COLORS, SIZES } from '../../styles/theme'
import { ms, mvs } from 'react-native-size-matters'
import images from '../../constants/images'
import CommonSvg from '../svg/CommonSvg'
import moment from 'moment'
import { RS } from '../../constants/enums'

type Props = {
    data: any
}

const TenantInfoCard: React.FC<Props> = ({ data }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, i) => `-${i}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingTop:mvs(20),paddingBottom:mvs(120)}}
            renderItem={({ item, index }) => {
                return (
                    <View style={[GlobalStyles.rowCenterSpaceBetween, styles.cardContainer]} >
                            <Image
                                source={images.profilePic}
                                // source={item.profilePic?{uri:item.profilePic}:images.profilePic}
                                style={styles.tenantProfileImgStyle} 
                            />

                            <View style={{width:'60%'}} >
                                <View>
                                    <Text style={GlobalStyles.txtR14DG} >{item.tenantName}</Text>
                                </View>
                                <View>
                                    <Text style={GlobalStyles.txtR12Grey} numberOfLines={1} >
                                        {item.propertyName.length > 40 ?item.propertyName.substring(0, 60) + "..." : item.propertyName}</Text>
                                </View>
                                <View style={{...GlobalStyles.rowCenterSpaceBetween,width:'100%',}} >
                                    <Text style={GlobalStyles.txtR12Grey} >Rent : {RS}{item?.rentAmount}</Text>
                                    <Text style={GlobalStyles.txtR12Grey} >Due On : {moment(item.dueDate).format("DD MMM")}</Text>
                                </View>

                            </View>
                            <TouchableOpacity onPress={()=> Linking.openURL(`tel:+91 ${item.mobileNo}`)}>
                                <CommonSvg.PhoneSvg/>
                            </TouchableOpacity>
                            
                    </View>
                )
            }}
        />
    )
}

export default TenantInfoCard

const styles = StyleSheet.create({
    cardContainer: {
        width:SIZES.cardWidth,
        paddingHorizontal:ms(10),
        paddingVertical:mvs(10),
        backgroundColor:COLORS.white,
        alignSelf:'center',
        shadowColor: COLORS.theme,
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3,
        elevation: 15, 
        marginBottom:mvs(15)  ,
        borderRadius:SIZES.radius12  
    },
    tenantProfileImgStyle:{
        height:ms(50),
        width:ms(50),
        borderRadius:SIZES.radius,
        resizeMode:'cover'
    }
})