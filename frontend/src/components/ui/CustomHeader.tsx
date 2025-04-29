import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';
import {Colors, Fonts} from '@/utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {goBack} from '@/utils/NavigationUtils';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from './CustomText';

const CustomHeader: FC<{title: string; search?: boolean}> = ({
  title,
  search,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <Pressable onPress={() => goBack()}>
          <Ionicons name="chevron-back" color={Colors.text} size={30} />
        </Pressable>

        <CustomText variant="h5" style={[styles.text, {fontWeight: '700'}]}>
          {title}
        </CustomText>

        <View>
          {search && (
            <Ionicons name="search" color={Colors.text} size={RFValue(16)} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },
  text: {textAlign: 'center'},
});
