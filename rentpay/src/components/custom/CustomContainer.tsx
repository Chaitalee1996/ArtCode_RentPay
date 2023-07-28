import {
  Platform,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../../styles/GlobaStyles';
import { mvs } from 'react-native-size-matters';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const STATUS_HEIGHT:any = StatusBar.currentHeight;

const CustomContainer: React.FC<Props> = ({
  containerStyle,
  children,
 
}) => {
  const padding = Platform.OS == 'android' ? STATUS_HEIGHT : STATUS_HEIGHT+mvs(35);

  return (
    <View style={[GlobalStyles.container, {paddingTop: padding}, containerStyle]}>
      
      {children}
    </View>
  );
};

export default CustomContainer;
