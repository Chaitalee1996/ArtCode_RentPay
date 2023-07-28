import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIcon from './TabIcon';
import screenNames from '../constants/screenNames';
import { COLORS, SIZES } from '../styles/theme';
import { mvs } from 'react-native-size-matters';
import { createStackNavigator } from '@react-navigation/stack';
import CommonSvg from '../components/svg/CommonSvg';
import { Collection, Expenses, Home, NewExpense, Setting } from '../screens';

type Props = {};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTab = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: Platform.OS == 'android' ? 0 : mvs(20),
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.transparent,
          height: mvs(70),
          width: SIZES.width,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
          shadowColor: COLORS.black,
            shadowOpacity: 0.7,
            shadowRadius: 10,
            shadowOffset: {
                width: 3,
                height: 5
            },
            elevation: 12,
        },
      }}
    //tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen
        name={screenNames.HOME}
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Home"
              icon={
                <CommonSvg.HomeTabSvg
                  color={focused ? COLORS.theme : COLORS.tabTxt}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.COLLECTION}
        component={Collection}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Collection"
              icon={
                <CommonSvg.CollectionTabSvg
                  color={focused ? COLORS.theme : COLORS.tabTxt}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.EXPENSES}
        component={Expenses}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Expense"
              icon={
                <CommonSvg.ExpenseTabSvg
                  color={focused ? COLORS.theme : COLORS.tabTxt}
                />
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.SETTING}
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              title="Setting"
              icon={
                <CommonSvg.SettingTabSvg
                  color={focused ? COLORS.theme : COLORS.tabTxt}
                />
              }
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
};


const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.HOME}
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const CollectionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.COLLECTION}
        component={Collection}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const ExpenseStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.EXPENSES}
        component={Expenses}
        options={{ headerShown: false }}
      />
     
    </Stack.Navigator>
  );
};
const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.SETTING}
        component={Setting}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
