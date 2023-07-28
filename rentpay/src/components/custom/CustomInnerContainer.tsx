import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ms, mvs } from 'react-native-size-matters'
import { COLORS, SIZES } from '../../styles/theme'

type Props = {
    containerStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    scrollable?: boolean;
}

const CustomInnerContainer: React.FC<Props> = ({
    containerStyle,
    children,
    scrollable=true
}) => {
    return (
        <View style={[styles.createContainer, containerStyle]} >
            {
                scrollable == false ?


                    <View style={{ flex: 1 ,}} >
                        {children}
                    </View>
                    :
                    <KeyboardAwareScrollView bounces={false} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {children}
                    </KeyboardAwareScrollView>

            }
        </View>
    )
}

export default CustomInnerContainer

const styles = StyleSheet.create({
    createContainer: {
        marginTop: mvs(10),
        width: SIZES.width,
        alignSelf: 'center',

        flex: 1,
        borderTopStartRadius: SIZES.radius12,
        borderTopEndRadius: SIZES.radius12,
        borderColor: COLORS.greyTxt,
        borderWidth: ms(1),
        backgroundColor: COLORS.white,
        paddingTop: mvs(20),
    },
})