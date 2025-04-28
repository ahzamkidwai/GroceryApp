import {StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';
import {adData, categories} from '@/utils/dummyData';
import AdCarousal from './AdCarousal';
import CustomText from '../ui/CustomText';
import {Fonts} from '@/utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content: FC = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />

      <CustomText variant="h3" style={{fontWeight: '700'}}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />

      <CustomText variant="h3" style={{fontWeight: '700'}}>
        Best-Sellers
      </CustomText>
      <CategoryContainer data={categories} />

      <CustomText variant="h3" style={{fontWeight: '700'}}>
        Snacks & Drinks
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20},
});
