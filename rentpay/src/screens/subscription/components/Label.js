import React, { memo } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import images from '../../../constants/images';
import { GlobalStyles } from '../../../styles/GlobaStyles';
import { ms, mvs } from 'react-native-size-matters';

const Label = ({ text, ...restProps }) => {
    return (
        <ImageBackground style={styles.container} source={images.rangeLabelBack} >
            <Text style={GlobalStyles.txtSB12White} >{text}</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width:ms(45),
        height:ms(35),
        //marginBottom:mvs(10)
    },

});

export default memo(Label);