import {
  Alert,
  Animated,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@/components/global/CustomSafeAreaView';
import ProductSlider from '@/components/login/ProductSlider';
import {Colors, Fonts, lightColors} from '@/utils/Constants';
import CustomText from '@/components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {resetAndNavigate} from '@/utils/NavigationUtils';
import {State} from 'react-native-gesture-handler';
import useKeyboardOffsetHeight from '@/utils/useKeyboardOffsetHeight';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '@assets/images/logo.jpeg';
import CustomInput from '@/components/ui/CustomInput';
import CustomButton from '@/components/ui/CustomButton';
import {customerLoginHandler} from '@/service/authService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const bottomColors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      console.log('NEW SEQUENCE : ', gestureSequence.join(' '));
      if (newSequence?.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLoginHandler(phoneNumber);
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />

          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              //   stickyHeaderHiddenOnScroll
              style={{transform: [{translateY: animatedValue}]}}
              bounces={false}
              keyboardDismissMode={'on-drag'}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}>
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image source={Logo} style={styles.logo} />
                <CustomText variant="h2" fontFamily={Fonts.Bold}>
                  Grocery Delivery App
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Log In or Sign Up
                </CustomText>

                <CustomInput
                  value={phoneNumber}
                  onChangeText={text => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  placeholder="Enter Phone Number"
                  inputMode="numeric"
                  left={
                    <CustomText
                      style={styles.phoneText}
                      variant="h6"
                      fontFamily={Fonts.SemiBold}>
                      +91
                    </CustomText>
                  }
                  right={true}
                />

                <CustomButton
                  disabled={phoneNumber?.length != 10}
                  onPress={() => handleAuth()}
                  loading={loading}
                  title="Continue"
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
      </View>

      <View style={styles.footer}>
        <SafeAreaView />
        <CustomText fontSize={RFValue(8)}>
          By continuing, you agree to our Terms of service and privacy
        </CustomText>

        <SafeAreaView />
      </View>
      <TouchableOpacity
        style={styles.absoluteSwitchButton}
        onPress={() => resetAndNavigate('DeliveryLogin')}>
        <MaterialCommunityIcons name="bike-fast" />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {flex: 1},
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F8F9FC',
    width: '100%',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  gradient: {paddingTop: 60, width: '100%'},
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginVertical: 20,
  },
  text: {marginTop: 2, marginBottom: 25, opacity: 0.8},
  phoneText: {marginLeft: 10},
  absoluteSwitchButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: Platform.OS === 'ios' ? 40 : 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    padding: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    right: 10,
    zIndex: 99,
  },
});
