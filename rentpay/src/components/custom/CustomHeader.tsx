import {
    Platform,
    StatusBar,
    StyleProp,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../styles/GlobaStyles';
import { ms, mvs } from 'react-native-size-matters';
import { COLORS, SIZES } from '../../styles/theme';
import { DASHES } from '../../constants/enums';

type Props = {
    containerStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    title: string,
    description?:string
};

const STATUS_HEIGHT: any = StatusBar.currentHeight;



const CustomHeader: React.FC<Props> = ({
    containerStyle,
    children, title,description

}) => {

    return (
        <View style={[GlobalStyles.headerContainer, containerStyle]} >

            <View style={[GlobalStyles.rowCenterSpaceBetween, { paddingHorizontal: ms(20), }]} >
                <View>
                    <Text style={GlobalStyles.txtR24DG} >{title}</Text>
                    {
                        description &&

                        <Text style={{...GlobalStyles.txtR14Grey,marginTop:mvs(5),width:'70%'}} numberOfLines={2}>{description}</Text>

                    }
                    
                </View>
                


                {children}


            </View>
            {/* <View style={GlobalStyles.dottedLine} /> */}
            <View style={GlobalStyles.dottedLineContainer} >
                <Text style={{ ...GlobalStyles.txtM16Grey, }} numberOfLines={1} adjustsFontSizeToFit>{DASHES}</Text>
            </View>
        </View>
    );
};

export default CustomHeader;
