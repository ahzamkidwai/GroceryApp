import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@/utils/NavigationUtils';
import SplashScreen from '@/features/authentication/SplashScreen';
import CustomerLogin from '@/features/authentication/CustomerLogin';
import DeliveryLogin from '@/features/authentication/DeliveryLogin';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="DeliveryLogin"
          component={DeliveryLogin}
          options={{animation: 'fade'}}
        />
        <Stack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          options={{animation: 'fade'}}
        />
        {/* <Stack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          options={{
            animationEnabled: true,
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 1000, // 1 second fade in
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 1000, // 1 second fade out
                },
              },
            },
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
