import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, Fonts} from '@/utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {FC} from 'react';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '../ui/CustomText';

const SearchBar: FC = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Icon name="search" color={Colors.text} size={RFValue(20)} />
      <RollingBar
        interval={1000}
        defaultStyle={false}
        customStyle={styles.textContainer}>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "milk"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search for ata, dal & coke
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "chips"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "pooja thaali"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "bread"
        </CustomText>
      </RollingBar>
      <View style={styles.divider} />
      <Icon name="mic" color={Colors.text} size={RFValue(20)} />
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.6,
    marginTop: 15,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  textContainer: {width: '90%', paddingLeft: 10, height: 50},
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
});
