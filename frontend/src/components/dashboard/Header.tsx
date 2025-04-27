import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAuthStore} from '@/state/authStore';
import Geolocation from '@react-native-community/geolocation';
import {reverseGeoCode} from '@/service/mapService';
import CustomText from '../ui/CustomText';
import {Fonts} from '@/utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '@/utils/NavigationUtils';

const Header: FC<{showNotice: () => void}> = ({showNotice}) => {
  const {user, setUser} = useAuthStore();

  const updateUserLocation = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        reverseGeoCode(latitude, longitude, setUser);
      },
      error => console.log('EROR : ', error),
      {enableHighAccuracy: false, timeout: 1000},
    );
  };

  useEffect(() => {
    updateUserLocation();
  }, []);

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText variant="h8" fontFamily={Fonts.Bold} style={styles.text}>
          Delivery In
        </CustomText>

        <View style={styles.flexRowGap}>
          <CustomText
            variant="h2"
            fontFamily={Fonts.SemiBold}
            style={styles.text}>
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
            <CustomText
              fontSize={RFValue(5)}
              fontFamily={Fonts.SemiBold}
              style={{color: '#3B4886'}}>
              Rain
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={styles.flexRow}>
          <CustomText
            variant="h8"
            numberOfLines={1}
            fontFamily={Fonts.Medium}
            style={styles.text2}>
            {user?.address || 'Knowhere, Somwhere'}
          </CustomText>
          <MaterialCommunityIcons
            name="menu-down"
            color="#fff"
            size={RFValue(20)}
            style={{bottom: -1}}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate('Profile')}>
        <MaterialCommunityIcons
          name="account-cirle-outline"
          size={RFValue(36)}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  text: {color: '#fff'},
  text2: {color: '#fff', width: '90%', textAlign: 'center'},
  flexRowGap: {flexDirection: 'row', alignItems: 'center', gap: 5},
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: '70%',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 10 : 5,
    justifyContent: 'space-between',
  },
  noticeBtn: {
    backgroundColor: '#E8EAFB',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});
