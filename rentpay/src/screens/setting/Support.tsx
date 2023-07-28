import { View, Text, TextInput, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { CustomContainer, CustomHeader, CustomStatusBar, CustomThemeButton } from '../../components/custom'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { COLORS, SIZES } from '../../styles/theme'
import { ms, mvs } from 'react-native-size-matters'
import { showError, showSuccess } from '../../components/uiCommon/FlashToast'
import { useSelector } from 'react-redux'
import { POSTMethod } from '../../services/config/apiMethods/CommonMethods'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const Support = (props: Props) => {

  const [support, setSupport] = useState('');
  const { USER_ID } = useSelector((state: any) => state.user);
  const navigation = useNavigation<any>();


  const handleSubmit = () => {

    if (support == "") {

      showError("Please write something")

    } else {

      const request = {
        "text": support,
        "usersId": USER_ID
      }

      POSTMethod('/raise_tickets', request).then(response => {
        if (response.success) {
          showSuccess(response.message);
          navigation.goBack()
        } else {
          showError(response.message)
        }
      })


    }


  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Support' />

      <View style={{ marginTop: mvs(10) }}>

        <TextInput
          value={support}
          style={[GlobalStyles.inputStyle,
          support ? GlobalStyles.txtM16THEME : GlobalStyles.txtR14THEME, { height: mvs(160), textAlignVertical: 'top' }]}
          onChangeText={(txt: any) => setSupport(txt)}
          autoCapitalize='none'
          placeholder={'Write Something...'}
          placeholderTextColor={COLORS.greyTxt}
          numberOfLines={10}
          onSubmitEditing={() => {
            Keyboard.dismiss()
          }}
          keyboardType='phone-pad'
        />

      </View>

      <CustomThemeButton
        title='Submit'
        containerStyle={{ width: ms(180), marginTop: mvs(30), marginBottom: mvs(70) }}
        onPress={handleSubmit}
      />

    </CustomContainer>

  )
}

export default Support