import { View, Text, RefreshControl } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { COLORS } from '../../styles/theme';

type Props = {
    onRefresh:()=>void
}

const CustomRefreshControl = ({onRefresh}: Props) => {

    const { REFRESHING } = useSelector((state: any) => state.loading);

  return (
    <RefreshControl
              refreshing={REFRESHING}
              onRefresh={onRefresh}
              tintColor={COLORS.theme}
              colors={[COLORS.theme]}
          />
  )
}

export default CustomRefreshControl