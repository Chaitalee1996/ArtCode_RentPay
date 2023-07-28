import { KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Loader } from '../components/uiCommon';
import screenNames from '../constants/screenNames';
import { Analytics, AssignProperty, CollectionReport, DepositeReport, DisableProperties, EditPropertyDetails, ExpenseReport, LedgerReport, Login, MyTenant, NewExpense, NewProperty, NewTenant, Notification, PoliceReport, Policy, ProfileEdit, Properties, PropertyAssignDetails, PropertyDetails, Splash, SplashModal, Subscription, Support, TenantInfo, Terms } from '../screens';
import { COLORS } from '../styles/theme';
import BottomTab from './BottomTab';
import FlashMessage from 'react-native-flash-message';
import { GlobalStyles } from '../styles/GlobaStyles';
import { useSelector } from 'react-redux';


const Stack = createStackNavigator();

const STATUS_HEIGHT: any = StatusBar.currentHeight;

const AppContainer = () => {

  const { LOADING } = useSelector((state: any) => state.loading);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Loader loading={LOADING} />



        <StatusBar translucent backgroundColor={COLORS.transparent} barStyle="light-content" />

        <FlashMessage
          position="top"
          hideStatusBar={false}
          style={{ marginTop: STATUS_HEIGHT }}
          textStyle={GlobalStyles.toastMessage}
          titleStyle={GlobalStyles.toastMessage}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={0}>
          <Stack.Navigator screenOptions={{ cardShadowEnabled: true }}>
            <Stack.Group
              screenOptions={{
                detachPreviousScreen: false,
                cardStyle: { backgroundColor: COLORS.bgTheme },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
              }}>

              <Stack.Screen
                name={screenNames.SPLASH}
                component={Splash}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.SPLASH_MODAL}
                component={SplashModal}
                options={{ headerShown: false }}
              />



              <Stack.Screen
                name={screenNames.LOGIN}
                component={Login}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.BOTTOM_TAB}
                component={BottomTab}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.NEW_EXPENSE}
                component={NewExpense}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.PROPERTY}
                component={Properties}
                options={{ headerShown: false }}
              />


            </Stack.Group>
            <Stack.Group
              screenOptions={{
                detachPreviousScreen: false,
                cardStyle: { backgroundColor: COLORS.bgTheme },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}>
              <Stack.Screen
                name={screenNames.SUBSCRIPTION}
                component={Subscription}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.ASSIGN_PROPERTY_DETAILS}
                component={PropertyAssignDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.NEW_PROPERTY}
                component={NewProperty}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.DISABLE_PROPERTIES}
                component={DisableProperties}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.MY_TENANT}
                component={MyTenant}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.NEW_TENANT}
                component={NewTenant}
                options={{ headerShown: false }}
              />


              <Stack.Screen
                name={screenNames.TENANT_INFO}
                component={TenantInfo}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.ASSIGN_PROPERTY}
                component={AssignProperty}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.SUPPORT}
                component={Support}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.TERMS}
                component={Terms}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.POLICY}
                component={Policy}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.NOTIFICATION}
                component={Notification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.PROFILE_EDIT}
                component={ProfileEdit}
                options={{ headerShown: false }}
              />
              {/* Anlytics And Reports */}
              <Stack.Screen
                name={screenNames.ANALYTICS}
                component={Analytics}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name={screenNames.COLLECTION_REPORT}
                component={CollectionReport}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.DEPOSITE_REPORT}
                component={DepositeReport}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.EXPENSE_REPORT}
                component={ExpenseReport}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.LEDGER_REPORT}
                component={LedgerReport}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.POLICE_REPORT}
                component={PoliceReport}
                options={{ headerShown: false }}
              />


            </Stack.Group>

            <Stack.Group
              screenOptions={{
                detachPreviousScreen: false,
                cardStyle: { backgroundColor: COLORS.bgTheme },
                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
              }}>
              <Stack.Screen
                name={screenNames.EDIT_PROPERTY}
                component={EditPropertyDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={screenNames.PROPERTY_DETAILS}
                component={PropertyDetails}
                options={{ headerShown: false }}
              />

            </Stack.Group>


          </Stack.Navigator>
        </KeyboardAvoidingView>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
