import {StyleSheet} from 'react-native';
import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@/utils/NavigationUtils';
import SplashScreen from '@/features/authentication/SplashScreen';
import CustomerLogin from '@/features/authentication/CustomerLogin';
import DeliveryLogin from '@/features/authentication/DeliveryLogin';
import ProductDashboard from '@/features/dashboard/ProductDashboard';
import DeliveryDashboard from '@/features/delivery/DeliveryDashboard';
import ProductCategories from '@/features/category/ProductCategories';
import ProductOrder from '@/features/order/ProductOrder';

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
        <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
        <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
        <Stack.Screen name="ProductCategories" component={ProductCategories} />
        <Stack.Screen name="ProductOrder" component={ProductOrder} />
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
