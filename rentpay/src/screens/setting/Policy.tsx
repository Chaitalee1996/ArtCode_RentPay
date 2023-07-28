import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomContainer, CustomHeader, CustomInnerContainer, CustomStatusBar } from '../../components/custom'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { useNavigation } from '@react-navigation/native'
import { TermsAndPoliciesGetAll } from '../../services/config/apiMethods/CommonApis'
import { ms } from 'react-native-size-matters'


const Policy = () => {

  const [policy, setPolicy] = useState('')
  const navigation = useNavigation<any>();

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      subscribe;
    };
  }, [])

  const getData = () => {

    TermsAndPoliciesGetAll().then(response => {
      if (response) {
        console.log(response)
        setPolicy(response.policies);
      }
    })

  }

  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Privacy Policy' />

      <CustomInnerContainer containerStyle={{ paddingHorizontal: ms(15) }}>
        <View>
          <Text style={GlobalStyles.txtR14Grey} >{policy}</Text>
        </View>
      </CustomInnerContainer>
    </CustomContainer>
  )
}

export default Policy