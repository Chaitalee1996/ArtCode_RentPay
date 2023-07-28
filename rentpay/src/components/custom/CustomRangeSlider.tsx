import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import RangeSlider from 'rn-range-slider';
import { Label, Notch, Rail, RailSelected, Thumb } from '../../screens/subscription/components';
import { SIZES } from '../../styles/theme';
import { mvs } from 'react-native-size-matters';
import { GlobalStyles } from '../../styles/GlobaStyles';
import BottomRange from '../../screens/subscription/components/BottomRange';

type Props = {
    handleLowHigh: (low: any, high: any) => void,
    value?:any,
    style?:StyleProp<ViewStyle>
}

const CustomRangeSlider = ({ handleLowHigh,value,style }: Props) => {

    const [low, setLow] = useState(value);
    const [high, setHigh] = useState(1000);

    const renderThumb = useCallback((name: 'high' | 'low') => <Thumb name={name} />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback((value: any) => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        handleLowHigh(low, high)
        setLow(low);
        setHigh(high);
    }, []);
0
    useEffect(() => {
        setLow(value)
    }, [value])
    

    return (
        <>

            <RangeSlider
                style={{ width: SIZES.cardWidth, height: mvs(40), marginTop: mvs(50),...style }}
                min={1}
                max={1000}
                step={1}
                floatingLabel
                disableRange
                // allowLabelOverflow={}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                low={low}
                high={high}
                onValueChanged={handleValueChange}
            />

            <View style={[GlobalStyles.rowCenterSpaceBetween, { width: SIZES.cardWidth }]} >
                <BottomRange text={'01'} />
                <BottomRange text={'1000'} />
            </View>

        </>
    )
}

export default CustomRangeSlider