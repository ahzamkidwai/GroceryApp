import {
  Platform,
  StyleSheet,
  Animated as RNAnimated,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NoticeHeight, screenHeight} from '@/utils/Scaling';

import {
  CollapsibleContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeoCode} from '@/service/mapService';
import {useAuthStore} from '@/state/authStore';
import NoticeAnimation from './NoticeAnimation';
import Visuals from './Visuals';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@/components/ui/CustomText';
import {Fonts} from '@/utils/Constants';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import AnimatedHeader from './AnimatedHeader';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';
import Content from '@/components/dashboard/Content';
import StickySearchBar from '@/components/dashboard/StickySearchBar';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const {user, setUser} = useAuthStore();
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT));

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 1 : 10, {duration: 300});

    previousScroll.current = scrollY.value;
    return {opacity, transform: [{translateY}]};
  });

  const slideUp = () => {
    RNAnimated.timing(noticePosition.current, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition.current, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const updateUser = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          reverseGeoCode(latitude, longitude, setUser);
        },
        err =>
          console.log(
            'Error occurred while getting updateUser location : ',
            err,
          ),
        {
          enableHighAccuracy: false,
          timeout: 15000,
        },
      );
    };

    // slideDown();

    // updateUser();
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />

        {/* <Animated.View style={[styles.backToTopButton]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Icon
              name="arrow-up-circle-outline"
              color="white"
              size={RFValue(12)}
            />
            <CustomText
              variant="h9"
              style={{color: 'white'}}
              fontFamily={Fonts.SemiBold}>
              Back to Top
            </CustomText>
          </TouchableOpacity>
        </Animated.View> */}

        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />

            <StickySearchBar />
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.panelContainer}>
            <Content />

            <View style={{backgroundColor: '#f8f8f8', padding: 20}}>
              <CustomText
                fontSize={RFValue(40)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2, fontWeight: '700'}}>
                Grocery Delivery App
              </CustomText>

              <CustomText
                fontSize={RFValue(12)}
                fontFamily={Fonts.Bold}
                style={{marginTop: 10, opacity: 0.2, paddingBlock: 100}}>
                Developed by Ahzam Naseem Kidwai
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

export default withCollapsibleContext(ProductDashboard);

const styles = StyleSheet.create({
  panelContainer: {flex: 1},
  transparent: {backgroundColor: 'transparent'},
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 99,
  },
});
