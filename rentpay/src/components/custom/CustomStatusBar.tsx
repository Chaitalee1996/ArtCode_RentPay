import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../styles/theme';

type Props = {
    color?: string;
    barStyle?: any;
};


const CustomStatusBar: React.FC<Props> = ({ color, barStyle }) => {
    return (
        <StatusBar
            translucent
            backgroundColor={color ? color : COLORS.transparent}
            barStyle={barStyle ? barStyle : "dark-content"} />
    );
};

export default CustomStatusBar;