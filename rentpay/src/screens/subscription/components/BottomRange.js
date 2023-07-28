import React, { memo } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import images from '../../../constants/images';
import { GlobalStyles } from '../../../styles/GlobaStyles';
import { ms } from 'react-native-size-matters';

const BottomRange = ({ text,  }) => {
    return (
        <ImageBackground style={styles.container} source={images.rangeLabelBottom} >
            <Text style={GlobalStyles.txtSB12White} >{text}</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width:ms(35),
        height:ms(30),
        
    },

});

export default BottomRange;