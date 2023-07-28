import { Image, ImageSourcePropType, ImageStyle, ImageURISource, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { ms, mvs } from 'react-native-size-matters';
import { COLORS, SIZES } from '../../styles/theme';
import images from '../../constants/images';

type Props = {
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    imageUrl?: string
}

const CustomImageView: React.FC<Props> = ({
    containerStyle,
    imageStyle, imageUrl

}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {/* {
                imageUrl!=null ?
                    <Image source={{ uri: imageUrl }} style={[styles.imageStyle, imageStyle]} />
                    :
                    <Image source={images.dummyProfile} style={[styles.imageStyle, imageStyle]} />
            } */}

            <Image source={images.dummyProfile} style={[styles.imageStyle, imageStyle]} />
        </View>
    )
}

export default CustomImageView

const styles = StyleSheet.create({
    container: {
        height: ms(50),
        width: ms(50),
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        shadowColor: COLORS.darkGrey,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 10,
    },
    imageStyle: {
        height: ms(30),
        width: ms(35),
        borderRadius: SIZES.radius,
        resizeMode: 'cover',
        tintColor: COLORS.lightWhite
    }
})