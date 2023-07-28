import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SwitchToggle from 'react-native-switch-toggle'
import { ms, mvs } from 'react-native-size-matters'
import { COLORS, SIZES } from '../../styles/theme'

type Props = {
    visible: boolean;
    handleNotificationOnOff:(visibel:boolean)=>void
}

const CustomSwitch = ({visible,handleNotificationOnOff}: Props) => {
  return (
    <SwitchToggle
    switchOn={visible}
    onPress={()=>handleNotificationOnOff(!visible)}
    backgroundColorOn={COLORS.theme}
    backgroundColorOff='#C4C4C4'
    containerStyle={{

      width: ms(50),
      height: mvs(27),
      borderRadius: SIZES.radius15,
      padding: ms(5),
    }}
    circleStyle={{
      width: ms(22),
      height: ms(22),
      borderRadius: SIZES.radius12,
      backgroundColor:COLORS.white
    }}
  />
  )
}

export default CustomSwitch

const styles = StyleSheet.create({})