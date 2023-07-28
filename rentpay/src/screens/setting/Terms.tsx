import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomContainer, CustomHeader, CustomInnerContainer, CustomStatusBar } from '../../components/custom'
import { GlobalStyles } from '../../styles/GlobaStyles'
import { useNavigation } from '@react-navigation/native'
import { TermsAndPoliciesGetAll } from '../../services/config/apiMethods/CommonApis'
import { ms } from 'react-native-size-matters'

type Props = {}

const Terms = (props: Props) => {

  const [terms, setTerms] = useState('');
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
        setTerms(response.terms);
      }
    })

  }


  return (
    <CustomContainer>
      <CustomStatusBar />

      {/* header */}
      <CustomHeader title='Terms And Conditions' />

      <CustomInnerContainer containerStyle={{paddingHorizontal:ms(15)}}>
        <View>
          <Text style={GlobalStyles.txtR14Grey} >{terms}</Text>
        </View>
      </CustomInnerContainer>
    </CustomContainer>
  )
}

export default Terms